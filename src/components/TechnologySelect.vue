<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'TechnologySelect',
	props: {
		techs: {
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
		updateValue(val: string): void {
			this.$emit('update:modelValue', val);
		},
	},
});
</script>

<template>
	<div class="card">
		<p>Choose your favorite Web technology:</p>
		<div v-for="tech in techs" :key="tech">
			<input
				type="radio"
				:id="tech"
				:value="tech"
				:checked="tech === modelValue"
				@change="updateValue(tech)"
			/>
			<label :for="tech">{{ tech }}</label>
		</div>
	</div>
</template>
