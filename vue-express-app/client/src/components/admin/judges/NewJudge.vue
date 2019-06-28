<template>
  <div class="app__form">
    <h1>Dodaj sędzię</h1>
    <form action class="form" @submit="addJudge">
      <div class="form__element">
        <label for="sedzia">Imię i nazwisko</label>
        <input type="text" name="sedzia" placeholder="Wpisz imię i nazwisko" v-model="judge.sedzia">
      </div>
      <div class="form__element">
        <label for="kraj">Kraj</label>
        <input type="text" name="kraj" placeholder="Wpisz kod kraju" v-model="judge.kraj">
      </div>
      <div class="form__element">
        <button type="submit">Zapisz</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        judge: {
          sedzia: null,
          kraj: null
        }
      };
    },
    methods: {
      async addJudge(e) {
        e.preventDefault();
        await this.$store.dispatch("SAVE_JUDGE", this.judge);
        this.$store
          .dispatch("GET_JUDGES")
          .then(() => this.$router.push({ name: "Judges" }))
          .catch(err => console.log(err));
      }
    }
  };
</script>