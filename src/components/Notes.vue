<template>
  <div class="notes">
    <div class="notes-header">
      <h1>Notes</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notes'
  }
</script>

<style scoped lang="scss">
  .notes {
    &-header {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
