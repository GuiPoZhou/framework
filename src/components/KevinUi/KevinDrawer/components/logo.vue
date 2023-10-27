<template>
    <div class="drawerlogoarea">
        <img class="kevin_boshland" src="./logo.png" alt="">
        <span class="drawertitle">{{title}}</span>
    </div>
</template>

<script>
export default {
    props:{
        title:String
    }
}
</script>
<style lang="scss" scoped>
.drawerlogoarea {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
}

.kevin_boshland {
    width: 10rem;
    height: 5rem;
    margin-left: 1rem;
    user-select: none;
}

.drawertitle {
    font-size: 1.4rem;
    background: linear-gradient(to right, #1267CE 33%, #D4D4D4 33%, #D4D4D4 66%, #EB8918 66%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}</style>