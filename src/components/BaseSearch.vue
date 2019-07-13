<template>
  <div class="base-search__select">
    <ASelect
      :value="value"
      placeholder="Change Country"
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
  </div>
</template>

<script>
  export default {
    name: 'BaseSearch',
    props: {
      value: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="scss">
  .base-search__select {
    width: 250px;
  }
</style>
