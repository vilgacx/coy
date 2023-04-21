import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlaygroundView from '../views/PlaygroundView.vue';
import InstructionView from '../views/InstructionView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/playground',
      name: 'PlaygroundView',
      component: PlaygroundView
    },
    {
      path: '/instructions',
      name: 'InstructionView',
      component:InstructionView
    },
  ]
});

export default router;
