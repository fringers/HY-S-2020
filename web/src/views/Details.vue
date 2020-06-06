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

        return this.item.title.PL;
      },
      content () {
        if (!this.item) {
          return '';
        }

        return this.item.content.PL;
      },
    }
  }
</script>