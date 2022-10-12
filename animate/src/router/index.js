import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from '@/components/HelloWorld'
import index from "@/views/index";
import scroller from "@/views/scroller";
import animate from "@/views/animate";
import collision from "@/views/collision";
import conservation from "@/views/conservationOfMomentum";
import nodeGarden from "@/views/nodeGarden";
import forwardKinematics from "@/views/forwardKinematics";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/scroller",
      name: "scroller",
      component: scroller
    },
    {
      path: "/animate",
      name: "animate",
      component: animate
    },
    {
      path: "/collision",
      name: "collision",
      component: collision
    },
    {
      path: "/conservation",
      name: "conservation",
      component: conservation
    },
    {
      path: "/nodeGarden",
      name: "nodeGarden",
      component: nodeGarden
    },
    {
      path: "/forward",
      name: "forward",
      component: forwardKinematics
    }
  ]
});
