<template>
    <!-- $emit将 子组件的自定义的关闭函数发射给父组件，让父组件应用这个关闭事件来实现关闭对话框 -->
    <!-- draggable可拖拽 -->
    <el-dialog v-model="dialogVisable" :title="'详情病例'" draggable width="80%" @close="$emit('closeDetails')" 
    >
        <el-row class="mb-4">
                <el-button type="primary" :icon="Open" round size="large" >Basic Viewer </el-button>
            <!-- <el-button type="danger">Danger</el-button> -->
        </el-row>
        <!-- 添加details表格 -->
        <el-table :data="tableDetails"  style="width: 100%" size="large" height="480px" :row-key="row => row.id"
        :default-sort="{ prop: 'ser', order: 'descending' }" >
    <el-table-column prop="description" v-model="form.description" label="Description" width="300" sortable />
        <el-table-column prop="series" v-model="form.series" label="Series" width="300" sortable />
        <el-table-column prop="device" v-model="form.device" label="成像设备" width="300"  sortable/>
        <el-table-column prop="instances" v-model="form.instances" label="实例" width="200" />
        </el-table>
        <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加项目
        </el-button>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeAdd()" type="danger">取消</el-button>
                <!-- <el-button type="primary" @click="submit">确定</el-button> -->
            </span>

        </template>

    </el-dialog>
</template>
<script lang="ts" setup>
// Ref是用于声明的
import { ref, Ref, computed, watch } from 'vue';
// 引入icon图标
import { DocumentCopy, Search,Open } from '@element-plus/icons-vue';
// 组件传值
import User from '../../class/User';
import Detail from '../../class/Detail'
const form: Ref<Detail> = ref<Detail>({
    series: "",
    description: "",
    nmr: "",
    device: "",
    instances: 0
})

// props事件用于对于父组件向子组件传递数据
const props = defineProps({
    // 定义一个组件间传递的属性数据,“：”冒号表示数据类型
    isShow: Boolean,
    info: User,
    form: User,
    tableDetails:[],
   
})
// 定义一个emits用于向父组件发送类似于事件接口，其具体如何实现，由父组件去实现。即建立了子组件与父组件的交流函数关系。
const emits = defineEmits(["closeDetails", "confirm", "input-change", "submit","openDetails"]);
const closeAdd = () => {
    emits("closeDetails");
}

const openDetails=()=>{
    emits("openDetails");
}


// 添加项目
const Details=ref([]);
const onAddItem = () => {
    props.tableDetails.push({
        description: "Body 3.0 CE",
        series: "1",
        device: "CT",
        instances: 0
    })
}
// const submit = () => {
//     emits("submit", {
//         date: form.value.date,
//         name: form.value.name,
//         id: form.value.id,
//         address: form.value.address,
//         order: form.value.order
//     });
// }
// 监听器 watch--监听某一个属性
// 监听器中第一个方法为监听的属性，第二个方法为接收的新值和旧值
// 当其中有值变化时，watch就会响应最新的值

// 这里为什么不直接用 v-model来直接对数据进行动态显示
// // 因为要对接收的prop信息进行一个处理操作
// watch(() => props.info, (newInfo) => {
//     if (newInfo) {
//         form.value = {
//             id: newInfo.id,
//             date: newInfo.date,
//             name: newInfo.name,
//             address: newInfo.address,
//             order: newInfo.order
//         }
//     }
// })

// computed为一个计算函数，会把传入进去的属性记录，若其属性发生变动，它就会通过公式自动计算好
// false默认不显示对话框
const dialogVisable = computed(() => props.isShow);

// }
</script>
<style scoped>

</style>