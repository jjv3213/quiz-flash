import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import Edit from "@/views/Edit.vue";
import Quiz from "@/views/Quiz.vue";
import Create from "@/views/Create.vue";

import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/edit/:topic_slug",
      name: "Edit",
      component: Edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/quiz/:topic_slug",
      name: "Quiz",
      component: Quiz,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/create",
      name: "Create",
      component: Create,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // User is signed in. Proceed to route
      next();
    } else {
      // No user is signed in. Redirect to login
      next({
        name: "Login"
      });
    }
  } else {
    // if route is not guarded by auth, proceed
    next();
  }
});

export default router;
