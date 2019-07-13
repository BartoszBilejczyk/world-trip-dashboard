<template>
  <div class="notes">
    <div class="notes-header">
      <h1>Notes</h1>

      <div v-for="note in notes">
        {{ note.note }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notes',
    props: {
      notes: {
        type: Array,
        default: () => []
      }
    }
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
