<template>
  <div class="container">
    <div  class="contentarea" color="#FFF8E1">
      <VImg :src="essay?.coverImage" height="250px" width="100%" cover></VImg>
      <div class="pa-5 ">
          <div class="text-h4 pb-3">{{essay?.title  }}</div>
          <VDivider/>
          <div class="d-float float-right pt-2">作者：{{essay?.author}}</div>
          <div class="text-grey pt-2">发布时间：{{essay?.createdAt}}</div>
          <div v-html="essay?.content" class="pa-5 w-100" ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
    name:"EssayDetail"
}
</script>

<script lang="ts" setup>
import api from '@/utils/request';
import { useUserStore } from '../store/user';
import { DefineProps, onBeforeMount, onMounted } from 'vue';
const userStore = useUserStore();
const essay = userStore.cardEssay;


</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    background-color: #FFECB3;
}
.writertext{
  position: fixed;
  top:10px;
  left: 10px;
  text-shadow: 2px 2px 4px gray;
  writing-mode: vertical-rl; /* 竖排从右往左 */
  text-orientation: upright; /* 让文字保持正向 */
}
@media (max-width: 600px) {
  .contentarea{
    overflow-wrap: break-word;
    min-width: 200px;
    width: 100%;
    background-color: #FFF8E1;
    box-shadow: 4px 4px 16px rgba(0,0,0,0.3);
  }
}
@media (min-width: 600px) {
  .contentarea{
    overflow-wrap: break-word;
    min-width: 200px;
    width: 70%;
    background-color: #FFF8E1;
    box-shadow: 4px 4px 16px rgba(0,0,0,0.3);
  }
}
</style>