<template>
  <Page>
    <ActionBar title="Super info o COVID-19"/>
    <StackLayout class="home-panel">
      <SearchBar hint="Szukaj info ..."
                 :text="searchPhrase" @textChange="onTextChanged($event)"
                 @clear="onClear($event)" @submit="onSubmit($event)">
      </SearchBar>

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
  export default {
    data () {
      return {
        searchPhrase: '',
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
      onTextChanged ($event) {
        // console.log('onTextChanged', $event);
      },
      onClear ($event) {
        // console.log($event);
      },
      onSubmit ($event) {
        // console.log($event);
      },
      onItemTap () {

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

  .description-label {
    margin-bottom: 15;
  }
</style>
