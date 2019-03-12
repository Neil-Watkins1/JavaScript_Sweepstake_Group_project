<template lang="html">
	<div class="single-player">
		<p><strong>Player Name:</strong> {{player.name}}</p>
		<p><strong>Allocated:</strong> {{ getGameOptions }}</p>
	</div>
</template>

<script>
export default {
	name: "SinglePlayers",
	props: ['player', 'sweep_id'],
	computed: {
		getGameOptions(){
			const gameEntries = this.player.games.filter( game => game.game_id === this.sweep_id )
			return gameEntries.map(game => game.allocatedOption).join(', ')
		}
	}
}
</script>

<style lang="css" scoped>

	.single-player {
		display: flex;
		justify-content: center;
	}

	.single-player > p:last-child {
		margin-left: 10px;
	}

</style>
