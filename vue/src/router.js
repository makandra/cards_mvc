import Vue from 'vue'
import VueRouter from 'vue-router'
import Cards from './Cards.js'
import CardsIndex from './cards/Index.js'

Vue.use(VueRouter)

var router = new VueRouter({
  hashbang: false
});

router.map({
  '/cards': {
    component: Cards,
    subRoutes: {
      '/': {
        component: CardsIndex
      }
    }
  },
  '/about': {
    component: {
      template: '#shared/about'
    }
  },
});

router.redirect({
  '*': '/cards'
});

export default router;
