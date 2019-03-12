<template lang="html">
  <div v-if="sweep.finalAnswer">
    <h2>Winner: {{ getWinner }}</h2>
    <h2>Result: {{ sweep.finalAnswer}}</h2>
  </div>
</template>

<script>
export default {
  props: ['sweep'],
	computed: {
		getWinner(){
			const winningOption = this.sweep.options.find(option => option.name === this.sweep.finalAnswer)
			return winningOption.allocatedTo
		}
	}
}
</script>

<style lang="css" scoped>
.pop-enter-active, .pop-leave-active {
  transition: opacity 2.5s ease-out;
}

.pop-enter, .pop-leave-to {
  opacity: 0
}
</style>
