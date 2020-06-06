<template>
<!--  <ActionBar>-->
<!--    <StackLayout orientation="horizontal">-->
<!--      <Image src="~/assets/logo.png" width="40" height="40" class="logo" />-->
<!--      <Label :text="titleText" class="title" />-->
<!--    </StackLayout>-->
<!--  </ActionBar>-->

  <v-app-bar
    app
    color="white"
  >
    <div class="d-flex align-center">
      <v-img
        class="shrink mr-2"
        contain
        src="../assets/logo.png"
        transition="scale-transition"
        width="40"
      />
    </div>

    <v-spacer></v-spacer>

    <v-toolbar-title>{{ titleText }}</v-toolbar-title>

    <v-spacer></v-spacer>

<!--    <v-btn-->
<!--      href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
<!--      target="_blank"-->
<!--      text-->
<!--    >-->
<!--      <span class="mr-2">Latest Release</span>-->
<!--      <v-icon>mdi-open-in-new</v-icon>-->
<!--    </v-btn>-->
  </v-app-bar>
</template>

<script>
  export default {
    props: ['title'],
    computed: {
      titleText () {
        if (this.title) {
          return this.title;
        }

        return 'Super info o COVID-19';
      }
    },
  }
</script>

<style scoped>

</style>
