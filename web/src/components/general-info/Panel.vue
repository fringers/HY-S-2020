<template>
  <div class="wrapper">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      class="map"
    >
      <l-tile-layer
        :url="url"
      />
    </l-map>

    <v-container class="content px-10">
      <v-row class="body-2">
        {{ country }}
      </v-row>
      <v-row v-if="region" class="subtitle-1 primary--text font-weight-medium">
        {{ region }}
      </v-row>
      <v-row v-if="regionCurrentStatus">
        <div class="d-flex flex-row pt-2">
          <Numbers
            v-if="regionCurrentStatus.infectedCount && infectedChange"
            img="/imgs/fever.png"
            :value="regionCurrentStatus.infectedCount"
            :changes="infectedChange"
          />
<!--          <Numbers icon="💪" :value="1504" changes="+5" :inverted-color="true" />-->
          <Numbers
            v-if="regionCurrentStatus.deceasedCount && deceasedChange"
            img="/imgs/rip.png"
            :value="regionCurrentStatus.deceasedCount"
            :changes="deceasedChange"
          />
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { latLng } from "leaflet";
  import { LMap, LTileLayer } from "vue2-leaflet";

  import Numbers from "./Numbers.vue";

  import { getCurrentRegionsStats, getLastRegionsStats, getInfectedChange, getDeceasedChange } from '@/helpers';

  export default {
    components: {
      LMap,
      LTileLayer,
      Numbers
    },
    data() {
      return {
        zoom: 10,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        showMap: true,
        mapOptions: {
          zoomControl: false
        }
      };
    },
    computed: {
      location () {
        return this.$store.state.location;
      },
      center () {
        if (!this.location) {
          return latLng(0, 0);
        }
        return latLng(this.location.coords.latitude, this.location.coords.longitude);
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
      regionCurrentStatus() {
        if (!this.location) {
          return null;
        }
        return getCurrentRegionsStats(this.countryData, this.location.region);
      },
      regionLastStatus() {
        if (!this.location) {
          return null;
        }
        return getLastRegionsStats(this.countryData, this.location.region);
      },
      infectedChange() {
        if (!this.location) {
          return null;
        }
        return getInfectedChange(this.countryData, this.location.region);
      },
      deceasedChange() {
        if (!this.location) {
          return null;
        }
        return getDeceasedChange(this.countryData, this.location.region);
      },
    },
  }
</script>

<style scoped>
  .wrapper {
    height: 140px;
  }

  .map {
    position: absolute;
    width: 100%;
    height: 140px;
    z-index: 0 !important;
  }

  .content {
    height: 140px;
    background-color: rgba(255, 255, 255, 0.75);
    position: relative;
  }
</style>
