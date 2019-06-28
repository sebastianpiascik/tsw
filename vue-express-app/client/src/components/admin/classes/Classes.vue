
<template>
  <div class="app__table">
    <router-link v-bind:to="{ name: 'NewClass' }" class="add-item">Dodaj klasę</router-link>
    <div class="table-wrap">
      <table>
        <tr>
          <td>Id</td>
          <td>Numer</td>
          <td>Kategoria klasy</td>
          <td>Komisja</td>
          <td width="100" align="center"></td>
        </tr>
        <tr v-for="horseClass in horseClasses" v-bind:key="horseClass.id">
          <td>{{ horseClass.id }}</td>
          <td>{{ horseClass.numer }}</td>
          <td>{{ horseClass.kat }}</td>
          <td>{{ horseClass.komisja }}</td>
          <td>
            <router-link v-bind:to="{ name: 'EditClass', params: { id: horseClass.id } }">
              <img
                class="table-icon"
                src="@/assets/images/icons/pencil.svg"
                alt="ikona edycji"
              >
            </router-link>|
            <a href="#" @click="deleteClass(horseClass.id)">
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
      horseClasses() {
        return this.$store.getters.HORSE_CLASSES;
      }
    },
    methods: {
      deleteClass(id) {
        this.$store.dispatch("DELETE_HORSE_CLASS", id);
      }
    }
  };
</script>