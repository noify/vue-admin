<template>
  <div id="vTable">
    <el-table
      :data="tableData4"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        fixed
        prop="date"
        label="日期"
        sortable>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable>
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        sortable>
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        sortable>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        sortable>
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        sortable>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="go(scope.$index, tableData4)"
            type="text"
            size="small">
            详情
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'vForm',
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
      tableData4: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      currentPage4: 4
    }
  }
}
</script>

<style lang="less">
#vTable{
  .el-pagination{
    margin-top: 20px;
  }
}
</style>
