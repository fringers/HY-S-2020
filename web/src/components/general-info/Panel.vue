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

    <v-container class="content px-6">
      <v-row class="body-2">
        {{ country }}
      </v-row>
      <v-row class="subtitle-1 primary--text font-weight-medium">
        {{ region }}
      </v-row>
      <v-row>
        <div class="d-flex flex-row pt-2">
          <Numbers icon="😷" :value="3123" changes="+15" />
          <Numbers icon="💪" :value="1504" changes="+5" :inverted-color="true" />
          <Numbers icon="💀" :value="120" changes="+8" />
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
        return this.$t('country.PL');
      },
      region () {
        return this.$t('province.masovian');
      }
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
    background-color: rgba(255, 255, 255, 0.6);
    /*opacity: 0.3;*/
    position: relative;
  }
</style>
