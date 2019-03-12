<template lang="html">
  <GChart
    id="chart"
    v-if="chartData"
    type="ColumnChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  props: ['sweepsList'],
  components: {
    GChart
  },
  data () {
    return {
      chartData: [],
      chartOptions: {
        chart: {
          title: 'Sweepstake Popularity'
        },
        isStacked: true,
        legend: {position: 'top'}
      }
    }
  },
  watch: {
    sweepsList: function(){
      this.chartData = this.getChartData()
    }
  },
  methods: {
    getChartData(){
      const chartHeadings = [['Sweep Name', 'Current Players', 'Available Spaces', {role: 'anotation'}]]
      const chartData = this.sweepsList.map(sweep => [sweep.title, this.countCurrentPlayers(sweep), this.countAvailableSpaces(sweep), ''])
      return chartHeadings.concat(chartData)
    },
    countCurrentPlayers(sweep){
      return sweep.options.filter(option => option.allocatedTo).length
    },
    countAvailableSpaces(sweep){
      return sweep.options.length - this.countCurrentPlayers(sweep)
    }
  }
}
</script>

<style lang="css" scoped>

#chart {
  margin-top: 30px;
}
</style>
