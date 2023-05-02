<template>
    <!-- $emit将 子组件的自定义的关闭函数发射给父组件，让父组件应用这个关闭事件来实现关闭对话框 -->
    <el-dialog v-model="dialogVisable" :title="info.name ? '修改' : '新增'" width="30%" @close="$emit('closeAdd')">
        <!-- 添加表单 -->
        <el-form>
            <!-- 第一个表单 -->
            <el-form-item label="时间" prop="date">
                <el-date-picker v-model="form.date" type="date" placeholder="请选择一个时间"
                    value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
            <!-- 第二个表单 -->
            <el-form-item label="名称" prop="name">
                <!-- v-model将输入框的值绑定到 form.name属性上 -->

                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <!-- 第三个表单 -->
            <el-form-item label="地址" prop="address">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <!-- 第四个表单 -->
            <el-form-item label="排序" prop="order">
                <el-input v-model.number="form.order"></el-input>
            </el-form-item>
            <el-form-item label="ID" prop="id">
                <el-input v-model.number="form.id"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeAdd()">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>

        </template>

    </el-dialog>
</template>
<script lang="ts" setup>
// Ref是用于声明的
import { ref, Ref, computed, watch } from 'vue';

// 组件传值
import User from '../../class/User';
const form: Ref<User> = ref<User>({
    id: "",
    date: "",
    name: "",
    description:  "",
    nmr:"",
    device:  ""
})

// props事件用于对于父组件向子组件传递数据
const props = defineProps({
    // 定义一个组件间传递的属性数据,“：”冒号表示数据类型
    isShow: Boolean,
    info: User,
    form: User
})
// 定义一个emits用于向父组件发送类似于事件接口，其具体如何实现，由父组件去实现。即建立了子组件与父组件的交流函数关系。
const emits = defineEmits(["closeAdd", "confirm", "input-change", "submit"]);
const closeAdd = () => {
    emits("closeAdd");
}
// const confirm=()=>{
//     emits("confirm");
// }
// 向父组件发送一个事件——子组件输入框的数据响应给父组件
const submit = () => {
    emits("submit", {
        date: form.value.date,
        name: form.value.name,
        id: form.value.id,
        address: form.value.address,
        order: form.value.order
    });
}
// 监听器 watch--监听某一个属性
// 监听器中第一个方法为监听的属性，第二个方法为接收的新值和旧值
// 当其中有值变化时，watch就会响应最新的值

// 这里为什么不直接用 v-model来直接对数据进行动态显示
// 因为要对接收的prop信息进行一个处理操作
watch(() => props.info, (newInfo) => {
    if (newInfo) {
        form.value = {
            id: newInfo.id,
            date: newInfo.date,
            name: newInfo.name,
            address: newInfo.address,
            order: newInfo.order
        }
    }
})

// computed为一个计算函数，会把传入进去的属性记录，若其属性发生变动，它就会通过公式自动计算好
// false默认不显示对话框
const dialogVisable = computed(() => props.isShow);

// }
</script>