<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUsers } from '../components/composables/useUsers';
import BaseModal from '../components/composables/BaseModal.vue';

export default defineComponent({
	name: 'UserDashboard',
	components: { BaseModal },
	emits: ['delete-user'],

	setup() {
		const { users, deleteUser } = useUsers();

		const showModal = ref(false);
		const userToDelete = ref<number | null>(null);

		const confirmDelete = (index: number) => {
			userToDelete.value = index;
			showModal.value = true;
		};

		const cancelDelete = () => {
			userToDelete.value = null;
			showModal.value = false;
		};

		const proceedDelete = () => {
			if (userToDelete.value !== null) {
				deleteUser(userToDelete.value);
			}
			cancelDelete();
		};

		return {
			users,
			showModal,
			userToDelete,
			confirmDelete,
			cancelDelete,
			proceedDelete,
		};
	},
});
</script>

<template>
	<div class="dashboard">
		<h2>User Dashboard</h2>

		<div v-if="users.length === 0" class="empty">
			<p>No users yet 🚀</p>
		</div>

		<table v-else class="user-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Email</th>
					<th>Favorite Tech</th>
					<th>AI Tool</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(user, index) in users" :key="index">
					<td>{{ index + 1 }}</td>
					<td>{{ user.name }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.favTech || '—' }}</td>
					<td>{{ user.aiTools || '—' }}</td>
					<td class="actions">
						<router-link :to="`/edit/${index}`" class="btn edit">✏️ Edit</router-link>
						<button @click="confirmDelete(index)" class="btn delete">🗑 Delete</button>
					</td>
				</tr>
			</tbody>
		</table>

		<BaseModal
			:show="showModal"
			title="Delete User"
			message="Are you sure you want to delete this user?"
			confirmText="Yes, delete"
			cancelText="Cancel"
			@confirm="proceedDelete"
			@cancel="cancelDelete"
		/>
	</div>
</template>

<style scoped>
.dashboard {
	max-width: 1000px;
	margin: 40px auto;
	padding: 20px;
}

h2 {
	margin-bottom: 20px;
	text-align: center;
	color: #333;
}

.empty {
	padding: 30px;
	background: #f9f9f9;
	border-radius: 10px;
	font-size: 18px;
	color: #777;
	text-align: center;
}

.user-table {
	width: 100%;
	border-collapse: collapse;
	background: white;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-table th,
.user-table td {
	padding: 12px 16px;
	text-align: left;
	border-bottom: 1px solid #eee;
}

.user-table th {
	background: teal;
	color: white;
	font-weight: bold;
}

.user-table tr:hover {
	background: #f5f5f5;
}

.actions {
	display: flex;
	gap: 10px;
}

.btn {
	padding: 8px 14px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	text-decoration: none;
	font-size: 14px;
	font-weight: 600;
	transition: background 0.2s ease, transform 0.1s ease;
}

.btn:hover {
	transform: scale(1.05);
}

.btn.edit {
	background: teal;
	color: white;
}

.btn.edit:hover {
	background: rgb(4, 193, 193);
}

.btn.delete {
	background: #e63946;
	color: white;
}

.btn.delete:hover {
	background: #c82333;
}
</style>
