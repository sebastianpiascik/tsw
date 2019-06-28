
<template>
  <div class="app__table">
    <router-link v-bind:to="{ name: 'NewHorse' }" class="add-item">Dodaj konia</router-link>
    <div class="table-wrap">
      <table>
        <tr>
          <td>ID</td>
          <td>Nazwa konia</td>
          <td width="100" align="center"></td>
        </tr>
        <tr v-for="horse in horses" v-bind:key="horse.id">
          <td>{{ horse.id }}</td>
          <td>{{ horse.nazwa }}</td>
          <td>
            <router-link v-bind:to="{ name: 'EditHorse', params: { id: horse.id } }">
              <img
                class="table-icon"
                src="@/assets/images/icons/pencil.svg"
                alt="ikona edycji"
              >
            </router-link>|
            <a href="#" @click="deleteHorse(horse.id)">
              <img class="table-icon" src="@/assets/images/icons/rubbish.svg" alt="ikona edycji">
            </a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      horses() {
        return this.$store.getters.HORSES;
      }
    },
    methods: {
      deleteHorse(id) {
        this.$store.dispatch("DELETE_HORSE", id);
      }
    }
  };
</script>