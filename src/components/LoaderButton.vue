<template functional>
  <div
    :class="[{'loader-button--white': props.white}]"
    v-bind="$attrs"
    class="loader loader-button"
  >
    <div
      v-for="no in 5"
      :key="no"
    ></div>
  </div>
</template>

<style scoped lang="scss">
  .loader-button {
    @include center();
    width: 15px;
    height: 15px;
  }

  .loader-button div {
    width: 15px;
    height: 15px;
    border: 1px solid $primary;
    border-color: $primary transparent transparent transparent;
  }

  .loader-button.loader-button--white div {
    border: 1px solid $white;
    border-color: $white transparent transparent transparent;
  }
</style>
