<template functional>
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
</template>

<style scoped lang="scss">
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
    $standardSize: 16px;
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

    &--component {
      bottom: calc(50% - #{$standardSize / 2});
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
