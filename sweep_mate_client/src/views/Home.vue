<template>
	<div class="home">
		<section class="logo">
			<h1>SweepMate</h1>
			<img src="../assets/penguin.png" alt="penguin_logo">
		</section>
		<h2>Current Games</h2>
		<section id="sweeps-container" v-if="sweeps">
			<sweep-summary-home v-for="(sweep, index) in sweeps" :key="index" :sweep="sweep"></sweep-summary-home>
		</section>
	</div>
</template>

<script>
import SweepSummaryHome from '../components/SweepSummaryHome.vue';
export default {
	name: 'home',
	components: {
		SweepSummaryHome
	},
	data() {
		return {
			sweeps: []
		}
	},
	mounted(){
		fetch("http://localhost:3000/api/sweepstakes/")
		.then(res => res.json())
		.then(data => this.sweeps = data)
	},
	methods: {
	}
}
</script>

<style lang="css" scoped>

img {
  -webkit-transition: -webkit-transform .8s ease-in-out;
          transition:         transform .8s ease-in-out;
}
img:hover {
  -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
}

	#sweeps-container {
		display: flex;
		flex-direction: column;
	}

	h1 {
		font-family: 'Righteous', cursive;
		font-size: 50px;
		margin-bottom: 2px;
		margin-top: 10px;
	}

	@media (min-width:768px) {
		#sweeps-container {
			flex-direction: row;
			flex-wrap: wrap;
		}
	}
</style>
