<template>
  <VApp>
    <VAppBar class="appbar" elevation="3" scroll-behavior="inverted">
      <div class="appbar-content">
        <div class="logo">
          <VIcon icon="mdi-tree-outline" size="40" class="logo-icon"></VIcon>
          <span class="logo-text" @click="BackToHomePage" >森の站</span>
        </div>
      </div>
    </VAppBar>

    <VMain class="container">
      <RouterView ></RouterView>
    </VMain>
  </VApp>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted } from "vue";
import router from "@/router";
onBeforeMount(()=>{
  router.push("/HomePage")
})

function BackToHomePage(){
  router.push("/HomePage");
}
</script>

<style scoped>
/* 统一色调：树木色 + 柔和橙色 */
.appbar {
  background-color: #6D4C41 !important; /* 深色木纹 */
  color: white;
  padding: 0 20px;
}

.appbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.logo {
  display: flex;
  width: 500px;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  color: #FFB74D; /* 柔和橙色 */
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-left: 10px;
}

.nav-buttons {
  display: flex;
  gap: 15px;
}



.container {
  background-color: #FFECB3; /* 柔和淡黄色 */
  min-height: 100vh;
  padding: 20px;
}
</style>
