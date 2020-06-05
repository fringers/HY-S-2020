<template>
  <StackLayout orientation="vertical">
    <StackLayout orientation="horizontal">
      <Label :text="icon" class="icon" />
      <Label :text="value" />
    </StackLayout>
    <Label :text="changes" class="sub-text" :class="colorClass" />
  </StackLayout>
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
  .icon {
    padding-right: 4;
  }

  .sub-text {
    font-size: 18;
    horizontal-alignment: right;
    font-weight: bold;
  }

  .text-green {
    color: green;
  }

  .text-red {
    color: red;
  }
</style>
