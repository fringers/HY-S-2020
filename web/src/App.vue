<template>
  <v-app>
    <Header />

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-snackbar
      v-model="showNotification"
      vertical
    >
      <div v-if="notification">
        <div>{{ notification.title }}</div>
        <div>{{ notification.body }}</div>
      </div>

      <v-btn
        text
        @click="showNotification = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: 'App',
  components: {
    Header,
  },
  data: () => ({
    showNotification: false,
  }),
  computed: {
    notification () {
      return this.$store.state.notification;
    }
  },
  watch: {
    notification () {
      if (!this.notification) {
        return;
      }

      this.showNotification = true;
    },
    showNotification () {
      if (!this.showNotification) {
        this.$store.commit('clearNotifications');
      }
    }
  }
};
</script>
