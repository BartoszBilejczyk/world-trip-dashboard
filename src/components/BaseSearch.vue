<template>
  <ASelect
    style="width: 250px"
    placeholder="Choose Country"
    @change="$emit('on-change', $event)"
  >
    <ASelectOption
      v-for="option in options"
      :value="option.value"
      :key="option.value"
    >
      {{ option.label }}
    </ASelectOption>
  </ASelect>
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
