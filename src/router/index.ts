import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import UserDashboard from '../pages/UserDashboard.vue';
import EditUser from '../pages/EditUser.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/dashboard', component: UserDashboard },
	{ path: '/edit/:index', component: EditUser, props: true },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
