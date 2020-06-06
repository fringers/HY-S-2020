<template>
  <v-container>
    <v-row>
      <v-col>
        <div v-html="content" />
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  export default {
    name: 'Details',
    computed: {
      index () {
        return this.$route.params.index;
      },
      lang () {
        return this.$store.state.lang;
      },
      item () {
        const PL = this.$store.state.PL;
        if (!PL) {
          return null;
        }

        return PL[this.index];
      },
      title () {
        if (!this.item) {
          return '';
        }

        return this.item.title[this.lang].replace(/<[^>]*>?/gm, '');
      },
      content () {
        if (!this.item) {
          return '';
        }

        return this.item.content[this.lang];
      },
    },
    created() {
      this.$store.commit('setToolbarTitle', this.title);
    },
    watch: {
      title () {
        this.$store.commit('setToolbarTitle', this.title);
      }
    }
  }
</script>