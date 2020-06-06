<template>
  <div class="d-flex flex-column text-right mr-4">
    <div class="title">
      <span>{{ icon }} {{ value }}</span>
    </div>
    <div class="body-2 font-weight-bold" :class="colorClass">
      {{ changes }}
    </div>
  </div>
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
