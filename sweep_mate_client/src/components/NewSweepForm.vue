<template lang="html">
  <form v-on:submit="createSweep">
    <br>
    <p v-if="message" class="msg">{{this.message}}</p>
    <br>
    <label>Title of Sweep:
			<input type="text" name="sweepTitle" value="" v-model="newSweep.title" required>
		</label>
		<label>Picture:
			<input type="picture" name="sweepPicture" value="" v-model="newSweep.picture" required>
		</label>
    <label>Cut off Date:
      <input type="date" name="cutOffDate" value="" v-model="newSweep.cutOffDate" required>
    </label>
    <label>Options: (seperate by commas)
      <textarea rows="8" cols="40" name="options" v-model="newSweep.options" require placeholder="Enter options seperated by comma"></textarea>
    </label>
		<button v-on:click="optionsArray" type="submit" name="button">CREATE</button>
  </form>
</template>

<script>
export default {
  name: 'new-sweep-form',
  props: [''],
  data () {
    return {
      newSweep: {
        title: "",
        picture: "",
        cutOffDate: "",
        options: []
      },
      message: ""
    }
  },
  methods: {
    createSweep(e){
      e.preventDefault();
      fetch("http://localhost:3000/api/sweepstakes/", {
        method: 'post',
        body: JSON.stringify(this.newSweep),
        headers: { 'Content-Type': 'application/json'}
      })
      .then( () => {this.message = "Sweepstake Created"
      this.newSweep.title = ''
      this.newSweep.picture = ''
      this.newSweep.cutOffDate = ''
      this.newSweep.options = []
    })
    },
    optionsArray() {
      let optionsArray = this.newSweep.options.split(",")
      const unfilteredArray = optionsArray.map(name => {
          let newObj = {}
          newObj['name'] = name.trim()
          newObj['allocatedTo'] = '';
          return newObj
      })
      this.newSweep.options = unfilteredArray.filter(option => option.name != '')
    }
  }
}
</script>

<style lang="css" scoped>

.msg {
		padding:10px;
		background-color: #C4F7DC;
		border: 1px solid #64D598;
		border-radius: 5px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  max-width:100px;
  padding: 5px 10px;
}

label{
    display: inline-block;
    float: left;
    clear: left;
    width: 250px;
		margin-bottom: 20px;
    text-align: left; /*Change to right here if you want it close to the inputs*/
}
input {
  display: inline-block;
  float: right;
}
</style>
