<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

interface User {
	name: string;
	pass: string;
	email: string;
}

export default defineComponent({
	name: 'UserForm',
	props: {
		modelValue: {
			type: Object as PropType<User>,
			required: true,
		},
	},
	emits: {
		'update:modelValue': (value: User) => true,
		submit: () => true,
	},

	methods: {
		handleSubmit(): void {
			this.$emit('submit');
		},
	},
});
</script>

<template>
	<div class="card">
		<form @submit.prevent="handleSubmit">
			<div class="form-group">
				<label for="name">Name:</label>
				<input
					id="name"
					type="text"
					:value="modelValue.name"
					@input="
						$emit('update:modelValue', {
							...modelValue,
							name: ($event.target as HTMLInputElement).value,
						})
					"
					placeholder="name"
				/>
			</div>

			<div class="form-group">
				<label for="pass">Password:</label>
				<input
					id="pass"
					type="password"
					:value="modelValue.pass"
					@input="
						$emit('update:modelValue', {
							...modelValue,
							pass: ($event.target as HTMLInputElement).value,
						})
					"
					placeholder="password"
				/>
			</div>

			<div class="form-group">
				<label for="email">Email:</label>
				<input
					id="email"
					type="email"
					:value="modelValue.email"
					@input="
						$emit('update:modelValue', {
							...modelValue,
							email: ($event.target as HTMLInputElement).value,
						})
					"
					placeholder="email"
				/>
			</div>

			<button type="submit">Submit</button>
		</form>
	</div>
</template>
