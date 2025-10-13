<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
	name: 'RootApp',

	setup() {
		const isDark = ref(false);

		onMounted(() => {
			const savedTheme = localStorage.getItem('theme');
			if (savedTheme) {
				isDark.value = savedTheme === 'dark';
				document.body.classList.toggle('dark-theme', isDark.value);
			}
		});

		const toggleTheme = () => {
			isDark.value = !isDark.value;
			document.body.classList.toggle('dark-theme', isDark.value);
			localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
		};

		return { isDark, toggleTheme };
	},
});
</script>

<template>
	<div>
		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/dashboard">User Dashboard</router-link>
			<button class="theme-toggle" @click="toggleTheme">
				{{ isDark ? '🌙 Dark' : '☀️ Light' }}
			</button>
		</nav>

		<router-view />
	</div>
</template>

<style>
nav {
	margin: 20px;
	display: flex;
	align-items: center;
	gap: 15px;
}

a {
	text-decoration: none;
	color: rgb(2, 110, 110);
	font-weight: bold;
}

a.router-link-active {
	text-decoration: underline;
}

.theme-toggle {
	margin-left: auto;
	padding: 6px 12px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	font-weight: 600;
	background: #2295c3;
	color: white;
	transition: 0.3s;
}
.theme-toggle:hover {
	background: #176d8c;
}

h3 {
	font-weight: 600;
	margin-bottom: 20px;
	color: #222;
}

.card {
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 20px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
	background: #fff;
}

form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

label {
	margin: 6px 0;
	font-weight: 500;
}

input,
select {
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
}
.form-group {
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
}

.form-group label {
	margin-bottom: 6px;
	font-weight: 500;
}

.form-group input {
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
}

button {
	padding: 10px 20px;
	background: rgb(1, 99, 99);
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
}

button:hover {
	background: darkcyan;
}

.error {
	color: #c93866;
	font-weight: 700;
	margin: 8px 0;
}

.success {
	color: #110291;
	font-weight: 600;
	margin: 8px 0;
}
</style>
