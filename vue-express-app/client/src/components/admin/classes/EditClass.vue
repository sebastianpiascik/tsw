<template>
  <div class="app__form" v-if="horseClass">
    <h1>Edytuj klasę</h1>
    <form action class="form" @submit="updateClass">
      <div class="form__element">
        <label for="numer">Numer</label>
        <input type="text" name="numer" placeholder="Wpisz nazwę" v-model="horseClass.numer">
      </div>
      <div class="form__element">
        <label for="kat">Kategoria klasy</label>
        <input type="text" name="kat" placeholder="Kategoria klasy" v-model="horseClass.kat">
      </div>
      <div class="form__heading">
        <h4>Komisja</h4>
      </div>
      <div class="form__element" v-if="!isLoading">
        <label for="komisja">Sędzia</label>
        <multiselect
          v-model="komisja"
          :options="judges"
          :preserve-search="true"
          :clear-on-select="false"
          :close-on-select="false"
          label="sedzia"
          track-by="sedzia"
          :searchable="false"
          :multiple="true"
        ></multiselect>
      </div>
      <div class="form__element">
        <button type="submit">Zapisz</button>
      </div>
    </form>
  </div>
</template>

<script>
  import Multiselect from "vue-multiselect";
  export default {
    components: { Multiselect },
    data() {
      return {
        komisja: [],
        isLoading: true
      };
    },
    computed: {
      judges() {
        return this.$store.getters.JUDGES;
      },
      horseClass() {
        return this.$store.getters.HORSE_CLASSES.filter(
          horseClass => horseClass.id === this.$route.params.id
        )[0];
      }
    },
    mounted() {
      this.getCommission();
    },
    methods: {
      async updateClass(e) {
        e.preventDefault();
        let horseClass = this.horseClass;
        horseClass.komisja = await this.komisja.map(judge => judge.id);
        await this.$store.dispatch("EDIT_HORSE_CLASS", horseClass);
        this.$router.push({ name: "Classes" });
      },
      async getCommission() {
        let that = this;
        await this.judges.forEach(judge => {
          that.horseClass.komisja.forEach(judgeId => {
            if (judge.id === judgeId) {
              that.komisja.push(judge);
            }
          });
        });
        this.isLoading = false;
      }
    }
  };
</script>