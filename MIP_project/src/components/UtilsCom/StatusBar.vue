<template>
    
    <div id="Bar" :style="color">
        <div id="SeparateLine"></div>
            <p>{{ statusmsg }}</p>
    </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue';

// props事件用于对于父组件向子组件传递数据
const props = defineProps({
    statuscode: Number,
    statusmsg: String,
})

let statusmsg = props.statusmsg;
watch(() => props.statusmsg, (newInfo) => {
    if (newInfo) {
        statusmsg = newInfo;
    }
})



const color = computed(() => {
    if (props.statuscode == 0) {
        // 正常
        let res = {
            "background-color": "#1890ff",
            // 生成 <div id="SeparateLine"> 的对应样式
            "#SeparateLine": {
                "background-color": "#1890ff",
            }
        };

        return res
    }
    else if (props.statuscode == 1) {
        // 警告
        let res = {
            "background-color": "#faad14",
            "#SeparateLine": {
                "background-color": "#faad14",
            }
        };

        return res
    }
    else if (props.statuscode == 2) {
        // 错误
        let res = {
            "background-color": "#f5222d",
            "#SeparateLine": {
                "background-color": "#f5222d",
            }
        };

        return res
    }
    else if (props.statuscode == 3) {
        // 成功
        let res = {
            "background-color": "#52c41a",
            "#SeparateLine": {
                "background-color": "#52c41a",
            }
        };
        return res
    }
    else if (props.statuscode == 4) {
        // 处理中
        let res = {
            "background-color": "	#778899",
            "#SeparateLine": {
                "background-color": "	#778899",
            }
        };

        return res
    }
})

</script>

<style scoped>
    #Bar{
        width: 100%;
        height: 40px;
        background-color: #df1515;
        line-height: 50px;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    #SeparateLine{
        width: 100%;
        height: 3px;
        background-color: #fdfdfdcc;
    }
</style>