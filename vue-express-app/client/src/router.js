import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Judgement from "@/components/Judgement.vue";
import Scoreboard from "@/components/Scoreboard.vue";
import AdminPanel from "./views/AdminPanel";
import Horses from "@/components/admin/horses/Horses";
import NewHorse from "@/components/admin/horses/NewHorse";
import EditHorse from "@/components/admin/horses/EditHorse";
import Classes from "@/components/admin/classes/Classes";
import NewClass from "@/components/admin/classes/NewClass";
import EditClass from "@/components/admin/classes/EditClass";
import Judges from "@/components/admin/judges/Judges";
import NewJudge from "@/components/admin/judges/NewJudge";
import EditJudge from "@/components/admin/judges/EditJudge";
// import Dashboard from "@/components/Dashboard";
import Login from "@/components/auth/Login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/ranking",
      name: "Scoreboard",
      component: Scoreboard
    },
    {
      path: "/noty/:id",
      name: "Judgement",
      component: Judgement
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      component: AdminPanel,
      children: [
        {
          path: "konie",
          name: "Horses",
          component: Horses
        },
        {
          path: "konie/dodaj",
          name: "NewHorse",
          component: NewHorse
        },
        {
          path: "konie/:id",
          name: "EditHorse",
          component: EditHorse
        },
        {
          path: "klasy",
          name: "Classes",
          component: Classes
        },
        {
          path: "klasy/dodaj",
          name: "NewClass",
          component: NewClass
        },
        {
          path: "klasy/:id",
          name: "EditClass",
          component: EditClass
        },
        {
          path: "sedziowie",
          name: "Judges",
          component: Judges
        },
        {
          path: "sedziowie/dodaj",
          name: "NewJudge",
          component: NewJudge
        },
        {
          path: "sedziowie/:id",
          name: "EditJudge",
          component: EditJudge
        }
      ]
    }
  ]
});
