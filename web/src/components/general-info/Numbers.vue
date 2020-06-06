<template>
  <div class="d-flex flex-column text-right mr-4">
    <div class="title ">
      {{ icon }}  <span :class="colorClass">{{ changes }}</span>
    </div>
    <div class="body-1 total-info font-weight-medium" >
      {{ value }}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['icon', 'value', 'changes', 'inverted-color'],
    data () {
      return {
      };
    },
    computed: {
      positiveSign() {
        return this.invertedColor ? '+' : '-';
      },
      negativeSign() {
        return this.invertedColor ? '-' : '+';
      },
      colorClass () {
        if (this.changes[0] === this.positiveSign) {
          return 'text-green';
        } else if (this.changes[0] === this.negativeSign) {
          return 'text-red';
        } else {
          return '';
        }
      }
    }
  }
</script>

<style scoped>
  .total-info {
    margin-top: -6px;
  }

  .text-green {
    color: green;
  }

  .text-red {
    color: red;
  }
</style>
