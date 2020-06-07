<template>
  <div>

  </div>
</template>

<script>
  import { getSectionsByCountryAndString } from '@/helpers';

  export default {
    props: ['searchString'],
    computed: {
      lang () {
        return this.$store.state.lang;
      },
      country () {
        return this.$store.state.country;
      },
      items () {
        return getSectionsByCountryAndString(this.$store.state, this.country, this.id);
      },
    },
  }
</script>

<style scoped>

</style>
