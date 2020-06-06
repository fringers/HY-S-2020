<template>
  <StackLayout>
    <RadListView for="item in titles"
                 layout="grid"
                 gridSpanCount="2"
                 @itemTap="onItemTap($event)">
      <v-template>
        <SectionTile :label="item" />
      </v-template>
    </RadListView>
  </StackLayout>
</template>

<script>
  import SectionTile from "./SectionTile.vue";
  import SectionPage from "../SectionPage.vue";

  export default {
    components: {
      SectionTile,
    },
    data () {
      return {
        sectionPage: SectionPage,
      };
    },
    computed: {
      titles () {
        const PL = this.$store.state.PL;
        if (!PL) {
          return [];
        }

        const titles = [];
        PL.value.forEach((item => {
          titles.push(item.title.pl);
        }));

        return titles;
      },
    },
    methods: {
      onItemTap ($event) {
        this.$navigateTo(this.sectionPage, {
          props: {
            id: $event.index,
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
