<template>
  <v-container>
    <v-row>
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
      items () {
        const PL = this.$store.state.PL;
        if (!PL) {
          return [];
        }

        const items = [];
        PL.forEach((item => {
          items.push(item);
        }));

        return items;
      },
    },
  }
</script>

<style scoped>

</style>
