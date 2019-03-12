<template lang="html">
	<div id="sweep-details">
		<h1>{{ sweep.title }}</h1>
		<p v-if="!sweepstakeClosed()">Available until: {{ cutOffDate }}</p>
		<p class="notification" v-else>This sweepstake is no longer available.</p>
	</div>
</template>

<script>
export default {
	name: "sweepstake-details",
	props: ['sweep', 'sweepstakeClosed'],
	computed: {
		cutOffDate: function(){
			const cutOffDate = new Date(this.sweep.cutOffDate)
			return cutOffDate.toLocaleDateString('en-GB', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		}
	}
}
</script>

<style lang="css" scoped>
	.notification {
		color: #F00;
	}
</style>
