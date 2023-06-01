<template>
    <button id="btn1">触发正常状态</button>
    <button id="btn2">触发警告状态</button>
    <button id="btn3">触发错误状态</button>
    <button id="btn4">触发成功状态</button>
    <button id="btn5">触发处理状态</button>

    <LoadingBar id="loadingbar"></LoadingBar>
<StatusBar :statuscode="statuscode" :statusmsg="statusmsg"></StatusBar>
</template>

<script setup>
import StatusBar from '../components/UtilsCom/StatusBar.vue'
import LoadingBar from '../components/UtilsCom/LoadingBar.vue'
import { ref, computed, watch ,onMounted} from 'vue';
// change the status code randomly reactively when the button is clicked 

// let statuscode = ref(0);
// let statusmsg = ref("正常");
let statuscode = ref(0);
let statusmsg = ref("正常");

const changeStatus = () => {
    statuscode.value = Math.floor(Math.random() * 5)
}
onMounted(()=>{
    const btn1 = ref(document.getElementById("btn1"));
    const btn2 = ref(document.getElementById("btn2"));
    const btn3 = ref(document.getElementById("btn3"));
    const btn4 = ref(document.getElementById("btn4"));
    const btn5 = ref(document.getElementById("btn5"));

    btn1.value.addEventListener("click", () => {
        statuscode.value = 0;
        statusmsg.value = "正常";
    })

    btn2.value.addEventListener("click", () => {
        statuscode.value = 1;
        statusmsg.value = "警告";
    })

    btn3.value.addEventListener("click", () => {
        statuscode.value = 2;
        statusmsg.value = "错误";
    })

    btn4.value.addEventListener("click", () => {
        statuscode.value = 3;
        statusmsg.value = "成功";
    })

    btn5.value.addEventListener("click", () => {
        statuscode.value = 4;
        statusmsg.value = "处理中";
    })
    
})
</script>

<style scoped>

</style>