import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '@/lib/supabase';
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import JobView from '@/views/JobView.vue';
import AddJobView from '@/views/AddJobView.vue';
import EditJobView from '@/views/EditJobView.vue';
import SignUpView from '@/views/SignUpView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/items',
      name: 'items',
      component: JobsView,
    },
    {
      path: '/items/add',        
      name: 'add-item',
      component: AddJobView,
    },
    {
      path: '/items/edit/:id',    
      name: 'edit-item',
      component: EditJobView,
    },
    {
      path: '/items/:id',        
      name: 'item',
      component: JobView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
