<template>
  <Page>
    <Header />
    <StackLayout class="home-panel">

      <GeneralInfo />

      <SearchBar hint="Szukaj info..."
                 :text="searchPhrase" @textChange="onTextChanged"
                 @clear="onClear" @submit="onSubmit"
                 @loaded="onSearchBarLoaded"
      />

      <Grid />
    </StackLayout>
  </Page>
</template>

<script>
  import Header from './Header.vue';
  import GeneralInfo from "./general-info/Panel.vue";
  import Grid from "./section-grid/Grid.vue";

  export default {
    components: {
      Header,
      GeneralInfo,
      Grid,
    },
    data () {
      return {
        searchPhrase: '',
        country: 'Polska',
        region: 'Mazowieckie'
      };
    },
    methods: {
      onSearchBarLoaded (event) {
        if (event.object.android) {
          event.object.android.clearFocus();
        }
      },
      onTextChanged () {
        // console.log('onTextChanged');
      },
      onClear () {
        // console.log('onClear');
      },
      onSubmit () {
        // console.log('onSubmit');
      },
    },
  }
</script>

<style scoped>
  .home-panel {
    vertical-align: top;
    font-size: 20;
    margin: 0;
  }
</style>
