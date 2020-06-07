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
      last30DaysValues () {
        if (!this.last30DaysRegionInfections) {
          return null;
        }

        return this.last30DaysRegionInfections.map(it => it.value);
      },
      last30DaysDates () {
        if (!this.last30DaysRegionInfections) {
          return null;
        }

        return this.last30DaysRegionInfections.map(it => this.formatDate(it.timestamp));
      },
    },
    methods: {
      formatDate (date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate();

        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;

        return [ month, day].join('-');
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 140px;
  }
</style>
