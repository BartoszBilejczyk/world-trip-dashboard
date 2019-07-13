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

  @mixin setSize($value) {
    width: $value;
    height: $value;
    left: calc(50% - #{$value / 2});
    bottom: calc(50vh - #{$value / 2});
  }

  .loader-spinner,
  .loader-spinner:after {
    border-radius: 50%;
    width: $ui-default-measure3x;
    height: $ui-default-measure3x;
  }
  .loader-spinner {
    $standardSize: 12px;
    $largeSize: 36px;

    position: absolute;
    left: calc(50% - #{$standardSize});
    bottom: calc(50vh - #{$standardSize});
    border: 1px solid;
    border-color: $primary $primary $primary transparent;
    animation: loaderAnimation 1.1s infinite linear;
    display: none;
    
    &--visible {
      display: block;
    }

    &--component {
      bottom: calc(50% - #{$standardSize});
    }

    &--white {
      border-color: transparent $white $white $white;
    }

    &--small {
      @include setSize($standardSize);
    }

    &--large {
      @include setSize($largeSize);
      border-width: 2px;
    }
  }

  @keyframes loaderAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
