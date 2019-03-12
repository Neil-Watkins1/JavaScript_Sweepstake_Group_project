<template lang="html">
  <div class="zoom">
    <div class="sweep-summary" :style="style">
      <h3>{{sweep.title}}</h3>
      <router-link :to="{name: 'singleSweepstake', params: {id: this.sweep._id}}" tag="button" class="play-sweep">PLAY</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SweepSummaryHome",
  props: ['sweep'],
  computed: {
    style () {
      return 'background-image: url(' + this.sweep.picture + ');'
    }
  }
}
</script>

<style lang="css" scoped>

.sweep-summary {
  display: flex;
  height: 200px;
  background-size: cover;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

div.container {
  padding: 10px;
}

button {
  box-shadow: 0 0 0;
}

h3 {
  color: white;
  background-color: rgba(74,70,70,0.5);
  padding: 10px;
  border-radius: 10px;
}

.zoom {
  transition: transform .2s;
}

.zoom:hover {
  -ms-transform: scale(1.05);
  -webkit-transform: scale(1.05); 
  transform: scale(1.05);
}

.play-sweep {
  margin: 10px;
  font-size: 18px;
  padding: 10px;
}

@media (min-width:768px) {
  .zoom {
    width: 46%;
    margin: 2%;
  }
}
</style>
