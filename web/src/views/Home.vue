<template>
  <div class="home">
    <v-container>
      <Panel />

      <v-row no-gutters>
        <v-col>
          <v-text-field
            :label="this.$t('search.label')"
            prepend-inner-icon="mdi-magnify"
            clearable
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-select
            :value="country"
            :items="items"
            :label="this.$t('country.label')"
            @change="setCountry"
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
  },
  computed: {
    country() {
      return this.$store.state.country;
    },
    items () {
      return [
        {
          value: 'PL',
          text: this.$t('country.PL'),
        },
        {
          value: 'CS',
          text: this.$t('country.CS'),
        },
      ];
    }
  },
  methods: {
    setCountry (value) {
      this.$store.commit('setCountry', value);
    }
  }
}
</script>
