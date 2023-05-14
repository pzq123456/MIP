<template>
    
    <div id="Bar" :style="color">

           <div id="statusMsg">
                <p>{{ statusmsg }}</p>

           </div>

           <div id="icons">
                <el-icon :size="30">
                <Bell />
                </el-icon>

            </div>
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
            "transition": "all 0.5s ease-in-out",
        };

        return res
    }
    else if (props.statuscode == 1) {
        // 警告
        let res = {
            "background-color": "#faad14",
            "transition": "all 0.5s ease-in-out",
            "border": "1px solid #df1515 ",
        };

        return res
    }
    else if (props.statuscode == 2) {
        // 错误
        let res = {
            // more dark red
            "background-color": "#df1515",            
            "transition": "all 0.5s ease-in-out",
        };

        return res
    }
    else if (props.statuscode == 3) {
        // 成功
        let res = {
            "background-color": "#52c41a",
            "transition": "all 0.5s ease-in-out",
        };
        return res
    }
    else if (props.statuscode == 4) {
        // 处理中
        let res = {
            "background-color": "#778899",
            "transition": "all 0.5s ease-in-out",
        };

        return res
    }
})

</script>

<style scoped>
    #Bar{
        width: 100%;
        height: 30px;

        position: fixed;
        bottom: 0;
        left: 0;

        line-height: 30px ;
        color:       #fdf9f9;
        font-size:   22px;
        text-align:  left;

        display: flex;
        flex-direction: row;
        justify-content: space-between;

    }

    #statusMsg{
        width: 3.5%;
        background-color: rgba(39, 37, 37, 0.442);
    }

    #icons{
        width: 1.5%;
        background-color: rgba(48, 47, 47, 0.458);
    }
    #icons:hover{
        background-color: rgba(48, 47, 47, 0.658);
    }
</style>