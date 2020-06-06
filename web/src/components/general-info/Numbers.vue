<template>
  <v-container class="text-right">
    <v-row no-gutters>
      <v-col class="body-1">
        <span>{{ icon }} {{ value }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="body-2 font-weight-bold" :class="colorClass">
        {{ changes }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: ['icon', 'value', 'changes'],
    data () {
      return {
      };
    },
    computed: {
      colorClass () {
        if (this.changes[0] === '-') {
          return 'text-green';
        } else if (this.changes[0] === '+') {
          return 'text-red';
        } else {
          return '';
        }
      }
    }
  }
</script>

<style scoped>
  .text-green {
    color: green;
  }

  .text-red {
    color: red;
  }
</style>
