<template>
  <div class="wrapper">
    <LinearChart
      :key="country + region"
      class="pt-2"
      :data="last30DaysValues"
      :labels="last30DaysDates"
      style="height: 100%"
    />
  </div>
</template>

<script>

  import { getLastXDaysRegionInfections } from '@/helpers';
  import LinearChart from "./LinearChart";

  export default {
    components: {
      LinearChart,
    },
    computed: {
      location () {
        return this.$store.state.location;
      },
      country () {
        if (!this.location) {
          return '';
        }
        return this.$t('country.' + this.location.country);
      },
      region () {
        if (!this.location || !this.location.region) {
          return '';
        }
        return this.$t('province.' + this.location.region);
      },
      countryData () {
        if (!this.location) {
          return [];
        }
        return this.$store.state.data[this.location.country];
      },
      last30DaysRegionInfections() {
        if (!this.location) {
          return null;
        }
        return getLastXDaysRegionInfections(this.countryData, this.location.region);
      },
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 140px;
  }
</style>
