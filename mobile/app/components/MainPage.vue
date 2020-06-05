<template>
  <Page>
    <ActionBar>
      <StackLayout orientation="horizontal">
        <Image src="~/assets/logo.png" width="40" height="40" class="logo" />
        <Label text="Super info o COVID-19" class="title" />
      </StackLayout>
    </ActionBar>
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
  import GeneralInfo from "./general-info/Panel.vue";
  import Grid from "./section-grid/Grid.vue";

  export default {
    components: {
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
