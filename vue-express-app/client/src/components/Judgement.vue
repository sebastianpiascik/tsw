<template>
  <div class="section section--judgement" v-if="isAuth">
    <div v-if="!isLoading">
      <div class="section__heading">
        <router-link
          v-bind:to="{ name: 'Scoreboard', params: { id: horseClass.id } }"
        >Wróć do rankingu</router-link>
        <p>
          <span>Koń {{horse.nazwa}}({{horse.numer}})</span>
        </p>
      </div>
      <div class="section__table">
        <table class="table">
          <tr>
            <td>Sędzia</td>
            <td>typ</td>
            <td>glowa</td>
            <td>kloda</td>
            <td>nogi</td>
            <td>ruch</td>
          </tr>
          <tr v-for="(judge, index) in classJudges" v-bind:key="index">
            <td>{{judge.sedzia}}</td>
            <td>
              <input
                :name="'t' + index"
                :id="'t' + index"
                type="number"
                v-model="horse.wynik.noty[index].typ"
                min="0"
                max="20"
                step="0.5"
              >
            </td>
            <td>
              <input
                :name="'g' + index"
                :id="'g' + index"
                type="number"
                v-model="horse.wynik.noty[index].glowa"
                min="0"
                max="20"
                step="0.5"
              >
            </td>
            <td>
              <input
                :name="'k' + index"
                :id="'k' + index"
                type="number"
                v-model="horse.wynik.noty[index].kloda"
                min="0"
                max="20"
                step="0.5"
              >
            </td>
            <td>
              <input
                :name="'n' + index"
                :id="'n' + index"
                type="number"
                v-model="horse.wynik.noty[index].nogi"
                min="0"
                max="20"
                step="0.5"
              >
            </td>
            <td>
              <input
                :name="'r' + index"
                :id="'r' + index"
                type="number"
                v-model="horse.wynik.noty[index].ruch"
                min="0"
                max="20"
                step="0.5"
              >
            </td>
          </tr>
        </table>
        <div class="table-results">
          <p>
            Ocena konia: {{this.horse.suma.sumaPunktow}}
            <br>
            (typ): {{this.horse.suma.typ}}, (ruch): {{this.horse.suma.ruch}}
          </p>
        </div>
        <div class="table-button">
          <button v-on:click="confirmChanges">Zapisz wyniki</button>
        </div>
      </div>
    </div>
    <div v-else>
      <Spinner/>
    </div>
  </div>
  <div class="section section--judgement" v-else>
    <h4>Nie masz dostępu do tej sekcji</h4>
  </div>
</template>

<script>
  import Spinner from "@/components/Spinner";
  export default {
    components: { Spinner },
    data() {
      return {
        isLoading: true
      };
    },
    computed: {
      isAuth() {
        return this.$store.getters.IS_AUTH;
      },
      judges() {
        return this.$store.getters.JUDGES;
      },
      horse() {
        return this.$store.getters.HORSES.filter(
          horse => horse.id === this.$route.params.id
        )[0];
      },
      horseClass() {
        return this.$store.getters.HORSE_CLASSES.filter(
          horseClass => horseClass.id === this.horse.klasa
        )[0];
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        this.classJudges = await this.setCurrentHorseClassJudges(
          this.horseClass.komisja
        );
        await this.calculateHorsesPoints();
        this.isLoading = false;
      },
      async setCurrentHorseClassJudges(komisja) {
        const judgesArray = [];
        this.judges.forEach(judge => {
          komisja.forEach(sedziaId => {
            if (judge.id === sedziaId) judgesArray.push(judge);
          });
        });

        let difference =
          this.horseClass.komisja.length - this.horse.wynik.noty.length;
        if (difference > 0) {
          for (let i = 0; i < difference; i++) {
            this.horse.wynik.noty.push({
              typ: 0,
              glowa: 0,
              kloda: 0,
              nogi: 0,
              ruch: 0
            });
          }
        }
        return judgesArray;
      },
      calculateHorsesPoints() {
        this.horse.suma = {
          sumaPunktow: 0,
          typ: 0,
          ruch: 0
        };
        this.horse.wynik.noty.forEach(singleResult => {
          let singleResultEntries = Object.entries(singleResult);
          for (const singleResultEntry of singleResultEntries) {
            if (singleResultEntry[0] === "typ")
              this.horse.suma.typ += parseFloat(singleResultEntry[1]);
            if (singleResultEntry[0] === "ruch")
              this.horse.suma.ruch += parseFloat(singleResultEntry[1]);
            this.horse.suma.sumaPunktow += parseFloat(singleResultEntry[1]);
          }
        });
      },
      async confirmChanges() {
        this.isLoading = true;
        await this.calculateHorsesPoints();
        await this.$store.dispatch("EDIT_HORSE", this.horse);
        this.$socket.emit('update scoreboard', this.horse);
        this.$router.push({ name: "Scoreboard" });
      }
    }
  };
</script>
