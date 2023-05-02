<template>
<<<<<<< HEAD
  <div class="container">
    <!-- 标题 -->
    <div class="title">
      <h2 style="color:#67C23A">最简单的demo</h2>
    </div>
    <div class="queryInput" >
      <el-row>
        <div class="input-col">
          <span>检索日期范围</span>
          <!-- 第一个列 -->
          <el-col :span="10">
            <el-date-picker v-model="value2" type="daterange" unlink-panels range-separator="|" start-placeholder="开始日期"
              end-placeholder="结束日期" />
          </el-col>
        </div>
        <div class="input-col">
          <span>检索患者姓名</span>
          <!-- 第二个列 -->
          <el-col :span="10">
            <!-- keyup.enter回车键触发事件 -->
            <el-input  v-model="SearchVal" placeholder="按姓名查询" class="input-with-select" @input="inputSearch"
              @keyup.enter="enterSearch">
              <!-- <el-date-picker v-model="form.date" type="date" placeholder="请选择一个时间"  value-format="YYYY-MM-DD" ></el-date-picker> -->
              <!-- 内嵌添加一个搜索按钮 -->
              <!-- #append表示注释 -->
              <template #append>
                <el-button :icon="Search" @click="enterSearch"></el-button>
              </template>
            </el-input>
          </el-col>
        </div>
        <!-- 第三列 -->
        <div class="input-col">
              <el-col :span="10">
                <span style="font-size: 15px;">磁共振</span>
                <el-input v-model="SearchVal" placeholder="" class="input-with-select" @input="inputSearch"
                  @keyup.enter="enterSearch"></el-input>
              </el-col>
            </div>
        <!-- 第四列 -->
        <div class="input-col">
            <el-col :span="10">
              <span>描述</span>
              <el-input  v-model="SearchVal" placeholder="" class="input-with-dsc" @input="inputSearch"
                @keyup.enter="enterSearch" width="120"></el-input>
            </el-col>
          </div>
      </el-row>
    </div>
    
  </div>

  <div>
    <el-table :data="tableData" style="width: 100%" height="480px"
      :default-sort="{ prop: 'date,name', order: 'descending' }" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="120" />
      <el-table-column fixed prop="date" v-model="form.date" label="检查日期" width="150" sortable />
      <el-table-column prop="id" v-model="form.id" label="患者编号" width="120" />
      <el-table-column prop="name" v-model="form.name" label="患者姓名" width="120" sortable />
      <el-table-column prop="nmr" v-model="form.nmr" label="磁共振" width="120" />
      <el-table-column prop="description" v-model="form.description" label="描述" width="600" />
      <el-table-column prop="instances" v-model="form.instances" label="实例" width="100" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="large" style="color: #F56C6C;" @click.prevent="handleDelete(scope.row.id)">
            移除
          </el-button>
          <!-- scope为一个对象，其中target属性包含了一个对象的所有信息  -->
          <el-button link type="primary" size="large" @click.prevent="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
=======
  <p>
    问题及建议。
    1. 表格可以插入空内容。（检查输入是否为空，并提示）
    2. TypeScript 太麻烦，暂时不用。看看能不能，使用原生的js和vue3.0的语法。
    3. 还需要一个模态对话框来详细显示信息。（暂时可以是空的）
  </p>
<h1 class="title" >表格式图</h1>

<div class="search_bar">
  <el-input v-model="SearchVal" placeholder="按名称查询" class="input-with-select" @input="inputSearch" @keyup.enter="enterSearch">
    <template #append>
      <el-button :icon="Search" @click="enterSearch"></el-button>
    </template>
    </el-input>

    <el-button plain type="info" @click="openAdd">添加</el-button>
    <el-button plain type="danger" @click="handelDelList">删除多选</el-button>

</div>
  <div class="tableContainer">
    <el-table
      class="table"
      :data="tableData" 
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="120"  />
      <el-table-column fixed prop="date" v-model="form.date" label="Date" width="150" />
      <el-table-column prop="name" v-model="form.name" label="Name" width="120" />
      <el-table-column prop="address" v-model="form.address" label="Address" width="600" />
      <el-table-column prop="order"  v-model="form.order" label="Order" width="120" />
      <el-table-column prop="id"  v-model="form.id" label="Id" width="120" />
      <el-table-column fixed="right"  label="Operations" width="300">

        <template #default="scope">
          <el-button
            plain
            type="danger"
            @click.prevent="handleDelete(scope.row.id)"
          >
            移除
          </el-button>
          <!-- scope为一个对象，其中target属性包含了一个对象的所有信息  -->
          <el-button
              plain
              type="primary"
              @click.prevent="handleEdit(scope.$index,scope.row)"
            >
              编辑
            </el-button>

            <el-button
              plain
              type="info"
            >
              详情
            </el-button>
>>>>>>> 07a4cf89ddeaf889d4c595f124d590fdb714b152
        </template>

      </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加项目
    </el-button>

<<<<<<< HEAD
    <!-- 页码 -->
    <el-pagination background layout="prev, pager, next" :total="total" @current-page="currentChange" />

=======
    <!-- 页码
    <el-pagination background layout="prev, pager, next" :total="total" @current-page="currentChange"/> -->
    
>>>>>>> 07a4cf89ddeaf889d4c595f124d590fdb714b152
    <!-- <el-dialog> 
    </el-dialog> -->
  </div>

  <!-- 添加组件 -->
  <!-- closeAdd和success为子组件向父组件传递过来的的事件 -->
  <addDialog :is-show="isShow" :info="info" @close-add="closeAdd" @submit="handleSubmit"></addDialog>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ref, Ref } from 'vue';
// 导入add.vue组件
import addDialog from '../components/TableComs/addDialog.vue';
import dayjs from 'dayjs'
// 导入class库中的User类
import User from '../class/User';
import { da } from 'element-plus/es/locale';
const now = new Date()

const value2 = ref('')
/* 属性 */

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom2',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5072",
    device: "纳米",
    id: '1',
    instances:0
  },
  {
    date: '2016-05-02',
    name: 'Tom1',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5072",
    device: "纳米",
    id: '2',
    instances: 0
  },
  {
    date: '2016-05-03',
    name: 'Tom3',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5072",
    device: "纳米",
    id:'3',
    instances: 0

  },
])
var tableDataCopy = Object.assign(tableData.value);
// 初始化从子组件继承的prop属性
const isShow = ref(false);
const info = ref(<User>(new User));
const form: Ref<User> = ref<User>({
  id: "",
  date: "",
  name: "",
  description: "",
  nmr: "",
  device: "",
  instances : 0
})
// 声明一个接收表单修改和添加的信息接收数组
const tableForm = ref(<User>(new User));
const total = ref(100);
// 定义一个接收搜索框信息的定量
const SearchVal = ref("");
// 声明一个对话框类型
const dialogType = ref("add");

/* 方法 */

// 搜索
const enterSearch = () => {
  console.log(SearchVal);
  // `filter()` 方法返回的是一个新的数组，不会改变原数组
  if (SearchVal.value.length > 0) {
    tableData.value = tableData.value.filter(item => (item.name).toLowerCase().match(SearchVal.value.toLowerCase()));
  }
  else {
    tableData.value = tableDataCopy;
  }
}
const inputSearch = () => {
  tableData.value = tableDataCopy;
}

// 关闭表单
const closeAdd = () => {
  isShow.value = false;
  info.value = new User();
}

// 检测变化
const currentChange = (val: number) => {
  console.log(val);
}

// 获取子组件的form同步表单数据

// 获取子组件表单同步的信息
const handleSubmit = (data) => {
  // 若为添加操作
  if (dialogType.value === "add") {
    tableData.value.push({
      id:data.id,
      date: data.date,
      name: data.name,
      description: data.description,
      nmr: data.nmr,
      device: data.device,
      instances:data.instances
    })
  }
  else {
    // 若为编辑操作
    // 1.获取到当前的这条索引
    //  `item => item.id===tableForm.value.id`：这是一个箭头函数，表示对数组中的每个元素执行相同的操作。其中，
    // `item` 表示数组中的每个元素，`item.id` 表示该元素的 `id` 属性值，
    // `tableForm.value.id` 表示 `tableForm` 对象的 `id` 属性值。
    let index = tableData.value.findIndex(item => item.id === tableForm.value.id);
    console.log(index);
    // 2.编辑数据
    tableData.value[index] = data;
    // 3.清除用于存放编辑数据的数组
    // console.log("formData为：", data)
    tableForm.value = {
      id: "",
      date: "",
      name: "",
      description: "",
      nmr: "",
      device: "",
      instances: 0
    }
  }
  isShow.value = false;
}

// 添加对话框
const openAdd = () => {
  isShow.value = true;
  dialogType.value = "add";
}

// 编辑对话框
const handleEdit = (index: number, row: User) => {
  // console.log("scope.index为： ", index);
  // console.log("scope.row为： ", row);
  info.value = row;
  isShow.value = true;
  dialogType.value = "edit";
  tableForm.value = row;

}

// 移除
const handleDelete = (id) => {
  console.log(id);
  // 根据索引值删除对应的表单数据
  let index = tableData.value.findIndex(item => item.id === id);
  // 参数一表示索引值，参数二表示删除的个数
  tableData.value.splice(index, 1);
}

// const multipleSelection=new Set();
const multipleSelection = ref([]);
// 多选并获取选中的信息
const handleSelectionChange = (val) => {
  // console.log(val);
  // multipleSelection.value=val;
  // 获取选中的id值（或index）
  multipleSelection.value = [];
  for (let i = 0; i < val.length; i++) {
    multipleSelection.value.push(val[i].id);
  }
  console.log(multipleSelection.value);
}
// 选中多个进行删除
const handelDelList = () => {
  // for(let i=0;i<multipleSelection.length;i++){
  //   handleDelete(multipleSelection[i]);
  // }
  multipleSelection.value.forEach(function (id) {
    // console.log(id);
    handleDelete(id);
  })
  multipleSelection.value = [];
}

// 添加项目
const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: '2016-05-02',
    name: 'Tom2',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5072",
    device: "纳米",
    id: '2',
    instances:0
  })
}
</script>


<style scoped>
.title {
  /* background color  */
  background-color: #40a0ff26;
  /* text-align */
  text-align: center;
<<<<<<< HEAD
  border-radius: 10px;
  border-bottom: 1px solid #ccc;
  justify-content: center;
  margin-left: 25%;
  margin-bottom: 20px;
}

.el-input {
  width: 400px;
}

.queryInput > .el-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 900px; */
}
.queryInput > .el-row > .input-col{
  /* padding: 0 50px; */
  margin: 0 50px;
  box-sizing: border-box;
  /* width: 200px; */
  
}
.container {
  margin: 10px 0;
=======
  /* font-size */
  font-size: 30px;
}

.input-with-select{
  display: flex;
  justify-content: space-between;
  width: 30%;
}
>>>>>>> 07a4cf89ddeaf889d4c595f124d590fdb714b152


.tableContainer{
  height: 700px;
}

.table{
  width: 100%;
  height: 100%;
  /* center self */
}

.search_bar{
  display: flex;
  width: 100%;
}
.el-input {
  width: 150px;
  height: 30px;
}
.input-with-dsc{
width: 300px;
  height: 30px;
}
</style>