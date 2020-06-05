<template>
  <StackLayout>
    <RadListView for="item in itemList"
                 layout="grid"
                 gridSpanCount="2"
                 @itemTap="onItemTap">
      <v-template>
        <SectionTile :label="item.text" />
      </v-template>
    </RadListView>
  </StackLayout>
</template>

<script>
  import SectionTile from "./SectionTile.vue";

  export default {
    components: {
      SectionTile,
    },
    data () {
      return {
        itemList: [
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
      onItemTap () {

      }
    }
  }
</script>

<style scoped>

</style>
