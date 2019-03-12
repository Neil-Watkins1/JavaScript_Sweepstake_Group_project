<template lang="html">
  <div class="">
		<h2>Current Players</h2>
    <single-player v-for="(player, index) in sweepsPlayers" :key="index" :player="player" :sweep_id="sweep_id"></single-player>
  </div>
</template>

<script>
import SinglePlayer from './SinglePlayer.vue'
export default {
  props: ['sweepsPlayers', 'sweep_id'],
  data(){
    return {
    }
  },
  components: {
    SinglePlayer
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="css" scoped>
</style>
