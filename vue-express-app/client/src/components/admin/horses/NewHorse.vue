<template>
  <div class="app__form">
    <h1>Dodaj konia</h1>
    <form action class="form" @submit="addHorse">
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
    data() {
      return {
        horse: {
          numer: null,
          klasa: null,
          nazwa: null,
          kraj: null,
          rocznik: null,
          masc: null,
          plec: null,
          hodowca: {
            nazwa: null,
            kraj: null
          },
          wlasciciel: {
            nazwa: null,
            kraj: null
          },
          rodowod: {
            o: {
              nazwa: null,
              kraj: null
            },
            m: {
              nazwa: null,
              kraj: null
            },
            om: {
              nazwa: null,
              kraj: null
            }
          },
          wynik: {
            noty: [
              {
                typ: 0,
                glowa: 0,
                kloda: 0,
                nogi: 0,
                ruch: 0
              },
              {
                typ: 0,
                glowa: 0,
                kloda: 0,
                nogi: 0,
                ruch: 0
              },
              {
                typ: 0,
                glowa: 0,
                kloda: 0,
                nogi: 0,
                ruch: 0
              }
            ]
          }
        }
      };
    },
    computed: {
      horseClasses() {
        return this.$store.getters.HORSE_CLASSES;
      }
    },
    methods: {
      async addHorse(e) {
        e.preventDefault();
        await this.$store.dispatch("SAVE_HORSE", this.horse);
        await this.$store.dispatch("GET_HORSES");
        this.$router.push({ name: "Horses" });
      }
    }
  };
</script>