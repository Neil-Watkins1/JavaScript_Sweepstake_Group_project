<template lang="html">
	<div id="new-layer-forms">
		<form v-on:submit="createPlayer">
			<label>Name:
				<input type="text" name="playerName" value="" v-model="newPlayer.name" required>
			</label>
			<label>Email:
				<input type="email" name="playerEmail" value="" v-model="newPlayer.email" required>
			</label>
			<div class="announcement" v-if="yourOption">
				Your sweep is {{ this.yourOption }}
			</div>
			<button type="submit" name="button"><img src="../assets/bowlercopy.jpg" class="bowler" alt="bowler-hat"></button>
		</form>
	</div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
	name: "new-player-form",
	props: ["sweep"],
	data(){
		return {
			newPlayer: {
				name: "",
				email: "",
				games: []
			},
			playersList: [],
			yourOption: ''
		}
	},
	mounted(){
		fetch("http://localhost:3000/api/players/")
		.then(res => res.json())
		.then(data => this.playersList = data)
	},
  methods: {
		createPlayer(e){
			e.preventDefault();

			// pick option randomly
			const pickedOption = this.pickOption();

			// if(email already exists)
			if(!this.emailExists(this.newPlayer.email)){

				// allocate random option
				this.newPlayer.games.push({ game_id: this.sweep._id, allocatedOption: pickedOption });

				//create new player
				fetch("http://localhost:3000/api/players/", {
					method: 'post',
					body: JSON.stringify(this.newPlayer),
					headers: { 'Content-Type': 'application/json'}
				})
				.then(res => res.json())
				.then(player => {
					//announce choice
					this.yourOption = player.games[player.games.length-1].allocatedOption

					// pass it over to set the corresponding sweep's option as allocated
					eventBus.$emit('option-allocated', player )
					
					this.resetForm()
				})

			} else {
				// find existing player
				const existingPlayer = this.findPlayerbyEmail(this.newPlayer.email)

				// allocate random option
				existingPlayer.games.push({ game_id: this.sweep._id, allocatedOption: pickedOption });

				fetch("http://localhost:3000/api/players/" + existingPlayer._id, {
					method: 'put',
					body:JSON.stringify(existingPlayer),
					headers: { 'Content-Type': 'application/json'}
				})
				.then(res => res.json())
				.then(player => {
					//announce choice
					this.yourOption = player.games[player.games.length-1].allocatedOption

					// pass it over to set the corresponding sweep's option as allocated
					eventBus.$emit('option-allocated', player )

					this.resetForm()
				})
			}
		},
    pickOption() {
			// find all available options
			const availableOptions = this.sweep.options.filter(option => option.allocatedTo === '' );

			// allocate one of the available options randomly
			const selectedIndex = Math.floor(Math.random() * Math.floor(availableOptions.length - 1));
			const allocatedOption = availableOptions[selectedIndex];

			return allocatedOption.name;
    },
		emailExists(email){
			const emailsArray = this.playersList.map(player => player.email)
			return emailsArray.includes(email)
		},
		findPlayerbyEmail(email){
			return this.playersList.find(player => player.email === email)
		},
		resetForm(){
			this.newPlayer.name = this.newPlayer.email = ""
			this.newPlayer.games = []
		}
  }
}
</script>

<style lang="css" scoped>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30px;
	}
	label {
		margin-bottom: 20px;
	}
	input {
		padding: 5px;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		font-size: 0.9em;
	}

	button:not([type="reset"]), button:not([type="reset"]):hover, button:not([type="reset"]):active {
		background-color: white;
		box-shadow: 0 0 0 white;
	}

	img {
		width: 400px;
		height: auto;
	}

	.announcement {
		margin-top: 30px;
		padding: 30px;
		font-size: 1.2em;
		font-weight: bold;
		border: 3px dotted #999;
	}

	img:hover {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
0% { transform: translate(1px, 1px) rotate(0deg); }
10% { transform: translate(-1px, -2px) rotate(-1deg); }
20% { transform: translate(-3px, 0px) rotate(1deg); }
30% { transform: translate(3px, 2px) rotate(0deg); }
40% { transform: translate(1px, -1px) rotate(1deg); }
50% { transform: translate(-1px, 2px) rotate(-2deg); }
60% { transform: translate(-3px, 1px) rotate(0deg); }
70% { transform: translate(3px, 1px) rotate(-2deg); }
80% { transform: translate(-1px, -1px) rotate(2deg); }
90% { transform: translate(1px, 2px) rotate(0deg); }
100% { transform: translate(1px, -2px) rotate(-2deg); }
}
</style>
