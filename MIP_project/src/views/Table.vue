<template>
  <div class="container">
    <!-- 标题 -->
    <div class="title">
      <h2 style="color:#67C23A">最简单的demo</h2>
    </div>
    <div class="queryInput"></div>
    <el-row>
      <!-- 第一个列 -->
      <el-col :span="12">
        <!-- keyup.enter回车键触发事件 -->
        
          <el-input v-model="SearchVal" placeholder="按名称查询" class="input-with-select" @input="inputSearch" @keyup.enter="enterSearch">
            <!-- 内嵌添加一个搜索按钮 -->
            <!-- #append表示注释 -->
            <template #append>
              <el-button :icon="Search" @click="enterSearch"></el-button>
            </template>
          </el-input>
      </el-col>
      <!-- 第二列 -->
      <el-col :span="30"  >
        <el-button type="primary" @click="openAdd">添加</el-button>
        <el-button type="danger" @click="handelDelList">删除多选</el-button>
      </el-col>
    </el-row>
    </div>

    <div>
    <el-table 
    :data="tableData" 
    style="width: 100%"
    border height="300px"
    @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="120"  />
      <el-table-column fixed prop="date" v-model="form.date" label="Date" width="150" />
      <el-table-column prop="name" v-model="form.name" label="Name" width="120" />
      <el-table-column prop="address" v-model="form.address" label="Address" width="600" />
      <el-table-column prop="order"  v-model="form.order" label="Order" width="120" />
      <el-table-column prop="id"  v-model="form.id" label="Id" width="120" />
      <el-table-column fixed="right"  label="Operations" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="large"
            style="color: #F56C6C;"
            @click.prevent="handleDelete(scope.row.id)"
          >
            移除
          </el-button>
          <!-- scope为一个对象，其中target属性包含了一个对象的所有信息  -->
          <el-button
              link
              type="primary"
              size="large"
              @click.prevent="handleEdit(scope.$index,scope.row)"
            >
              编辑
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem"
      >添加项目
    </el-button>

    <!-- 页码 -->
    <el-pagination background layout="prev, pager, next" :total="total" @current-page="currentChange"/>
    
    <!-- <el-dialog> 
    </el-dialog> -->
  </div>

  <!-- 添加组件 -->
  <!-- closeAdd和success为子组件向父组件传递过来的的事件 -->
  <addDialog :is-show="isShow" :info="info"  @close-add="closeAdd"   @submit="handleSubmit" ></addDialog>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ref,Ref} from 'vue';
// 导入add.vue组件
import addDialog from '../components/TableComs/addDialog.vue';
import dayjs from 'dayjs'
// 导入class库中的User类
import User from '../class/User';
import { da } from 'element-plus/es/locale';
const now = new Date()

/* 属性 */

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom1',
    address: 'No. 189, Grove St, Los Angeles',
    order: 0,
    id: "1"
  },
  {
    date: '2016-05-02',
    name: 'Tom2',
    address: 'No. 189, Grove St, Los Angeles',
    order: 0,
    id: "2"
  },
  {
    date: '2016-05-03',
    name: 'Tom3',
    address: 'No. 189, Grove St, Los Angeles',
    order: 0,
    id: "3"
  },
])
var tableDataCopy=Object.assign(tableData.value);
// 初始化从子组件继承的prop属性
const isShow=ref(false);
const info = ref(<User>(new User));
const form: Ref<User> = ref<User>({
  id: "",
  date: "",
  name: "",
  address: "",
  order: 0
})
// 声明一个接收表单修改和添加的信息接收数组
const tableForm= ref(<User>(new User));
const total=ref(100);
// 定义一个接收搜索框信息的定量
const SearchVal=ref("");
// 声明一个对话框类型
const dialogType=ref("add");

/* 方法 */

// 搜索
const enterSearch=()=>{
  console.log(SearchVal);
  // `filter()` 方法返回的是一个新的数组，不会改变原数组
  if(SearchVal.value.length>0){
    tableData.value = tableData.value.filter(item => item.name.match(SearchVal.value));
  }
  else{
    tableData.value= tableDataCopy;
  }
}
const inputSearch=()=>{
  tableData.value = tableDataCopy;
}

// 关闭表单
const closeAdd=()=>{
  isShow.value=false;
  info.value=new User();
}

// 检测变化
const currentChange=(val:number)=>{
  console.log(val);
}

// 获取子组件的form同步表单数据

// 获取子组件表单同步的信息
const handleSubmit = (data) => {
  // 若为添加操作
  if (dialogType.value === "add") {
    tableData.value.push({
      date: data.date,
      name: data.name,
      address: data.address,
      order: data.order,
      id: data.id
    })
  }
  else {
    // 若为编辑操作
    // 1.获取到当前的这条索引
    //  `item => item.id===tableForm.value.id`：这是一个箭头函数，表示对数组中的每个元素执行相同的操作。其中，
    // `item` 表示数组中的每个元素，`item.id` 表示该元素的 `id` 属性值，
    // `tableForm.value.id` 表示 `tableForm` 对象的 `id` 属性值。
    let index=tableData.value.findIndex(item=>item.id===tableForm.value.id);
    console.log(index);
    // 2.编辑数据
    tableData.value[index]=data;
    // 3.清除用于存放编辑数据的数组
     // console.log("formData为：", data)
    tableForm.value = {
      id: "",
      date: "",
      name: "",
      address: "",
      order: 0
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
const handleEdit=(index:number,row:User)=>{
  // console.log("scope.index为： ", index);
  // console.log("scope.row为： ", row);
  info.value=row;
  isShow.value=true;
  dialogType.value="edit";
  tableForm.value=row;
  
}

// 移除
const handleDelete = (id) => {
  console.log(id);
  // 根据索引值删除对应的表单数据
  let index=tableData.value.findIndex(item=>item.id===id);
  // 参数一表示索引值，参数二表示删除的个数
  tableData.value.splice(index, 1);
}

// const multipleSelection=new Set();
const  multipleSelection=ref([]);
// 多选并获取选中的信息
const handleSelectionChange = (val) => {
  // console.log(val);
  // multipleSelection.value=val;
  // 获取选中的id值（或index）
  multipleSelection.value=[];
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
  multipleSelection.value.forEach(function(id){
    // console.log(id);
    handleDelete(id);
  }) 
  multipleSelection.value=[];
}

// 添加项目
const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    order:0,
    id: "0"
  })
}
</script>


<style scoped>
.title {
  height: 50%;
  width: 50%;
  text-align: center;
  border-radius: 10px;
  border-style: solid;
  justify-content: center;
  margin-left: 25%;
}
.el-input{
  width: 400px;
}
.queryInput{
  display: flex;
  justify-content: space-between;
  margin-bottom:40px ;
}
.input-with-select{
  display: flex;
}
.container{
  margin: 10px 0;

}
</style>