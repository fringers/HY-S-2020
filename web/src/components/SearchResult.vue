<template>
  <div>
    <v-expansion-panels
      flat
      focusable
      multiple
      :value="[0]"
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
  </div>
</template>

<script>
  import { getSectionsByCountryAndString } from '@/helpers';

  export default {
    props: ['searchString'],
    computed: {
      lang () {
        return this.$store.state.lang;
      },
      country () {
        return this.$store.state.country;
      },
      items () {
        return getSectionsByCountryAndString(this.$store.state, this.lang, this.country, this.searchString);
      },
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

        const html = item.content[this.lang];

        var reg  = new RegExp(this.searchString, "i");
        return html.replace(reg, (match) => '<mark>' + match + '</mark>')
      },
    }
  }
</script>

<style scoped>

</style>
