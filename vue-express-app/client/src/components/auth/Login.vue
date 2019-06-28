<template>
  <div>
    <h2>Login</h2>
    <form class="form" @submit.prevent="login">
      <div class="form__element">
        <input type="text" name="email" placeholder="Wpisz e-mail" v-model="user.email">
      </div>
      <div class="form__element">
        <input type="password" name="password" placeholder="Wpisz hasło" v-model="user.password">
      </div>
      <div class="form__element" v-if="formErr">
        <p class="err">Wystąpił błąd. Wprowadź poprawne dane.</p>
      </div>
      <div class="form__element">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          email: null,
          password: null
        },
        formErr: false
      };
    },
    methods: {
      login() {
        console.log("logowanie..");
        let data = {
          email: this.user.email,
          password: this.user.password
        };
        this.$store
          .dispatch("LOGIN", data)
          .then(() => this.$router.push("/"))
          .catch(err => {
            this.formErr = true;
            console.log(err);
          });
      }
    }
  };
</script>