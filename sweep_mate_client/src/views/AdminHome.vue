<template lang="html">
	<div class="admin-home">
		<section>
			<h1>Your Games</h1>
		</section>
		<section>
			<new-sweep-button></new-sweep-button>
		</section>
		<list-sweepstakes :sweepsList="sweepsList"></list-sweepstakes>
		<game-analysis :sweepsList="sweepsList"></game-analysis>
	</div>

</template>

<script>
import ListSweepstakes from '../components/ListSweepstakes'
import NewSweepButton from '../components/NewSweepButton'
import GameAnalysis from '../components/GameAnalysis'
import {eventBus} from '../main.js'
export default {
	data (){
		return {
			sweepsList: []
		}
	},
	components: {
		ListSweepstakes,
		NewSweepButton,
		GameAnalysis
	},
	mounted() {
		fetch("http://localhost:3000/api/sweepstakes/")
		.then(res => res.json())
		.then(data => {this.sweepsList = data
			eventBus.$on("sweep-deleted", (id) => {
				this.sweepsList = this.sweepsList.filter(sweep => sweep._id !== id)
			})
		})
	}
}
</script>

<style lang="css" scoped>
</style>
