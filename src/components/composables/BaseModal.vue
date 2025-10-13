<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'BaseModal',
	emits: ['confirm', 'cancel'],
	props: {
		title: { type: String, default: 'Confirmation' },
		message: { type: String, required: true },
		confirmText: { type: String, default: 'Yes' },
		cancelText: { type: String, default: 'No' },
		show: { type: Boolean, required: true },
	},
});
</script>

<template>
	<div v-if="show" class="modal-overlay">
		<div class="modal">
			<h3>{{ title }}</h3>
			<p>{{ message }}</p>
			<div class="actions">
				<button @click="$emit('confirm')">{{ confirmText }}</button>
				<button @click="$emit('cancel')">{{ cancelText }}</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	display: flex;
	align-items: center;
	justify-content: center;
}
.modal {
	background: #dedede;
	padding: 20px;
	border-radius: 10px;
	min-width: 320px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}
.actions {
	display: flex;
	justify-content: flex-end;
	gap: 12px;
	margin-top: 20px;
}
button {
	padding: 8px 16px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	font-weight: 600;
}
button:first-child {
	background: #c92d2d;
	color: white;
}
button:last-child {
	background: #2295c3;
}
button:first-child:hover {
	background: #a32020;
}
button:last-child:hover {
	background: #12508a;
}
</style>
