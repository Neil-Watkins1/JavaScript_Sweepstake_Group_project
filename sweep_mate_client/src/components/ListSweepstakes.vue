<template lang="html">
  <div class="">
      <sweep-list-item :sweepsList="sweepsList"></sweep-list-item>
  </div>
</template>

<script>
import SweepListItem from './SweepListItem.vue'
export default {
  props: ['sweepsList'],
  components: {
    SweepListItem
  },
}
</script>

<style lang="css" scoped>
</style>
