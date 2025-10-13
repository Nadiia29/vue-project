<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'AISelect',
	props: {
		aiTools: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		modelValue: {
			type: String,
			default: '',
		},
	},
	emits: {
		'update:modelValue': (value: string) => true,
	},

	methods: {
		updateValue(event: Event): void {
			const target = event.target as HTMLSelectElement;
			this.$emit('update:modelValue', target.value);
		},
	},
});
</script>

<template>
	<div class="card">
		<label for="aiTools">Choose AI Tools / Services: </label>
		<select id="aiTools" :value="modelValue" @change="updateValue">
			<option v-for="ai in aiTools" :key="ai" :value="ai">{{ ai }}</option>
		</select>
	</div>
</template>
