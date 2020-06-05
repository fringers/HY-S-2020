<template>
  <Page>
    <ActionBar title="">
      <StackLayout orientation="horizontal">
        <Image src="~/assets/logo.png" width="40" height="40" verticalAlignment="center" />
        <Label text="Super info o COVID-19" fontSize="24" verticalAlignment="center" />
      </StackLayout>
    </ActionBar>
    <StackLayout class="home-panel">

      <GeneralInfo />

      <SearchBar hint="Szukaj info..."
                 :text="searchPhrase" @textChange="onTextChanged"
                 @clear="onClear" @submit="onSubmit"
                 @loaded="onSearchBarLoaded"
      />

      <ListView for="item in listOfItems" @itemTap="onItemTap" >
        <v-template>
          <!-- Shows the list item label in the default color and style. -->
          <Label :text="item.text" />
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<script>
  import GeneralInfo from "./general-info/Panel.vue";

  export default {
    components: {
      GeneralInfo,
    },
    data () {
      return {
        searchPhrase: '',
        country: 'Polska',
        region: 'Mazowieckie',
        listOfItems: [
          {
            text: 'ŻYCIE SPOŁECZNE'
          },
          {
            text: 'OPIEKA I EDUKACJA'
          },
          {
            text: 'GRANICE I RUCH MIĘDZYNARODOWY'
          },
          {
            text: 'GOSPODARKA'
          },
          {
            text: 'SPORT I REKREACJA'
          },
        ],
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
      onItemTap () {
        // console.log('onItemTap');
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

  .general-info-panel {
    margin: 16;
  }

  .info-country-name {
    font-size: 16;
  }

  .info-region-name {
    font-size: 18;
  }

  .description-label {
    margin-bottom: 15;
  }
</style>
