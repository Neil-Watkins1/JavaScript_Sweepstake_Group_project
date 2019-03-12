<template lang="html">
	<label>
		<input type="input" :name="fieldName" v-model="option.name" :readonly="alreadyAllocated"/>
		<input type="hidden" v-model="option.allocatedTo" />
		<span v-if="alreadyAllocated">&nbsp;- allocated</span>
	</label>
</template>

<script>
export default {
	name: "option-checkbox",
	props: ['option', 'index'],
	computed: {
		alreadyAllocated(){
			return this.option.allocatedTo !== ''
		},
		fieldName(){
			return 'option-' + this.index
		}
	}
}
</script>

<style lang="css" scoped>
	label {
		display: flex;
		width: 70%;
		margin-left:auto;
		margin-right: auto;
	}
	input {
		padding: 5px;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		font-size: 0.9em;
		margin-bottom: 10px;
	}
</style>
