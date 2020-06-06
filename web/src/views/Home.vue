<template>
  <div class="home">
    <v-container>
      <Panel />

      <v-row no-gutters>
        <v-col>
          <v-text-field
            label="Szukaj info..."
            prepend-inner-icon="mdi-magnify"
            clearable
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <Grid />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Panel from "@/components/general-info/Panel.vue";
import Grid from "@/components/section-grid/Grid.vue";

export default {
  name: 'Home',
  components: {
    Panel,
    Grid,
  },
  created() {
    this.$store.commit('setToolbarTitle', 'COVID-19');
  }
}
</script>
