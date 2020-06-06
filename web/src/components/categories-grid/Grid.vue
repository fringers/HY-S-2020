<template>
  <v-container>
    <v-row de>
      <v-col
        v-for="item in items"
        :key="item.id"
        cols="6"
      >
        <CategoryTile :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CategoryTile from "./CategoryTile.vue";

  export default {
    components: {
      CategoryTile,
    },
    computed: {
      country () {
        return this.$store.state.country;
      },
      items () {
        return this.$store.state.categories;
      },
    },
  }
</script>

<style scoped>

</style>
