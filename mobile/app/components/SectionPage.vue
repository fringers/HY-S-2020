<template>
  <Page>
    <ActionBar>
      <StackLayout orientation="horizontal">
        <Image src="~/assets/logo.png" width="40" height="40" class="logo" />
        <Label :text="title" class="title" />
      </StackLayout>
    </ActionBar>
    <StackLayout class="content-panel">

      <HtmlView :html="content" />
    </StackLayout>
  </Page>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      item () {
        const PL = this.$store.state.PL;
        if (!PL) {
          return null;
        }

        return PL.value[this.id];
      },
      title () {
        if (!this.item) {
          return '';
        }

        return this.item.title.pl;
      },
      content () {
        if (!this.item) {
          return '';
        }

        return this.item.content.pl;
      },
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

  .content-panel {
    vertical-align: top;
    font-size: 20;
    margin: 16;
  }
</style>
