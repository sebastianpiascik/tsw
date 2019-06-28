<template>
  <div class="app__table">
    <router-link v-bind:to="{ name: 'NewJudge' }" class="add-item">Dodaj sędzię</router-link>
    <div class="table-wrap">
      <table>
        <tr>
          <td>Id</td>
          <td>Sedzia</td>
          <td>Kraj</td>
          <td width="100" align="center"></td>
        </tr>
        <tr v-for="judge in judges" v-bind:key="judge.id">
          <td>{{ judge.id }}</td>
          <td>{{ judge.sedzia }}</td>
          <td>{{ judge.kraj }}</td>
          <td>
            <router-link v-bind:to="{ name: 'EditJudge', params: { id: judge.id } }">
              <img
                class="table-icon"
                src="@/assets/images/icons/pencil.svg"
                alt="ikona edycji"
              >
            </router-link>|
            <a href="#" @click="deleteJudge(judge.id)">
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
      judges() {
        return this.$store.getters.JUDGES;
      }
    },
    methods: {
      deleteJudge(id) {
        this.$store.dispatch("DELETE_JUDGE", id);
      }
    }
  };
</script>