<template>
  <div class="app">
    <div class="app__user" v-if="isAuth">
      Witaj {{this.user.name}},
      <span v-on:click="logout">Wyloguj</span>
    </div>
    <div class="app__user" v-else>
      <router-link v-bind:to="{ name: 'Login' }">Zaloguj się</router-link>
    </div>

    <div class="app__nav">
      <router-link to="/">&lt; Strona główna</router-link>
    </div>
    <div class="app__content" v-if="!isLoading">
      <router-view/>
    </div>
    <div class="app__content" v-else>
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
    computed: {
      user() {
        return this.$store.getters.USER;
      },
      isAuth() {
        return this.$store.getters.IS_AUTH;
      }
    },
    data() {
      return {
        isLoading: true
      };
    },
    mounted() {
      this.getData();
      this.$socket.emit("test");
    },
    methods: {
      async getData() {
        await this.$store.dispatch("GET_HORSES");
        await this.$store.dispatch("GET_HORSE_CLASSES");
        await this.$store.dispatch("GET_JUDGES");
        this.isLoading = false;
      },
      logout() {
        this.$store
          .dispatch("LOGOUT")
          .then(() => this.$router.push("/"))
          .catch(err => console.log(err));
      }
    },
    sockets: {
      async updateData() {
        this.isLoading = true;
        await this.getData();
        this.isLoading = false;
      },
      test(){
        console.log("test App");
      }
    }
  };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
