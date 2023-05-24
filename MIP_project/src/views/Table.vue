<template>
    <el-container class="layout-container-header">
      <el-header style="text-align: right; font-size: 17px" class="container-header">
        <p>
          <el-icon :size="30">
        <ChromeFilled   style="width: 1em; height: 1em; " size="large" />
      </el-icon>
          Open Health Imaging Foundation
        </p>
        <el-button type="danger" v-model="filterVisable" v-if="filterVisable" size="large" round @click="close_Fliter"  :icon="CircleCloseFilled" >Clear Filters</el-button>
          <div class="toolbar">
            <el-dropdown>
              <el-icon  :size="30" style="margin-right: 8px; margin-top: 1px" 
                ><setting
              /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>关于</el-dropdown-item>
                  <el-dropdown-item>偏好</el-dropdown-item>
                  <!-- <el-dropdown-item>Delete</el-dropdown-item> -->
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>研究用途</span>
          </div>
        </el-header>
        <el-container class="layout-container-main">
          <el-header class="main-header">
            <div class="main-header-header">
              <span class="span1">StudyList</span>
              <span class="span2">{{ tableData.length.toString()}}</span>
            </div>
            <div class="queryInput" >
                      <el-row>
                        <div class="input-col">
                          <span style="font-size: 15px; color:white">检索日期</span>
                          <!-- 第一个列 -->
                          <el-col :span="10">
                            <el-date-picker v-model="SearchDate_val" type="daterange" unlink-panels range-separator="|" start-placeholder="开始日期"
                              end-placeholder="结束日期"  @change="enterSearch_Date" />
                            </el-col>
                        </div>
                        <div class="input-col">
                          <span style="font-size: 15px; color:white">检索患者</span>
                          <!-- 第二个列 -->
                          <el-col :span="10">
                            <!-- keyup.enter回车键触发事件 -->
                            <el-input  v-model="SearchNameVal" placeholder="按姓名查询" class="input-with-Name" :inputType="'inputName'" @input="inputSearch"
                              @keyup.enter="enterSearch_Name">
                              <!-- <el-date-picker v-model="form.date" type="date" placeholder="请选择一个时间"  value-format="YYYY-MM-DD" ></el-date-picker> -->
                              <!-- 内嵌添加一个搜索按钮 -->
                              <!-- #append表示注释 -->
                              <template #append>
                                <el-button :icon="Search" type="primary" @click="enterSearch_Date"></el-button>
                              </template>
                            </el-input>
                          </el-col>
                        </div>
                        <!-- 第三列 -->
                        <div class="input-col">
                              <el-col :span="10">
                                <span style="font-size: 15px; color:white">磁共振</span>
                                <el-input v-model="SearchNmrhVal" placeholder="" class="input-with-Nmr" @input="inputSearch"
                                  @keyup.enter="enterSearch_Nmr"></el-input>
                              </el-col>
                            </div>
                        <!-- 第四列 -->
                        <div class="input-col">
                              <el-col :span="10">
                                <span style="font-size: 15px; color:white;;" >成像设备</span>
                                <!-- <el-input  v-model="SearchDesVal" placeholder="" class="input-with-device" @input="inputSearch"
                              @keyup.enter="enterSearch_dsc" width="120"></el-input> -->
                                  <el-dropdown class="table-dropdown"  @command="handleCommand">
                                    <el-input style="width: 130px;" v-model="SearchDeviceVal"  >
                                      <!-- <el-icon  :size="30" style="margin-right: 8px; margin-top: 1px" ><setting/></el-icon> -->
                                    </el-input>
            <!-- <el-button style="width: 130px;">
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button> -->
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="Action 1">Action 1</el-dropdown-item>
                <el-dropdown-item command="Action 2">Action 2</el-dropdown-item>
                <el-dropdown-item command="Action 3">Action 3</el-dropdown-item>
                <el-dropdown-item command="Action 4">Action 4</el-dropdown-item>
                <!-- <el-dropdown-item>Action 5</el-dropdown-item> -->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
                              
                              </el-col>
                            </div>
                          <!-- 第五列 -->
                          <div class="input-col">
                              <el-col :span="10">
                                <span style="font-size: 15px; color:white">描述</span>
                                <el-input  v-model="SearchDesVal" placeholder="" class="input-with-dsc" @input="inputSearch"
                                  @keyup.enter="enterSearch_dsc" width="120"></el-input>
                              </el-col>
                            </div>
                      </el-row>
                    </div>
          </el-header>
          <el-main class="main-main">
           <div class="table">
                  <el-table class="table" :data="currentTableData" style="width: 100%" height="480px" stripe :row-key="row => row.id"
                    :default-sort="{ prop: 'date,name', order: 'descending' }"     
                      @selection-change="handleSelectionChange" @row-click="openDetails"  >
                    <el-table-column type="selection" width="120" />
                    <el-table-column fixed prop="date" v-model="form.date" label="检查日期" width="150" sortable />
                    <el-table-column prop="id" v-model="form.id" label="患者编号" width="120" sortable />
                    <el-table-column prop="name" v-model="form.name" label="患者姓名" width="120" sortable />
                    <el-table-column prop="nmr" v-model="form.nmr" label="磁共振" width="120"  sortable/>
                    <el-table-column prop="description" v-model="form.description" label="描述" width="600" />
                    <el-table-column prop="instances" v-model="form.instances" label="实例" width="100"  />
                    <el-table-column fixed="right" label="Operations" width="120">
                      <template #default="scope">
                        <!-- <el-button link type="primary" size="large" style="color: #F56C6C;" @click.prevent="handleDelete(scope.row.id)">
            移除
          </el-button> -->
                        <!-- scope为一个对象，其中target属性包含了一个对象的所有信息  -->
                        <el-button link type="primary" size="large" @click.prevent="handleEdit(scope.$index, scope.row)">
                          编辑
                        </el-button>
                      </template>

                    </el-table-column>
                  </el-table>
                </div>
            
                <el-button class="mt-4" style="width: 100%; background: rgb(9,12,41); color: white;" @click="onAddItem">添加项目
                </el-button>

                <!-- 页码 -->
                <!-- current-change事件在页码发生变化时，触发该事件时，先自动把：current-page绑定的页码数据作为参数 -->
                <el-pagination  :current-page="currentPage" :page-size="pageSize" :total="tableData.length"  
                layout="prev, pager, next"
                @current-change="handleCurrentChange"/>
                <!-- <el-dialog> 
    </el-dialog> -->
          

              <!-- 添加组件 -->
              <!-- closeAdd和success为子组件向父组件传递过来的的事件 -->
              <!-- <addDialog :is-show="isShow" :info="info" @close-add="closeAdd" @submit="handleSubmit"></addDialog> -->
              <detailDialog :is-show="isShow" :table-details="tableDetails" @close-details="closeDetails" ></detailDialog>
          </el-main>
        </el-container>
      </el-container>

</template>

<script lang="ts" setup>
import { DocumentCopy, Search, ChromeFilled, Memo, CircleCloseFilled, ArrowDownBold} from '@element-plus/icons-vue';
import { ref, Ref,onMounted } from 'vue';
// 引用moment库
import moment from 'moment';

// 导入add.vue组件
import addDialog from '../components/TableComs/addDialog.vue';
import detailDialog from '../components/TableComs/detailDialog.vue';


import dayjs from 'dayjs'
// 导入class库中的User类
import User from '../class/User';
import Detail from '../class/Detail'
// import { da, ta } from 'element-plus/es/locale';
const now = new Date()

const SearchDate_val = ref('')
/* 属性 */

const tableData = ref([
  {
    date: '2023-05-10',
    name: 'Tom2',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5073",
    device: "纳米",
    id: '1',
    instances:0
  },
  {
    date: '2023-05-01',
    name: 'Tom1',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5074",
    device: "纳米",
    id: '2',
    instances: 0,
  },
  {
    date: '2023-05-30',
    name: 'Tom3',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5075",
    device: "纳米",
    id:'3',
    instances: 0

  },
  {
    date: '2023-05-05',
    name: 'Army',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5073",
    device: "纳米",
    id: '1',
    instances: 0
  },
  {
    date: '2023-05-19',
    name: 'Army',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5073",
    device: "纳米",
    id: '1',
    instances: 0
  },
  {
    date: '2023-05-13',
    name: 'Army',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5073",
    device: "纳米",
    id: '1',
    instances: 0
  },
  {
    date: '2023-05-14',
    name: 'Army',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5073",
    device: "纳米",
    id: '1',
    instances: 0
  },
  {
    date: '2023-05-18',
    name: 'Army',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5073",
    device: "纳米",
    id: '1',
    instances: 0
  },
  {
    date: '2023-05-06',
    name: 'Army',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5073",
    device: "纳米",
    id: '1',
    instances: 0
  },
  {
    date: '2023-05-08',
    name: 'Army',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5073",
    device: "纳米",
    id: '1',
    instances: 0
  },
])

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
  instances: 0
})
// const inputName=ref("");
// 细节信息
const tableDetails = ref([
  {
    description: "Body 3.0 CE",
    series: "1",
    device: "CT",
    instances: 0
  }, {
    description: "Body 3.0 CE",
    series: "1",
    device: "CT",
    instances: 0
  }
])

// 声明一个接收表单修改和添加的信息接收数组
const tableForm = ref(<User>(new User));
// const total = ref(100);
// const page_sizes = ref(10);
// const pagination=ref({
//   currentPage: 1,
//   pageSize: 10,
// })
const currentPage=ref(1);
const pageSize=ref(10);
// 记录当前页面的数据
const currentTableData=ref([]);
// 定义一个接收搜索框信息的定量
const SearchNameVal = ref("");
const SearchNmrhVal = ref("");
const SearchDesVal = ref("");
const SearchDeviceVal=ref("");
// 声明一个对话框类型
const dialogType = ref("add");
// 拷贝表格信息，用于空信息输入框查询后回溯之前表格信息
var tableDataCopy = Object.assign(tableData.value);
// const inputType=ref("name");
const filterVisable =ref(false);

/* 方法 */

// 实现detailDialog组件的emit方法
onMounted(()=>{
  filterVisable.value=false;
})
const openDetails=()=>{
  isShow.value = true;
}

// 是否关闭检索
const close_Fliter=()=>{
  filterVisable.value=false;
  currentTableData.value = tableDataCopy;
}

// 成像设备下拉菜单
const handleCommand = (command: string ) => {
  SearchDeviceVal.value=command;
}
/*-----------------分页与表格联系------------------- */
// 表格与分页建立联系(没问题)
const handleCurrentChange=(newPage)=>{
  currentPage.value=newPage;
  // getTableData(currentPage.value);
  getTableData();
}
const getTableData =()=> {
  // 根据新的页码计算出 Table 的起始索引和结束索引
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  // 获取对应的 Table 数据
  // 在 `handleCurrentChange` 方法中，根据新的页码计算出 Table 的起始索引和结束索引，
  // 然后使用 `Array.prototype.slice()` 方法获取对应的 Table 数据，并将其赋值给组件中的 `currentTableData` 数据。
  // 即截取 根据页码大小获取到的 table中的索引范围
  currentTableData.value = tableData.value.slice(startIndex, endIndex);
  console.log(currentTableData)
}
// 初始化第一页的表格数据
getTableData();

/*------------------------搜索--------------------------- */
console.log(SearchDate_val);
const enterSearch_Date=()=>{
  if (!SearchDate_val.value) {
    currentTableData.value = tableDataCopy;
  }
  else {
    filterVisable.value = true;
    let filteredData = tableData.value.filter(item => {
      // 给日期进行格式化
      let date = moment(item.date, 'YYYY-MM-DD');
      let stDate=SearchDate_val.value[0];
      let enDate=SearchDate_val.value[1];
      let sDate = moment(stDate, 'YYYY-MM-DD');
      let eDate = moment(enDate, 'YYYY-MM-DD');
      return date.isBetween(sDate, eDate, null, '[]');
    })
    currentTableData.value = filteredData;
  }

}

const enterSearch_Name = () => {
  // `filter()` 方法返回的是一个新的数组，不会改变原数组
  if (SearchNameVal.value.length > 0) {
    filterVisable.value=true;
    currentTableData.value = tableData.value.filter(item => (item.name).toLowerCase().match(SearchNameVal.value.toLowerCase()));
  
  }
  else {
    currentTableData.value = tableDataCopy;
  }
}

const enterSearch_Nmr = () => {
  if (SearchNmrhVal.value.length > 0) {
    filterVisable.value = true;
    currentTableData.value = tableData.value.filter(item => (item.nmr).toLowerCase().match(SearchNmrhVal.value.toLowerCase()));
  }
  else {
    currentTableData.value = tableDataCopy;
  }
}

const enterSearch_dsc = () => {
  if (SearchDesVal.value.length > 0) {
    filterVisable.value = true;
    currentTableData.value = tableData.value.filter(item => (item.description).toLowerCase().match(SearchDesVal.value.toLowerCase()));
  }
  else {
    currentTableData.value = tableDataCopy;
  }
}

const inputSearch = () => {
    currentTableData.value = tableDataCopy;
}

// 关闭细节对话框
const closeDetails = () => {
  isShow.value = false;
  // info.value = new User();
}

// 检测变化
// const currentChange = (val: number) => {
//   console.log(val);
// }

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

// 添加测试项目
const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: '2023-05-12',
    name: 'Tom2',
    description: 'No. 189, Grove St, Los Angeles',
    nmr: "TCGA-50-5072",
    device: "纳米",
    id: '2',
    instances:0
  })
  // console.log(currentPage.value)
}

</script>


<style scoped>
.title {
  /* background color  */
  background-color: #40a0ff26;
  /* text-align */
  text-align: center;
  border-radius: 10px;
  border-bottom: 1px solid #ccc;
  justify-content: center;
  /* margin-left: 25%; */
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
.input-col{
  /* padding: 0 10px; */
  /* margin: 0 50px; */
  box-sizing: border-box;
  /* width: 200px; */
  
}
.container {
  margin: 10px 0;

}
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
width: 350px;
  height: 30px;
}
/* .el-header{
  display: flex;
  background-color: rgb(4, 28, 74);
} */


/* .layout-container-demo .el-header {
  position: relative;
  background-color:  rgb(4, 28, 74);
  color: white;
  
} */
.el-header {
  position: relative;
  /* background-color:  rgb(4, 28, 74); */
  background-color:  rgb(15,18,21);
  color: white;
}
.layout-container-demo .el-menu {
  border-right: none;
}
/* .layout-container-demo .el-main {
  padding: 0;
} */
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.toolbar{
  position:relative;
  right:0;
  padding: 15px 0;
}
.container-header{
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container-header p{
font-size: 30px;
/* position: fixed; */
display: flex;
align-items: center;
}


.layout-container-main{
  /* background: rgb(9,12,41); */
  /* background: seagreen; */
  margin:0 40px;
}
.main-header {
  /* background: rgb(9,12,41); */
  background: rgb(21,26,31);
  /* margin: 20px 0; */
  height: 140px;
  width: 100%;
  border-bottom: solid 0.05em rgb(0,164,217) ;
}
.main-main {
  /* background: rgb(9,12,41); */
  background: rgb(21,26,31);
  color: white;
  padding: 0;
}
.table{
  /* background: rgb(9,12,41); */
  background: rgb(21,26,31);
 
}
/* .queryInput .el-table{
  background: rgb(9,12,41);
} */
.el-table-column{
   background: rgb(9,12,41);
   
}
/* #el-id-5344-6{
 background: rgb(9,12,41);
 border-color:   rgb(58, 63, 153);
} */
.main-header-header{
  margin: 10px 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 0.05em #000;
  /* flex-direction:row */
}
.main-header-header span{
  font-size: 22px;
  color: rgb(0,164,217);
}
.main-header-header .span2{
  font-size: 35px;
}

</style>