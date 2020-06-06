<template>
  <ActionBar>
    <StackLayout orientation="horizontal">
      <Image src="~/assets/logo.png" width="40" height="40" class="logo" />
      <Label :text="titleText" class="title" />
    </StackLayout>
  </ActionBar>
</template>

<script>
  export default {
    props: ['title'],
    computed: {
      titleText () {
        if (this.title) {
          return this.title;
        }

        return 'Super info o COVID-19';
      }
    },
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
</style>
