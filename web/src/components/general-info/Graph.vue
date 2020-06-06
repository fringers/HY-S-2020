<template>
  <div class="wrapper">
    <v-card
      class="mx-auto text-center"
      color="primary"
      dark
    >
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="last30DaysRegionInfections"
            color="rgba(255, 255, 255, .7)"
            height="80"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">
              {{ item.value }}
            </template>
          </v-sparkline>
        </v-sheet>

        <span>{{ country }}, {{ region }} - infections</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

  export default {
    computed: {
      country () {
        // TODO: get from device location
        return this.$t('country.PL');
      },
      region () {
        // TODO: get from device location
        return this.$t('province.masovian');
      },
      last30DaysStats() {
        const data = this.$store.state.PLData;
        if (!data || !data.length) {
          return null;
        }

        return data.slice(Math.max(data.length - 7, 0))
      },
      last30DaysRegionStats() {
        // TODO: get from device location
        const region = 'mazowieckie';
        const data = this.last30DaysStats;
        if (!data || !data.length) {
          return null;
        }

        return data
          .map(item => item.infectedByRegion
            .find(item => item.region === region));
      },
      last30DaysRegionInfections() {
        const data = this.last30DaysRegionStats;
        if (!data || !data.length) {
          return null;
        }

        return data.map(item => item.infectedCount);
      },
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 140px;
  }
</style>
