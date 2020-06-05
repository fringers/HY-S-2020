<template>
  <Page>
    <ActionBar>
      <StackLayout orientation="horizontal">
        <Image src="~/assets/logo.png" width="40" height="40" class="logo" />
        <Label text="Super info o COVID-19" class="title" />
      </StackLayout>
    </ActionBar>
    <StackLayout class="home-panel">

      <Label text="Section" />
    </StackLayout>
  </Page>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .logo {
    horizontal-alignment: right;
    vertical-alignment: center;
  }

  .title {
    vertical-alignment: center;
    font-size: 26;
  }

  .home-panel {
    vertical-align: top;
    font-size: 20;
    margin: 0;
  }
</style>
