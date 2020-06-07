<template>
  <div class="home">

    <v-expand-transition>
      <v-carousel
        v-show="!searchMode"
        height="150"
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
      >
        <v-carousel-item>
          <Panel />
        </v-carousel-item>

        <v-carousel-item>
          <Graph />
        </v-carousel-item>
      </v-carousel>
    </v-expand-transition>

    <v-container class="py-1">
      <v-row no-gutters>
        <v-col>
          <v-text-field
            v-model="searchString"
            :label="this.$t('search.label')"
            prepend-inner-icon="mdi-magnify"
            clearable
            @input="onSearch"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-expand-transition>
      <SearchResult
        v-show="searchMode"
        :searchString="searchString"
      />
    </v-expand-transition>

    <v-expand-transition>
      <v-container class="py-0">
        <v-row
          v-show="!searchMode"
          no-gutters
        >
          <v-col>
            <v-select
              :value="country"
              :items="items"
              :label="this.$t('country.label')"
              @change="setCountry"
            />
          </v-col>
        </v-row>
        <v-row
          v-show="!searchMode"
          no-gutters
        >
          <v-col>
            <Grid />
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>
  </div>
</template>

<script>
import Panel from "@/components/general-info/Panel.vue";
import Graph from "@/components/general-info/Graph.vue";
import Grid from "@/components/categories-grid/Grid.vue";
import SearchResult from "@/components/SearchResult";

export default {
  name: 'Home',
  components: {
    Panel,
    Graph,
    Grid,
    SearchResult,
  },
  data () {
    return {
      searchString: '',
    };
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
        {
          value: 'SK',
          text: this.$t('country.SK'),
        },
        {
          value: 'HU',
          text: this.$t('country.HU'),
        },
      ];
    },
    searchMode() {
      return this.searchString && this.searchString.length > 0;
    }
  },
  methods: {
    setCountry (value) {
      this.$store.commit('setCountry', value);
    },
    onSearch () {
      console.log(this.searchString);
    }
  }
}
</script>
