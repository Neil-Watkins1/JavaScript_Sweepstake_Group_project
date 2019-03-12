<template lang="html">
  <div id="sweep-list">
    <div v-for="(sweep, index) in sweepsList" :key="index" class="sweep-item">
        <h3>{{sweep.title}}</h3>
        <router-link :to="{name: 'admin-sweepstakes-edit', params: {id: sweep._id}}" class="button">Edit</router-link>
        <button type="button" name="delete-sweep" v-on:click="deleteSweep(sweep._id)">Delete</button>
    </div>
  </div>
</template>

<script>
import {eventBus} from '../main.js'
export default {
  name: "SweepsListItem",
  props: ['sweepsList'],
  methods:{
    deleteSweep: function(id){
      fetch("http://localhost:3000/api/sweepstakes/" + id, {
        method: "DELETE"
      })
      eventBus.$emit('sweep-deleted', id)
    }
  }
}

</script>

<style lang="css" scoped>

#sweep-list {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.sweep-item {
  border-style: solid;
  width: 96%;
  height: auto;
  flex-direction: column;
  border-style: solid;
  padding: 12px;
  margin: 2%;
  height: auto;
  border-radius: 10px;
  flex-wrap: wrap;
  padding: 10px;
  text-align: -webkit-center;
  font-weight: bold;
  font-size: 18px;
  justify-content: center;
}

button, .button {
  margin: 17px;
  padding: 7px;
}

@media (min-width:768px) {
  .sweep-item {
    width: 40%;
  }
}

</style>
