import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import { useSession } from '@/model/session';
//we don't do this for every component, because it would increase the loading speed of the page

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView //or component: () => import('../views/HomeView.vue')
    },
    {
      path: '/services',
      name: 'services',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ServicesView.vue') //is only called if someone clicks on it
    },
    {
      path: '/products',
      name: 'products',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductsView.vue') //is only called if someone clicks on it
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StatsView.vue')
    },
    {
      path: '/exercise/:name?',
      name: 'exercise',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ExerciseView.vue')
    },
    {
      path: '/list',
      name: 'list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ToDoView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/AdminView.vue')
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('../views/admin/ProductsList.vue')
    },
    {
      path: '/admin/products/edit/:id?',
      name: 'edit-products',
      component: () => import('../views/admin/ProductsEdit.vue')
    }
  ]
})

let loggedInPages = ['stats', 'exercise', 'list', 'friends', 'products', 'admin', 'edit-products', 'admin-products'];


router.beforeEach((to, from) => {
  const session = useSession();
  //if you're not logged in and want to go to a "logged in page" get sent home
  if(!session.user && loggedInPages.includes(String(to.name))) {
    router.push('/');
  }
  
  if(!!session.user !== loggedInPages.includes(String(to.name))) {
    return false;
  }
})


export default router;