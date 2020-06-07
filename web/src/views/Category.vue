<template>
  <v-expansion-panels
    flat
    focusable
    multiple
    :value="value"
  >
    <v-expansion-panel
      v-for="item in items"
      :key="item.id"
    >
      <v-expansion-panel-header>
        {{ itemTitle(item) }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="pt-5" v-html="itemContent(item)" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>


<script>
  import { getSectionsByCountryAndCategoryId } from '@/helpers';

  export default {
    name: 'Details',
    computed: {
      id () {
        return Number(this.$route.params.id);
      },
      category () {
        return this.$store.state.categories.find(c => c.id == this.id);
      },
      lang () {
        return this.$store.state.lang;
      },
      country () {
        return this.$store.state.country;
      },
      items () {
        return getSectionsByCountryAndCategoryId(this.$store.state, this.country, this.id);
      },
      title () {
        if (!this.category) {
          return '';
        }

        return this.category.name[this.lang];
      },
      value () {
        if (this.items && this.items.length > 1) {
          return [];
        } else {
          return [0];
        }
      }
    },
    created() {
      this.$store.commit('setToolbarTitle', this.title);
    },
    watch: {
      title () {
        this.$store.commit('setToolbarTitle', this.title);
      }
    },
    methods: {
      itemTitle (item) {
        if (!item) {
          return '';
        }

        return item.title[this.lang].replace(/<[^>]*>?/gm, '');
      },
      itemContent (item) {
        if (!item) {
          return '';
        }

        return item.content[this.lang];
      },
    }
  }
</script>