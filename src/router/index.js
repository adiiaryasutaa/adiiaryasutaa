import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProjectView from "../views/ProjectView.vue";
import BlogView from "../views/BlogView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		meta: {
			title: "Adi Aryasuta",
		},
	},
	{
		path: "/about",
		name: "about",
		component: AboutView,
		meta: {
			title: "Adi Aryasuta | About",
		},
	},
	{
		path: "/projects",
		name: "project",
		component: ProjectView,
		meta: {
			title: "Adi Aryasuta | Projects",
		},
	},
	{
		path: "/blogs",
		name: "blog",
		component: BlogView,
		meta: {
			title: "Adi Aryasuta | Blogs",
		},
	},
	{
		path: "/:catchAll(.*)",
		name: "404",
		component: PageNotFoundView,
		meta: {
			title: "404 | Page Not Found",
		},
	},
];

const router = createRouter({
	scrollBehavior() {
		return {
			el: "#app",
		};
	},
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next();
});

export default router;
