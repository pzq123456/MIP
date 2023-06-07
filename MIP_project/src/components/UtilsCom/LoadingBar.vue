<template>

    <div class="backblur">

    </div>
    <div class="loading_card" >
        <div></div>
        <div class="loading_text"></div>
        <div class="box">
            <div></div>
        </div>
    </div>

</template>

<script setup>

</script>

<style scoped>

.box {
    width: 100%;
    height: 10%;
    background-color: #ccc;
    border-radius: 5px;
    position: relative;
}

.box ::before{
    content: '';
    position: absolute;
    width: 10%;
    height: 100%;
    left: 0;
    background: linear-gradient(90deg, #00ccff, #d500f9);
    border-radius: 5px;
    animation: move-ani 2s linear infinite;
    /* blur */
    filter: blur(10px);
}

@keyframes move-ani {
    50% {
        width: 100%;
    }
    100% {
        width: 0%;
        left: unset;
        right: 0;
    }
}

.loading_text{
    text-align: center;
    font-size: 20px;
    margin: 10px auto;
}

/* animate the text */
.loading_text::after {
    content: '';
    animation: animate 3s linear infinite;
}

@keyframes animate {
    0% {
        content: '加载中';
    }
    25% {
        content: '加载中.';
    }
    50% {
        content: '加载中..';
    }
    75% {
        content: '加载中...';
    }
    100% {
        content: '加载中';
    }
}

.loading_card{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 200px;
}

.backblur{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    /* blur background */
    backdrop-filter: blur(10px);
}


</style>