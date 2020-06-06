<template>
  <v-card
    class="card"
    outlined
    @click="onItemTap"
  >

    <v-card-text>
      <v-img
        src="@/assets/logo.png"
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
  export default {
    props: ['item'],
    computed: {
      text () {
        return this.item.title.PL.replace(/<[^>]*>?/gm, '');
      }
    },
    methods: {
      onItemTap () {
        console.log('asdasds')
        this.$router.push({ name: 'details', params: { index: this.item.id } })
      }
    }
  }
</script>

<style scoped>
  .card {
    border-color: #34C1AD !important;
    border-width: 1px !important;
    border-radius: 20px !important;
  }

  .icon {
    height: 40px;
  }
</style>
