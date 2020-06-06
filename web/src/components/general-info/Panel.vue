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
      <v-row class="subtitle-1 primary--text font-weight-medium">
        {{ region }}
      </v-row>
      <v-row v-if="regionCurrentStatus && regionLastStatus">
        <div class="d-flex flex-row pt-2">
          <Numbers
            icon="😷"
            :value="regionCurrentStatus.infectedCount"
            :changes="infectedChange"
          />
<!--          <Numbers icon="💪" :value="1504" changes="+5" :inverted-color="true" />-->
          <Numbers
            icon="💀"
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

  export default {
    components: {
      LMap,
      LTileLayer,
      Numbers
    },
    data() {
      return {
        zoom: 10,
        center: latLng(52.2330653, 20.921113),
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        showMap: true,
        mapOptions: {
          zoomControl: false
        }
      };
    },
    computed: {
      country () {
        // TODO: get from device location
        return this.$t('country.PL');
      },
      region () {
        // TODO: get from device location
        return this.$t('province.masovian');
      },
      regionCurrentStatus() {
        // TODO: get from device location
        const region = 'mazowieckie';
        const data = this.$store.state.PLData;
        if (!data || !data.length) {
          return null;
        }

        const currentStats = data[data.length - 1];
        const regionStats = currentStats.infectedByRegion
          .find(item => item.region === region);

        return regionStats;
      },
      regionLastStatus() {
        // TODO: get from device location
        const region = 'mazowieckie';
        const data = this.$store.state.PLData;
        if (!data || !data.length) {
          return null;
        }

        const currentStats = data[data.length - 3];
        const regionStats = currentStats.infectedByRegion
          .find(item => item.region === region);

        return regionStats;
      },
      infectedChange() {
        if (!this.regionCurrentStatus || !this.regionLastStatus) {
          return '0';
        }

        const diff = this.regionCurrentStatus.infectedCount - this.regionLastStatus.infectedCount;
        return this.numToStr(diff)
      },
      deceasedChange() {
        if (!this.regionCurrentStatus || !this.regionLastStatus) {
          return '0';
        }

        const diff = this.regionCurrentStatus.deceasedCount - this.regionLastStatus.deceasedCount;
        return this.numToStr(diff)
      },
    },
    methods: {
      numToStr (num) {
        if (num > 0) {
          return "+" + num;
        } else if (num < 0) {
          return "-" + num;
        } else {
          return '0';
        }
      }

    }
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
    background-color: rgba(255, 255, 255, 0.6);
    /*opacity: 0.3;*/
    position: relative;
  }
</style>
