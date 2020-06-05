<template>
  <StackLayout class="layout">
    <Image src="~/assets/logo.png" width="40" height="40" class="logo" />
    <Label :text="label" class="label" />
  </StackLayout>
</template>

<script>
  export default {
    props: ['label'],
  }
</script>

<style scoped>
  .layout {
    margin: 8;
    border-color: #34C1AD;
    border-width: 2;
    border-radius: 20;
  }

  .label {
    text-align: center;
    font-size: 14;
  }
</style>
