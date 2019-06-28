<template>
  <div class="app__form" v-if="horse">
    <h1>Edytuj konia</h1>
    <form action class="form" @submit="updateHorse">
      <div class="form__box">
        <div class="form__element">
          <label for="numer">Numer</label>
          <input type="number" name="numer" placeholder="Wpisz numer" v-model="horse.numer">
        </div>
        <div class="form__element">
          <label for="klasa">Klasa</label>
          <select name="klasa" id="klasa" v-model="horse.klasa">
            <option v-for="horseClass in horseClasses" v-bind:value="horseClass.id" v-bind:key="horseClass.id">{{horseClass.kat}}</option>
          </select>
        </div>
        <div class="form__element">
          <label for="nazwa">Nazwa</label>
          <input type="text" name="nazwa" placeholder="Wpisz nazwę" v-model="horse.nazwa">
        </div>
        <div class="form__element">
          <label for="kraj">Kraj</label>
          <input type="text" name="kraj" placeholder="kraj" v-model="horse.kraj">
        </div>
        <div class="form__element">
          <label for="rocznik">Rocznik</label>
          <input type="number" name="rocznik" placeholder="Wpisz rocznik" v-model="horse.rocznik">
        </div>
        <div class="form__element">
          <label for="masc">Masc</label>
          <input type="text" name="masc" placeholder="masc" v-model="horse.masc">
        </div>
        <div class="form__element">
          <label for="plec">Plec</label>
          <input type="text" name="plec" placeholder="plec" v-model="horse.plec">
        </div>
      </div>
      <div class="form__box">
        <div class="form__element">
          <label for="hodowcaNazwa">Hodowca - imię i nazwisko</label>
          <input
            type="text"
            name="hodowcaNazwa"
            placeholder="Wpisz imię i nazwisko"
            v-model="horse.hodowca.nazwa"
          >
        </div>
        <div class="form__element">
          <label for="hodowcaKraj">Hodowca - kraj</label>
          <input
            type="text"
            name="hodowcaKraj"
            placeholder="Wpisz kraj"
            v-model="horse.hodowca.kraj"
          >
        </div>
        <div class="form__element">
          <label for="wlascicielNazwa">Właściciel - imię i nazwisko</label>
          <input
            type="text"
            name="wlascicielNazwa"
            placeholder="Wpisz imię i nazwisko"
            v-model="horse.wlasciciel.nazwa"
          >
        </div>
        <div class="form__element">
          <label for="wlascicielKraj">Właściciel - kraj</label>
          <input
            type="text"
            name="wlascicielKraj"
            placeholder="Wpisz kraj"
            v-model="horse.wlasciciel.kraj"
          >
        </div>
      </div>
      <div class="form__box">
        <div class="form__element">
          <label for="wlascicielKraj">Rodowód(o) nazwa</label>
          <input
            type="text"
            name="RodowodONazwa"
            placeholder="Wpisz rodowód(o) nazwa"
            v-model="horse.rodowod.o.nazwa"
          >
        </div>
        <div class="form__element">
          <label for="wlascicielKraj">Rodowód(o) kraj</label>
          <input
            type="text"
            name="RodowodOKraj"
            placeholder="Wpisz rodowód(o) kraj"
            v-model="horse.rodowod.o.kraj"
          >
        </div>
        <div class="form__element">
          <label for="wlascicielKraj">Rodowód(m) nazwa</label>
          <input
            type="text"
            name="RodowodMNazwa"
            placeholder="Wpisz rodowód(m) nazwa"
            v-model="horse.rodowod.m.nazwa"
          >
        </div>
        <div class="form__element">
          <label for="wlascicielKraj">Rodowód(m) kraj</label>
          <input
            type="text"
            name="RodowodMKraj"
            placeholder="Wpisz rodowód(m) kraj"
            v-model="horse.rodowod.m.kraj"
          >
        </div>
        <div class="form__element">
          <label for="wlascicielKraj">Rodowód(om) nazwa</label>
          <input
            type="text"
            name="RodowodOMNazwa"
            placeholder="Wpisz rodowód(o) nazwa"
            v-model="horse.rodowod.om.nazwa"
          >
        </div>
        <div class="form__element">
          <label for="wlascicielKraj">Rodowód(om) kraj</label>
          <input
            type="text"
            name="RodowodOMKraj"
            placeholder="Wpisz rodowód(om) kraj"
            v-model="horse.rodowod.om.kraj"
          >
        </div>
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
      horse() {
        return this.$store.getters.HORSES.filter(
          horse => horse.id === this.$route.params.id
        )[0];
      },
      horseClasses() {
        return this.$store.getters.HORSE_CLASSES;
      }
    },
    methods: {
      async updateHorse(e) {
        e.preventDefault();
        await this.$store.dispatch("EDIT_HORSE", this.horse);
        this.$router.push({ name: "Horses" });
      }
    }
  };
</script>