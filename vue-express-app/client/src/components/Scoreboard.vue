
<template>
  <div class="section section--scoreboard">
    <div v-if="!isLoading">
      <div class="section__heading">
        <p>
          <span>Klasa: {{currentHorseClass.kat}}</span>
        </p>
        <div v-on:click="getPrevClass" class="arrow arrow-prev">
          &lt;
          <span>Poprzednia</span>
        </div>
        <div v-on:click="getNextClass" class="arrow arrow-next">
          <span>Następna</span>&gt;
        </div>
      </div>
      <div class="section__table">
        <table>
          <tr>
            <td>Id</td>
            <td>Nazwa konia</td>
            <td>Suma punktów</td>
            <td>Suma typ</td>
            <td>Suma ruch</td>
            <td v-if="isAuth">Edycja</td>
          </tr>
          <tr
            v-for="horse in classHorses"
            v-bind:key="horse.id"
            :class="'horseRow horseRow'+horse.id"
          >
            <td>{{ horse.id }}</td>
            <td>{{ horse.nazwa }}</td>
            <td>{{ horse.suma.sumaPunktow }}</td>
            <td>{{ horse.suma.typ }}</td>
            <td>{{ horse.suma.ruch }}</td>
            <td v-if="isAuth">
              <router-link v-bind:to="{ name: 'Judgement', params: { id: horse.id } }">oceń</router-link>
            </td>
            <td v-if="horse.wynik.rozjemca && isAuth">
              <input
                style="width:30px"
                type="number"
                id="rozjemca"
                name="rozjemca"
                v-model="horse.wynik.rozjemca"
                min="1"
                v-bind:max="horsesWithArbitrator.length"
                v-if="isArbitrator"
              >
              <input
                style="width:30px"
                type="number"
                id="rozjemca"
                name="rozjemca"
                v-model="horse.wynik.rozjemca"
                min="1"
                v-bind:max="horsesWithArbitrator.length"
                disabled
                v-else
              >
            </td>
          </tr>
        </table>
        <div v-if="isArbitrator">
          <button v-on:click="savePlaces">Zapisz miejsca</button>
        </div>
      </div>
    </div>
    <div v-else>
      <Spinner/>
    </div>
  </div>
</template>

<script>
  import Spinner from "@/components/Spinner";

  export default {
    components: {
      Spinner
    },
    data() {
      return {
        isLoading: true,
        currentHorseClass: null,
        isArbitrator: false
      };
    },
    computed: {
      horseClasses() {
        return this.$store.getters.HORSE_CLASSES;
      },
      classHorses() {
        return this.$store.getters.HORSES.filter(
          horse => parseInt(horse.klasa) === this.currentHorseClass.id
        );
      },
      horsesWithArbitrator() {
        return this.$store.getters.HORSES.filter(horse => horse.wynik.rozjemca);
      },
      isAuth() {
        return this.$store.getters.IS_AUTH;
      }
    },
    mounted() {
      this.getHorseClasses();
    },
    methods: {
      async getHorseClasses() {
        this.currentHorseClass = this.horseClasses[0];
        await this.sortClassHorses();
        this.isArbitrator = await this.isNeededArbitrator();
        this.isLoading = false;
      },
      isNeededArbitrator(){
        let isNeeded = false;
        let wynikiRozjemca = [];
        let uniqueWyniki = [];

        this.horsesWithArbitrator.forEach(horse => {
          if(horse.wynik.rozjemca){
            wynikiRozjemca.push(horse.wynik.rozjemca);
            isNeeded = true;
          }
        });

        uniqueWyniki = [...new Set(wynikiRozjemca)];
        if(uniqueWyniki.length === wynikiRozjemca.length){
          isNeeded = false;
        }
        return isNeeded;
      },
      savePlaces(){
        this.horsesWithArbitrator.forEach(horse => {
          this.$store.dispatch("EDIT_HORSE", horse);
          console.log('b');
        });
        this.isLoading = true;
        this.getHorseClasses();
      },
      async getNextClass() {
        this.isLoading = true;
        let index = await this.horseClasses.indexOf(this.currentHorseClass);
        if (index >= 0 && index < this.horseClasses.length - 1)
          this.currentHorseClass = this.horseClasses[index + 1];
        else this.currentHorseClass = this.horseClasses[0];

        await this.sortClassHorses();
        this.isArbitrator = await this.isNeededArbitrator();
        this.isLoading = false;
      },
      async getPrevClass() {
        this.isLoading = true;
        let index = await this.horseClasses.indexOf(this.currentHorseClass);
        if (index > 0) this.currentHorseClass = this.horseClasses[index - 1];
        else
          this.currentHorseClass = this.horseClasses[
            this.horseClasses.length - 1
          ];

        await this.sortClassHorses();
        this.isArbitrator = await this.isNeededArbitrator();
        this.isLoading = false;
      },
      async sortClassHorses() {
        await this.calculateHorsesPoints();
        this.classHorses.sort(this.sortByPoints);
      },
      sortByPoints(a, b) {
        if (a.suma.sumaPunktow === b.suma.sumaPunktow) {
          if (a.suma.typ === b.suma.typ) {
            if (a.suma.ruch === b.suma.ruch) {
              if(a.wynik.rozjemca && b.wynik.rozjemca){
                return b.wynik.rozjemca - a.wynik.rozjemca;
              } else{
                a.wynik.rozjemca = 1;
                b.wynik.rozjemca = 1;
              }
            }
            return b.suma.ruch - a.suma.ruch;
          }
          return b.suma.typ - a.suma.typ;
        }
        return b.suma.sumaPunktow - a.suma.sumaPunktow;
      },
      calculateHorsesPoints() {
        this.classHorses.map(horse => {
          horse.suma = {
            sumaPunktow: 0,
            typ: 0,
            ruch: 0
          };
          horse.wynik.noty.forEach(singleResult => {
            let singleResultEntries = Object.entries(singleResult);
            for (const singleResultEntry of singleResultEntries) {
              if (singleResultEntry[0] === "typ")
                horse.suma.typ += parseFloat(singleResultEntry[1]);
              if (singleResultEntry[0] === "ruch")
                horse.suma.ruch += parseFloat(singleResultEntry[1]);
              horse.suma.sumaPunktow += parseFloat(singleResultEntry[1]);
            }
          });
        });
      }
    },
    sockets: {}
  };
</script>