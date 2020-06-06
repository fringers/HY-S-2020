<template>
  <StackLayout>
    <RadListView for="item in titles"
                 layout="grid"
                 gridSpanCount="2"
                 @itemTap="onItemTap">
      <v-template>
        <SectionTile :label="item.title" />
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
        const titles = [];
        global.PL.value.forEach((item => {
          titles.push({
            id: item.id,
            title: item.title.pl,
          });
        }));

        return titles;
      },
    },
    methods: {
      onItemTap () {
        this.$navigateTo(this.sectionPage)
      }
    }
  }
</script>

<style scoped>

</style>
