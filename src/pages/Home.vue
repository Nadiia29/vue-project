<script lang="ts">
import { defineComponent } from 'vue';
import TechnologySelect from '../components/TechnologySelect.vue';
import UserForm from '../components/UserForm.vue';
import UserPreview from '../components/UserPreview.vue';
import AISelect from '../components/AISelect.vue';
import { useUsers, type User } from '../components/composables/useUsers';
import { useValidation } from '../components/composables/useValidation';

interface AppData {
	info: string;
	techs: string[];
	favTech: string;
	aiTools: string[];
	selectedAI: string;
	user: User;
	error: string;
	success: string;
}

export default defineComponent({
	name: 'Home',
	components: { TechnologySelect, AISelect, UserForm, UserPreview },

	setup() {
		const { users, addUser, deleteUser } = useUsers();
		const { validateUser } = useValidation();
		return { users, addUser, deleteUser, validateUser };
	},

	data(): AppData {
		return {
			info: 'Hello, world!',
			techs: ['HTML', 'CSS', 'JavaScript', 'Vue', 'React'],
			favTech: '',
			aiTools: [
				'ChatGPT (OpenAI)',
				'Copilot (GitHub)',
				'Gemini (Google DeepMind)',
				'MidJourney',
				'TensorFlow',
				'Stable Diffusion',
				'DALL·E (OpenAI)',
				'Hugging Face Transformers',
			],
			selectedAI: '',
			user: { name: '', pass: '', email: '' },
			error: '',
			success: '',
		};
	},

	methods: {
		sendData(): void {
			const validationError = this.validateUser(this.user, this.favTech, this.selectedAI);

			if (validationError) {
				this.error = validationError;
				return;
			}

			this.error = '';

			this.addUser({
				name: this.user.name,
				pass: this.user.pass,
				email: this.user.email,
				favTech: this.favTech,
				aiTools: this.selectedAI,
			});

			this.user = { name: '', pass: '', email: '' };
			this.favTech = '';
			this.selectedAI = '';

			this.success = 'User added successfully!';
			setTimeout(() => {
				this.success = '';
			}, 3000);
		},
	},
});
</script>

<template>
	<div class="wrapper">
		<h3>{{ info }}</h3>
		<TechnologySelect v-model="favTech" :techs="techs" />
		<AISelect v-model="selectedAI" :aiTools="aiTools" />
		<UserForm v-model="user" @submit="sendData" />

		<p class="error" v-if="users.length === 0">No Users</p>
		<p class="error">{{ error }}</p>
		<p class="success" v-if="success">{{ success }}</p>

		<UserPreview
			:user="user"
			:favTech="favTech"
			:aiTools="selectedAI"
			:users="users"
			@delete-user="deleteUser"
		/>
	</div>
</template>

<style scoped>
.wrapper {
	width: 600px;
	margin: 50px;
}
</style>
