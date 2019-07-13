<template>
  <div class="base-search__select">
    <label>{{ label }}</label>
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
      },
      label: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss">
  .base-search__select {
    display: flex;
    flex-direction: column;

    label {
      @include font(13, 500);
    }

    .ant-select {
      width: 250px;

      &-selection {
        background-color: transparent;

        &-selected-value {
          @include font(16, 600);
        }
      }
    }
  }
</style>
