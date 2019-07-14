<template>
  <Button
    :class="{
      'base__btn': true,
      'base__btn--on-light-bg': !onDarkBg,
      'base__btn--on-dark-bg': onDarkBg,
      'base__btn--dashed': dashed,
      'base__btn--filled': filled,
      'base__btn--empty': empty,
      'base__btn--warning': warning,
      'base__btn--circle': circle,
      'base__btn--full': full
    }"
    v-bind="$attrs"
    :disable-ripple="true"
    @click="$emit('click', $event)"
  >
    <template v-slot:dropdown>
      <slot name="dropdownContent"></slot>
    </template>
    <div
      v-if="loading"
      :class="{'base__btn-content--loading': loading}"
      class="base__btn-content"
      data-cypress="base__btn-content"
    >
      <LoaderButton
        :white="whiteLoader"
        :loading="loading"
        :component="true"
        :small="true"
      ></LoaderButton>
    </div>
    <div
      v-else
      class="base__btn-content"
      data-cypress="base__btn-content"
    >
      <AIcon
        v-if="icon && iconLeft"
        :type="icon"
        :class="iconStyles"
        class="icon--left"
      ></AIcon>
      <slot></slot>
      <AIcon
        v-if="icon && iconRight"
        :class="iconStyles"
        :type="icon"
        class="icon--right"
      ></AIcon>
    </div>
  </Button>
</template>

<script>
  import LoaderButton from '@/components/LoaderButton';

  export default {
    name: 'BaseButton',
    components: { LoaderButton },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      dashed: {
        type: Boolean,
        default: false
      },
      filled: {
        type: Boolean,
        default: false
      },
      full: {
        type: Boolean,
        default: false
      },
      empty: {
        type: Boolean,
        default: false
      },
      warning: {
        type: Boolean,
        default: false
      },
      circle: {
        type: Boolean,
        default: false
      },
      onDarkBg: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: ''
      },
      iconLeft: {
        type: Boolean,
        default: false
      },
      iconRight: {
        type: Boolean,
        default: false
      },
      iconOutlined: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      iconStyles() {
        return {'icon--outlined': this.iconOutlined}
      },
      whiteLoader() {
        return Boolean(
          (this.filled && !this.onDarkBg) ||
          (this.dashed && this.onDarkBg) ||
          (this.onDarkBg && !this.dashed && !this.filled)
        )
      }
    }
  }
</script>

<style lang="scss">
  .base__btn {
    .caret path {
      fill: $text;
    }
  }

  .base__btn:hover:not(.is-disabled) {
    .caret path {
      fill: $white;
    }
  }
</style>

<style scoped lang="scss">
  // These styles are required to override default gray background on hover in keen-ui

  .base__btn:hover:not(.is-disabled),
  .base__btn.has-dropdown-open,
  .base__btn.has-focus-ring:focus {
    background-color: $primary;
    border: 1px solid $primary;
    color: $white;
  }

  .base__btn--on-dark-bg:hover:not(.is-disabled),
  .base__btn--on-dark-bg.has-dropdown-open,
  .base__btn--on-dark-bg.has-focus-ring:focus {
    background-color: white;
    color: $primary;
    border: 1px solid $white;
  }

  // End of override

  .base__btn {
    position: relative;
    display: block;
    background-color: transparent;
    border: 1px solid $primary;
    color: $primary;
    padding-left: $ui-default-measure;
    padding-right: $ui-default-measure;
    padding-top: $ui-default-measure / 2;
    padding-bottom: $ui-default-measure / 2;
    @include font(14, 600);
    text-transform: none;
    transition: 0.1s ease;
    border-radius: $ui-default-measure2x;
    cursor: pointer;
    white-space: nowrap;
    height: 30px;


    &.ui-button--size-small {
      padding-left: 15px;
      padding-right: 15px;
    }

    &.ui-button--size-large {
      padding-left: 30px;
      padding-right: 30px;
    }

    &--on-dark-bg {
      color: $white;
      border: 1px solid $white;
    }

    &.is-disabled {
      cursor: not-allowed;
    }

    &-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:active,
    &:focus {
      outline: none;
    }

    &--full {
      width: 100%;
    }
  }

  // These styles are required to override default gray background on hover in keen-ui
  .base__btn.base__btn--dashed:hover:not(.is-disabled),
  .base__btn.base__btn--dashed.has-dropdown-open,
  .base__btn.base__btn--dashed.has-focus-ring:focus {
    border: 1px dashed $white;
    background-color: transparent;
    color: $white;
  }

  .base__btn.base__btn--on-light-bg.base__btn--dashed:hover:not(.is-disabled),
  .base__btn.base__btn--on-light-bg.base__btn--dashed.has-dropdown-open,
  .base__btn.base__btn--on-light-bg.base__btn--dashed.has-focus-ring:focus {
    background-color: transparent;
    border-color: $primary;
    color: $text;
  }

  // End of override

  .base__btn.base__btn--dashed {
    border: 1px dashed $primary;
  }

  .base__btn.base__btn--on-light-bg.base__btn--dashed {
    border-color: $primary;
  }

  // These styles are required to override default gray background on hover in keen-ui
  .base__btn.base__btn--filled:hover:not(.is-disabled),
  .base__btn.base__btn--filled.has-dropdown-open,
  .base__btn.base__btn--filled.has-focus-ring:focus {
    background-color: darken($primary, 3);
    border: 1px solid $primary;
    color: $white;
  }

  .base__btn.base__btn--on-dark-bg.base__btn--filled:hover:not(.is-disabled),
  .base__btn.base__btn--on-dark-bg.base__btn--filled.has-dropdown-open,
  .base__btn.base__btn--on-dark-bg.base__btn--filled.has-focus-ring:focus {
    background-color: $gray;
    border: 1px solid $gray;
    color: $primary;
  }

  // End of override

  .base__btn.base__btn--filled {
    background-color: $primary;
    border: 1px solid $primary;
    color: $white;
  }

  .base__btn.base__btn--filled .ui-button__dropdown-icon {
    color: $white !important;
  }

  .base__btn.base__btn--on-dark-bg.base__btn--filled {
    background-color: $white;
    border: 1px solid $white;
    color: $primary;
  }

  .base__btn.base__btn--filled .icon--outlined {
    background-color: $white;
    color: $primary;
  }

  // These styles are required to override default gray background on hover in keen-ui
  .base__btn.base__btn--empty:hover:not(.is-disabled),
  .base__btn.base__btn--empty.has-dropdown-open,
  .base__btn.base__btn--empty.has-focus-ring:focus {
    border: none;
    background-color: $primary;
    color: $white;
  }

  .base__btn.base__btn--on-light-bg.base__btn--empty:hover:not(.is-disabled),
  .base__btn.base__btn--on-light-bg.base__btn--empty.has-dropdown-open,
  .base__btn.base__btn--on-light-bg.base__btn--empty.has-focus-ring:focus {
    background-color: $gray;
    border: none;
    color: $text;
  }

  // End of override

  .base__btn.base__btn--empty {
    border: none;
  }
</style>
