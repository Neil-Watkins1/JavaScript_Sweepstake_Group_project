<template lang="html">
	<div v-if="sweep">
		<edit-sweep-form :sweep="sweep"></edit-sweep-form>
	</div>
</template>

<script>
import {eventBus} from '../main.js'
import EditSweepForm from '../components/EditSweepForm.vue'
export default {
	name: "admin-edit-sweepstake",
	data(){
		return {
			sweep: ''
		}
	},
	computed: {
		sweepstakeClosed() {
			const today = new Date();
			const cutOffDate = this.sweep.cutOffDate ? new Date(this.sweep.cutOffDate) : null ;

			//returns true if sweepstake cut off date is past
			return today >= cutOffDate;
		},
		countAvailableOptions(){
			return this.sweep.options.filter(option => option.allocatedTo === '').length
		}
	},
	components: {
		EditSweepForm
	},
	mounted(){
		const id = this.$route.params.id
		fetch("http://localhost:3000/api/sweepstakes/" + id)
		.then(res => res.json())
		.then(res => {
			this.sweep = res

			eventBus.$on('sweepstake-updated', updatedSweep => this.sweep = updatedSweep )
		})
	}
}
</script>

<style lang="css" scoped>

</style>
