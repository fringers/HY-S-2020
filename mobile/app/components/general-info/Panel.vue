<template>
  <StackLayout class="general-info-panel">
    <Label :text="country" textWrap="true" class="info-country-name" />
    <Label :text="region" textWrap="true" class="info-region-name"/>
    <StackLayout orientation="horizontal">
      <Numbers icon="😷" :value="3123" changes="+15" class="numbers-item" />
      <Numbers icon="💪" :value="1504" changes="-5" class="numbers-item" />
      <Numbers icon="💀" :value="120" changes="+8" class="numbers-item" />
    </StackLayout>
  </StackLayout>
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
  .general-info-panel {
    margin: 16;
  }

  .info-country-name {
    font-size: 16;
  }

  .info-region-name {
    font-size: 18;
  }

  .numbers-item {
    margin-right: 8;
  }
</style>
