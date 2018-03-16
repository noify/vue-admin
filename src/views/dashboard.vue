<template>
  <div id="dashboard">
    欢迎进入{{adminTitle}}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapState({
      adminTitle: state => state.adminConfig.title,
    })
  },
}
</script>

<style lang="less">
</style>
