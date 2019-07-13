<template>
  <div class="admin">
    <router-link to="/admin/new">
      <BaseButton>
        Add new country
      </BaseButton>
    </router-link>
    <router-link to="/admin/edit">
      <BaseButton>
        Edit existing country
      </BaseButton>
    </router-link>
  </div>
</template>

<script>
  import BaseButton from '@/components/BaseButton'

  export default {
    name: 'admin',
    components: {
      BaseButton
    }
  }
</script>

<style scoped lang="scss">
  .admin {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      margin-right: $ui-default-measure;
    }
  }
</style>
