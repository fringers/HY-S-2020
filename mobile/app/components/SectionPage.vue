<template>
  <Page>
    <Header :title="title" />
    <StackLayout class="content-panel">

      <HtmlView :html="content" class="html-view" />
    </StackLayout>
  </Page>
</template>

<script>
  import Header from './Header.vue';

  export default {
    props: ['id'],
    components: {
      Header,
    },
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
  .content-panel {
    vertical-align: top;
    font-size: 20;
    margin: 16;
  }

  .html-view {
    font-size: 16;
  }
</style>
