<template>
  <v-app-bar
    app
    color="white"
  >
    <div class="d-flex align-center">
      <router-link :to="{ name: 'home' }">
        <v-img
          class="shrink mr-2"
          contain
          src="/imgs/logo.png"
          transition="scale-transition"
          width="40"
        />
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <v-toolbar-title>{{ titleText }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on }">
        <v-img
          :src="langIconUrl(lang)"
          width="20"
          max-height="30"
          max-width="30"
          contain
          class="flag"
          v-on="on"
        />
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in langs"
          :key="i"
          @click="setLang(item)"
        >
          <v-list-item-icon>
            <v-img
              :src="langIconUrl(item.short)"
              max-height="30"
              max-width="30"
              class="flag"
            />
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.short }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  export default {
    props: ['title'],
    data () {
      return {
        langs: [
          {
            short: 'EN',
          },
          {
            short: 'PL',
          },
          {
            short: 'CS',
          },
          {
            short: 'HU',
          },
          {
            short: 'SK',
          },
        ],
      };
    },
    computed: {
      titleText () {
        return this.$store.state.toolbarTitle;
      },
      lang () {
        return this.$store.state.lang;
      },
    },
    methods: {
      langIconUrl(lang) {
        switch (lang) {
          case 'PL':
            return '/imgs/pl.png';
          case 'EN':
            return  '/imgs/en.svg';
          case 'CS':
            return  '/imgs/cs.svg';
          case 'HU':
            return  '/imgs/hu.jpg';
          case 'SK':
            return  '/imgs/sk.png';
        }

        return '';
      },
      setLang(lang) {
        this.$store.commit('setLang', lang.short);
      }
    }
  }
</script>

<style scoped>
  .flag {
    border-style: solid;
    border-color: black !important;
    border-width: 1px !important;
  }
</style>
