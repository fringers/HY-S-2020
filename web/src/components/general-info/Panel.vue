<template>
  <v-container>
    <v-row class="body-2">
      {{ country }}
    </v-row>
    <v-row class="subtitle-1">
      {{ region }}
    </v-row>
    <v-row>
      <div class="d-flex flex-row pt-2">
        <Numbers icon="😷" :value="3123" changes="+15" />
        <Numbers icon="💪" :value="1504" changes="-5" />
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
    data () {
      return {
        country: 'Polska',
        region: 'Mazowieckie',
      };
    },
  }
</script>

<style scoped>

</style>
