import Vue from 'vue';
import VueRouter from 'vue-router';
import NewsView from '../views/NewsView.vue';
import AskView from "../views/AskView.vue";
import JobsView from "../views/JobsView.vue";
import UserView from '../views/UserView.vue';
import ItemView from '../views/ItemView.vue';
// import CreateListView from "../views/CreateListView";
import bus from "../utils/bus.js";
import { store } from "../store/index.js";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history", //URL에 #붙는거 없애줌
  routes: [
    {
      path: "/",
      redirect: "/news",
    },
    {
      // path : url 주소
      path: "/news",
      name: "news",
      // component: CreateListView("NewsView"),
      component: NewsView,

      //to 이동할 url, from 현재 위치, next function
      beforeEnter: (to, from, next) => {
         bus.$emit("start:spinner");
         store
           .dispatch("FETCH_LIST", to.name)
           .then(() => {
             console.log("fetched");
             bus.$emit("end:spinner");
             next();
           })
           .catch((error) => {
             console.log(error);
           });
      },
    },
    {
      path: "/ask",
      name: "ask",
      // component: CreateListView("AskView"),
      component: AskView,
    },
    {
      path: "/jobs",
      name: "jobs",
      // component: CreateListView("JobsView"),
      component: JobsView,
    },
    {
      path: "/user",
      component: UserView,
    },
    {
      path: "/user/:id",
      component: UserView,
    },
    {
      path: "/item/:id",
      component: ItemView,
    },
  ],
});
