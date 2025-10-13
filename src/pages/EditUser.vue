<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsers, type User } from '../components/composables/useUsers';
import { useValidation } from '../components/composables/useValidation';

export default defineComponent({
	name: 'EditUser',
	setup() {
		const route = useRoute();
		const router = useRouter();
		const { users, updateUser } = useUsers();
		const { validateUser } = useValidation();

		const index = Number(route.params.index);

		const user = reactive<User>({ ...users.value[index]! });

		function saveChanges() {
			const error = validateUser(user, user.favTech || '', user.aiTools || '');
			if (error) {
				alert(error);
				return;
			}
			updateUser(index, user);
			router.push('/dashboard');
		}

		return { user, saveChanges };
	},
});
</script>

<template>
	<div class="card">
		<h3>Edit User</h3>

		<div class="form-group">
			<label>Name:</label>
			<input v-model="user.name" type="text" />
		</div>

		<div class="form-group">
			<label>Password:</label>
			<input v-model="user.pass" type="password" />
		</div>

		<div class="form-group">
			<label>Email:</label>
			<input v-model="user.email" type="email" />
		</div>

		<div class="form-group">
			<label>Favorite Technology:</label>
			<input v-model="user.favTech" type="text" />
		</div>

		<div class="form-group">
			<label>AI Tools:</label>
			<input v-model="user.aiTools" type="text" />
		</div>

		<button @click="saveChanges">💾 Save</button>
		<button @click="$router.push('/dashboard')">↩ Back</button>
	</div>
</template>

<style scoped>
.card {
	max-width: 500px;
	margin: 40px auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	background: white;
}
.form-group {
	margin-bottom: 15px;
}
input {
	width: 100%;
	max-width: 245px;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
}
button {
	margin-right: 10px;
	padding: 10px 20px;
	background: #12508a;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
button:hover {
	background: darkcyan;
}
</style>
