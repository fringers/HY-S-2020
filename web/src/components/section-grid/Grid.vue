<template>
  <v-container>
    <v-row de>
      <v-col
        v-for="item in items"
        :key="item.id"
        cols="6"
      >
        <SectionTile :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import SectionTile from "./SectionTile.vue";

  export default {
    components: {
      SectionTile,
    },
    computed: {
      country () {
        return this.$store.state.country;
      },
      items () {
        const data = this.$store.state[this.country];
        if (!data) {
          return [];
        }

        const items = [];
        data.forEach((item => {
          items.push(item);
        }));

        return items;
      },
    },
  }
</script>

<style scoped>

</style>
