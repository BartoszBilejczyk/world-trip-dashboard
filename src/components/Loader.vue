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
        'loader--visible': props.loading,
        'loader--white': props.white,
        'loader--small': props.small,
        'loader--x-small': props.xsmall,
      }]"
      v-bind="$attrs"
      class="loader"
    >
      <div
        v-for="no in 5"
        :key="no"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  span {
    position: absolute;
    top: 30px;
  }

  .loader {
    display: none;
    @include center();
    width: 35px;
    height: 35px;

    &--visible {
      display: block;
    }

    &-wrapper,
    &-blur {
      position: relative;
      display: flex;
      height: inherit;
      flex: 1;
      width: inherit;
      max-height: 100%;
    }

    &-wrapper--visible {
      pointer-events: none;
    }

    &-blur--visible {
      filter: blur(2px);
    }

    &--small {
      width: 25px;
      height: 25px;
    }

    &--x-small {
      width: 15px;
      height: 15px;
    }
  }

  .loader div {
    width: 35px;
    height: 35px;
    border: 3px solid;
    border-color: $primary transparent transparent transparent;
  }

  .loader.loader--white div {
    border: 3px solid;
    border-color: $white transparent transparent transparent;
  }

  .loader.loader--small div {
    width: 25px;
    height: 25px;
    border-width: 2px;
  }

  .loader.loader--x-small div {
    width: 15px;
    height: 15px;
    border-width: 1px;
  }
</style>
