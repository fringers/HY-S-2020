<template>
  <v-card
    class="card"
    @click="onItemTap"
    :color="color"
  >

    <v-card-text>
      <v-img
        :src="categoryIdToImg(item.id)"
        contain
        class="icon"
      />

      <div class="caption text-center  text-truncate">
        {{ text }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import store from "../../store";

  export default {
    props: ['item'],
    computed: {
      lang () {
        return this.$store.state.lang;
      },
      text () {
        return this.item.name[this.lang];
      },
      highlight () {
        return this.$store.state.categoryChangeHighlight[this.item.id];
      },
      color () {
        if (!this.highlight) {
          return '';
        }

        return 'warning lighten-3'
      }
    },
    methods: {
      onItemTap () {
        store.commit('clearCategoryChangeHighlight', this.item.id);
        this.$router.push({ name: 'category', params: { id: this.item.id } })
      },
      categoryIdToImg (id) {
        switch (id) {
          case 0:
            return '/imgs/OGOLNE.svg';
          case 1:
            return '/imgs/ZYCIE_SPOLECZNE.svg';
          case 2:
            return '/imgs/OPIEKA_I_EDUKACJA.svg';
          case 3:
            return '/imgs/RUCH_MIEDZYNARODOWY.svg';
          case 4:
            return '/imgs/GOSPODARKA.svg';
          case 5:
            return '/imgs/REKREACJA_I_KULTURA.svg';
        }

        return '';
      }
    }
  }
</script>

<style scoped>
  .card {
    border-radius: 16px !important;
  }

  .icon {
    height: 50px;
  }
</style>
