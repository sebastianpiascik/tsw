<template>
  <div class="judges">
    <h1>Edytuj sędzię</h1>
    <form action class="form" @submit="updateJudge">
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
    computed: {
      judge() {
        return this.$store.getters.JUDGES.filter(
          judge => judge.id === this.$route.params.id
        )[0];
      }
    },
    methods: {
      async updateJudge(e) {
        e.preventDefault();
        await this.$store.dispatch("EDIT_JUDGE", this.judge);
        this.$router.push({ name: "Judges" });
      }
    }
  };
</script>