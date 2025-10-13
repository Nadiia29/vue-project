<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import BaseModal from '../components/composables/BaseModal.vue';

interface User {
	name: string;
	pass: string;
	email: string;
	favTech?: string;
	aiTools?: string;
}

export default defineComponent({
	name: 'UserPreview',
	components: { BaseModal },
	emits: ['delete-user'],

	props: {
		user: {
			type: Object as PropType<User>,
			default: () => ({ name: '', pass: '', email: '' }),
		},
		favTech: {
			type: String,
			default: '',
		},
		aiTools: {
			type: String,
			default: '',
		},
		users: {
			type: Array as PropType<User[]>,
			default: () => [],
		},
	},

	setup(props, { emit }) {
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
				emit('delete-user', userToDelete.value);
			}
			cancelDelete();
		};

		return {
			showModal,
			userToDelete,
			confirmDelete,
			cancelDelete,
			proceedDelete,
			props,
		};
	},
});
</script>

<template>
	<div class="preview">
		<h4>Preview:</h4>
		<p><b>Name:</b> {{ user.name }}</p>
		<p><b>Email:</b> {{ user.email }}</p>
		<p><b>Favorite Technology:</b> {{ favTech }}</p>
		<p><b> AI Tools / Services:</b> {{ aiTools }}</p>

		<div v-for="(el, index) in users" :key="index" class="user">
			<p>{{ el.favTech }}</p>

			<p>{{ el.aiTools }}</p>

			<h3>{{ el.name }}</h3>
			<p>
				{{ el.email }} - <b>{{ el.pass }}</b>
			</p>

			<button @click="confirmDelete(index)">Delete</button>
		</div>

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
.preview {
	border-top: 2px solid #eee;
	margin-top: 30px;
	padding-top: 20px;
}

.user {
	width: 550px;
	margin-top: 20px;
	border: 1px solid #21bc5a;
	color: #222;
	padding: 20px;
	border-radius: 8px;
	background: #2dfd79;
	background: radial-gradient(circle, #2dfd79 0%, #2295c3 100%);
	transition: background 0.4s, color 0.4s, border 0.4s;
}

button {
	margin-top: 10px;
	padding: 6px 12px;
	background: #c93866;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:hover {
	background: rgb(139, 51, 51);
}
</style>
