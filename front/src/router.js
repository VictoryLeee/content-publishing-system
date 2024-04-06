import Vue from "vue";
import VueRouter from "vue-router";
import demo from "./components/demo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "demo",
    component: demo
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import(/* webpackChunkName: "signup" */ "./views/signup.vue")
  },
  {
    path: "/login",
    name: "login",

    component: () => import(/* webpackChunkName: "login" */ "./views/login.vue")
  },
  {
    path: "/articleCreate",
    name: "articleCreate",
    component: () => import(/* webpackChunkName: "articleCreate" */ "./views/articleCreate.vue")
  },
  {
    path: "/articleEdit/:aid",
    props: true,
    name: "articleEdit",
    component: () => import(/* webpackChunkName: "articleCreate" */ "./views/articleCreate.vue")
  },
  {
    path: "/articleLists",
    name: "articleLists",
    component: () => import(/* webpackChunkName: "articleLists" */ "./views/articleLists.vue")
  },
    { path: "/articles/:id", props: true, component: () => import(/* webpackChunkName: "articleSingle" */ "./views/articleSingle.vue") },
    {
    path: "/userinfo",
    name: "userinfo",
    component: () => import(/* webpackChunkName: "userinfo" */ "./views/userinfo.vue")
  },
];


const router = new VueRouter({
  routes
});

export default router;