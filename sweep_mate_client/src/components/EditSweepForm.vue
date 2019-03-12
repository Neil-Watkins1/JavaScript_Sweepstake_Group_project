<template lang="html">
	<div id="sweep-edit-form">

		<p v-if="notification" class="notification">{{ notification }}</p>

		<form v-if="sweep" v-on:submit="saveChanges">
			<label for="title">Title:
			<input type="text" id="title" name="title" size="45" v-model="amendedSweep.title" required>
			</label>

			<label for="picture">Picture URL:
			<input type="url" id="picture" name="picture" size="45" v-model="amendedSweep.picture" required>
			</label>

			<img id="sweep-picture" :src="amendedSweep.picture" alt="sweep.title" v-if="sweep.picture"/>

			<label for="date">Cut-off Date:
			<input type="date" id="date" name="date" v-model="amendedSweep.cutOffDate" required>
			</label>

			<fieldset>
				<legend>Sweepstake Options (already allocated options cannot be edited):</legend>
				<option-list v-for="(option, index) in amendedSweep.options" :key="index" :option="option" :index="index"/>
			</fieldset>

			<label for="finalAnswer" :class="{disabled: !this.sweepstakeClosed()}">Final Answer:
			<input type="text" id="finalAnswer" name="finalAnswer" v-model="amendedSweep.finalAnswer" :disabled="!this.sweepstakeClosed()">
			</label>

			<sweepstake-results :sweep="sweep" v-if="sweep.finalAnswer != '' && sweepstakeClosed"></sweepstake-results>

			<button type="submit" name="button">Save Changes</button>
		</form>
	</div>
</template>

<script>
import { eventBus } from '../main.js';
import OptionList from './OptionList.vue'
import SweepstakeResults from '../components/SweepstakeResults.vue'
export default {
	name: "edit-sweep-form",
	props: ['sweep'],
	data(){
		return {
			amendedSweep: {
				title: this.sweep.title,
				picture: this.sweep.picture,
				cutOffDate: this.sweep.cutOffDate,
				options: this.sweep.options,
				finalAnswer: this.sweep.finalAnswer
			},
			notification: ''
		}
	},
	computed: {
		disabled(){
			return !this.sweepstakeClosed() && this.countAvailableOptions() > 0
		}
	},
	components: {
		OptionList,
		SweepstakeResults
	},
	methods: {
		saveChanges(e){
			e.preventDefault()

			const id = this.sweep._id

			// then save the changes into the db
			fetch("http://localhost:3000/api/sweepstakes/" + id, {
				method: 'put',
				body: JSON.stringify(this.amendedSweep),
				headers: { 'Content-Type': 'application/json'}
			})
			.then( res => res.json())
			.then( updatedSweep => {
				eventBus.$emit('sweepstake-updated', updatedSweep)
				this.notification = "Sweepstake updated"
			} )
		},
		sweepstakeClosed() {
			const today = new Date();
			const cutOffDate = this.amendedSweep.cutOffDate ? new Date(this.amendedSweep.cutOffDate) : null ;

			//returns true if sweepstake cut off date is past
			return today >= cutOffDate;
		},
		countAvailableOptions(){
			return this.sweep.options.filter(option => option.allocatedTo === '').length
		}
	}
}
</script>

<style lang="css" scoped>
	.notification {
		padding:10px;
		background-color: #C4F7DC;
		border: 1px solid #64D598;
		border-radius: 5px;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30px;
	}
	input {
		padding: 5px;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		font-size: 0.9em;
		margin-bottom: 20px;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		border: 0;
	}
	.disabled {
		color: #848484;
	}
	#sweep-picture {
		height: 200px;
		margin-bottom: 20px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
</style>
