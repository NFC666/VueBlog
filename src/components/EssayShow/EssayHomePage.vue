<template>
    <VCard width="100%" elevation="3" class="essay-card">
      <VRow no-gutters>
        <!-- 文章封面 -->
        <VCol cols="12" md="4">
          <VImg :src="props.essay.coverImage" height="100%" cover class="cover-image" @click="ReadMore"></VImg>
        </VCol>
  
        <!-- 文章内容 -->
        <VCol cols="12" md="8" class="content-section">
          <VCardTitle class="text-h6">{{ props.essay.title }}</VCardTitle>
          <VDivider/>
          <VCardText class="excerpt-show">
            {{ props.essay.excerpt }}
            <div class="mt-3">
              <VChip v-for="tag in props.essay.tags" :key="tag" variant="elevated" class="mr-2" color="#FFECB3">
                {{ tag  }}
              </VChip>
            </div>
            
          </VCardText>

          <!-- 可扩展：添加按钮或其他交互元素 -->
          <VCardActions>
            <VBtn variant="text" color="#33691E" @click="ReadMore" >阅读更多</VBtn>
          </VCardActions>
        </VCol>
      </VRow>
    </VCard>
  </template>
  

  <script lang="ts">
  export default {
      name:"EssayHomePage"
  }
  </script>


  <script lang="ts" setup>
  import router from '@/router';
  import { EssayDTO } from '@/types/EssayDTO';
  import { useUserStore } from '@/store/user';
  const props = defineProps<{ essay: EssayDTO }>();

  const userStore = useUserStore();

  function ReadMore(){
    userStore.setcardEssay(props.essay);
    router.push(`/EssayDetailHomePage/${props.essay.slug}`)
  }
  </script>
  
  <style scoped>
  .essay-card {
    overflow: hidden;
    background-color: #FFF8E1;
  }
  
  .cover-image {
    object-fit: cover;
  }
  
  .content-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .excerpt-show {
    flex-grow: 1;
  }
  </style>
  