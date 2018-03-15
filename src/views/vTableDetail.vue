<template>
  <div id="vTableDetail">
    <el-input v-model="input" placeholder="请输入点内容"></el-input>
  </div>
</template>

<script>
export default {
  name: 'vTableDetail',
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    go(index) {
      this.$router.push(`/vTableDetail/${index}`)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      input: ''
    }
  },
  beforeMount () {
    const _this = this
    _this.input = '表格详情' + _this.$route.params.id
  },
}
</script>

<style lang="less">
</style>
