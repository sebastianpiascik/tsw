<template>
  <div class="admin-panel" v-if="isAuth">
    <h1>Panel admina</h1>
    <div class="boxes">
      <div class="box box--small">
        <router-link to="/admin/konie">Konie</router-link>
      </div>
      <div class="box box--small">
        <router-link to="/admin/klasy">Klasy</router-link>
      </div>
      <div class="box box--small">
        <router-link to="/admin/sedziowie">Sędziowie</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
  <div class="admin-panel" v-else>
    <h4>Nie masz dostępu do panelu admina</h4>
  </div>
</template>

<script>
  export default {
    computed: {
      isAuth() {
        return this.$store.getters.IS_AUTH;
      }
    },
  };
</script>
