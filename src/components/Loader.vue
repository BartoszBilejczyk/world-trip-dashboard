<template functional>
  <div
    :class="[{'loader-wrapper--visible': props.loading}, props.customClass]"
    class="loader-wrapper"
  >
    <div
      :class="{'loader-blur--visible': props.loading}"
      class="loader-blur"
    >
      <slot></slot>
    </div>
    <div
      :class="[{
        'loader-spinner--visible': props.loading,
        'loader-spinner--white': props.white,
        'loader-spinner--small': props.small,
        'loader-spinner--large': props.large,
        'loader-spinner--component': props.component,
      }]"
      v-bind="$attrs"
      class="loader-spinner"></div>
  </div>
</template>

<style scoped lang="scss">
  .loader {
    &--visible {
      display: block;
    }

    &-wrapper,
    &-blur {
      position: relative;
      display: flex;
      flex-direction: column;
      height: inherit;
      flex: 1;
      width: inherit;
      max-height: 100%;
    }

    &-blur > * {
      width: 100%;
    }

    &-wrapper--visible {
      pointer-events: none;
    }

    &-blur--visible {
      pointer-events: none;
      filter: blur(2px);
    }
  }
</style>
