<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { tableV2CellProps } from "element-plus/es/components/table-v2/src/cell";


defineProps<{ msg: string }>();

const count = ref(0);
const input = ref("element-plus");

const curDate = ref("");

const toast = () => {
  ElMessage.success("Hello");
};

let tableData  = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]

let data = [
  {
    label: '一级 1',
    children: [{
      label: '二级 1-1',
      children: [{
        label: '三级 1-1-1'
      }]
    }]
  },
  {
    label: '一级 2',
    children: [{
      label: '二级 2-1',
      children: [{
        label: '三级 2-1-1'
      }]
    }, {
      label: '二级 2-2',
      children: [{
        label: '三级 2-2-1'
      }]
    }]
  },
  {
    label: '一级 3',
    children: [{
      label: '二级 3-1',
      children: [{
        label: '三级 3-1-1'
      }]
    }, {
      label: '二级 3-2',
      children: [{
        label: '三级 3-2-1'
      }]
    }]
  }
]

let defaultProps = {
  children: 'children',
  label: 'label'
}



</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>Element plus 组件测试页面</h2>

  <!-- 各种按钮 -->
  <el-button type="primary" @click="toast">Toast</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
  <el-button type="info">Info</el-button>

  <!-- 各种输入框 -->
  <el-input v-model="input" placeholder="请输入内容"></el-input>
  <!-- 日期 -->
  <el-date-picker
    v-model="curDate"
    type="date"
    placeholder="选择日期"
    value-format="yyyy-MM-dd"
  ></el-date-picker>
  <!-- 下拉框 -->
  <el-select v-model="input" placeholder="请选择">
    <el-option label="餐饮" value="1"></el-option>
    <el-option label="服饰" value="2"></el-option>
    <el-option label="箱包" value="3"></el-option>
    <el-option label="化妆品" value="4"></el-option>
    <el-option label="数码" value="5"></el-option>
  </el-select>

  <!-- 表格 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>

  <!-- 树形控件 -->
  <el-tree :data="data" :props="defaultProps"></el-tree>



</template>
