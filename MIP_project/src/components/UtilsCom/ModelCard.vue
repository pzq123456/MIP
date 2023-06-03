<template>
    <div class="wrapper">
        <div class="title">
            <h3>nnUNET</h3>
        </div>




        <div class="buttons">
            <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain>Download</el-button>
            <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain>View on Github</el-button>
            <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain>Chose</el-button>
            <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain>Run</el-button>
        </div>
        <div class="imgWrapper">
            <img src="nnUNET.jpg" alt="nnUNET" class="img">
        </div>
        <div class="description">
            <p>nnUNET is a deep learning based segmentation tool for 3D biomedical image segmentation. It is based on a convolutional neural network architecture that can be trained end-to-end from scratch.</p>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import 'element-plus/theme-chalk/dark/css-vars.css'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    width: 450px;
    height: 450px;

    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    background: linear-gradient(135deg, #d9dfe994 0%, #dcbae95a 100%);
    box-shadow: 0 0 10px rgba(255, 254, 254, 0.329);
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background: #f4f1f15f;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.title h3 {
    font-size: 20px;
    font-weight: 600;
}

.imgWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background: #f0e6e634;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

.description {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    background: #f4f1f15f;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.description p {
    font-size: 14px;
    font-weight: 400;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background: #f4f1f15f;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}



</style>