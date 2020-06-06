<template>
  <v-container>
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
</template>

<script>
  import Numbers from "./Numbers.vue";

  export default {
    components: {
      Numbers,
    },
    computed: {
      country () {
        return this.$t('country.PL');
      },
      region () {
        return this.$t('province.masovian');
      }
    }
  }
</script>

<style scoped>

</style>
