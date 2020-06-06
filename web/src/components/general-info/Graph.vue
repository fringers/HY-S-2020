<template>
  <div class="wrapper">
    <v-card
      v-if="last30DaysRegionInfections"
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

  import { getLastXDaysRegionInfections } from '@/helpers';

  export default {
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
        if (!this.location) {
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
