<template>
  <div class="app__form" v-if="horseClass">
    <h1>Edytuj klasę</h1>
    <form action class="form" @submit="addHorseClass">
      <div class="form__element">
        <label for="numer">Numer</label>
        <input type="text" name="numer" placeholder="Wpisz numer" v-model="horseClass.numer">
      </div>
      <div class="form__element">
        <label for="kat">Kategoria klasy</label>
        <input type="text" name="kat" placeholder="Kategoria klasy" v-model="horseClass.kat">
      </div>
      <div class="form__heading">
        <h4>Komisja</h4>
      </div>
      <div class="form__element">
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
        horseClass: {
          numer: null,
          kat: null,
          komisja: []
        }
      };
    },
    computed: {
      judges() {
        return this.$store.getters.JUDGES;
      },
    },
    methods: {
      async addHorseClass(e) {
        e.preventDefault();
        let horseClass = this.horseClass;
        horseClass.komisja = await this.komisja.map(judge => judge.id);
        await this.$store.dispatch("SAVE_HORSE_CLASS", horseClass);
        await this.$store.dispatch("GET_HORSE_CLASSES");
        this.$router.push({ name: "Classes" });
      }
    }
  };
</script>