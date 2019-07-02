<template>
  <a-select
    style="width: 250px"
    placeholder="Choose Country"
    @change="$emit('on-change', $event)"
  >
    <a-select-option
      v-for="option in options"
      :value="option.value"
      :key="option.value"
    >
      {{ option.label }}
    </a-select-option>
  </a-select>
</template>

<script>
  export default {
    name: 'BaseSearch',
    props: {
      options: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="scss">

</style>