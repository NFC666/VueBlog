
<template>
    <div class="bg">
      
      <v-row no-gutters>
        <v-col
        sm="12"
        md="12"
        lg="9"
        class="pa-3"
        >
          <v-sheet style="background-color:#FFF8E1" height="100%" class="pa-3">
            <RichText ref="RichTextRef" :content="data.content"/>
          </v-sheet>
        </v-col>
        <v-col
        sm="12"
        md="12"
        lg="3"
        class="pa-3"
        >
          <v-sheet>
            <v-sheet style="background-color:#FFF8E1" height="700px" class="pa-3">
              <div class="text-h5 pb-2 text-center">文章编辑</div>
              <VDivider/>
              <v-text-field label="文章名称" variant="outlined" v-model="data.title"></v-text-field>
              <VTextField label="文章作者" disabled variant="outlined" v-model="data.author"></VTextField>
              <v-select
              v-model="data.tags"
              :items="items"
              label="选择标签"
              chips
              multiple
              ></v-select>
              <VSheet height="250px" class="border-sm rounded-lg" >
                <VImg :src="data.coverImage" height="100%" cover>
                </VImg>
              </VSheet>
              <VTextField label="头图地址" v-model="data.coverImage"></VTextField>
              <div class="d-flex justify-end mt-5">
                <VBtn @click="Save">存草稿</VBtn>
                <VBtn class="ml-2" color="#FFA726" @click="RePublish" >重新发布</VBtn>
              </div>
            </v-sheet>
          </v-sheet>
        </v-col>
      </v-row>
      <CustomSnackBar ref="snackBarRef"></CustomSnackBar>
    </div>
  </template>
  
  <script lang="ts">
  
  
  export default {
    name:"EssayReEditor"
  }
  </script>
  
  <script lang="ts" setup>
  import RichText from '@/components/RichText/RichText.vue';
  import { onMounted, onUpdated, reactive, ref } from 'vue';
  import {type Essay} from "../types/Essay"
  import axios from 'axios';
  import api from '@/utils/request';
  import { useUserStore } from '@/store/user';
  import { EssayDTO } from '@/types/EssayDTO';
  import CustomSnackBar from "@/components/snackbars/CustomSnackBar.vue"
  import {tags as tagsList} from "@/utils/tags"
  const userStore = useUserStore();
  const RichTextRef = ref();
  const items = tagsList;
  const tags = ref([]);
  const snackBarRef = ref(null);
  const data = ref<EssayDTO>(userStore.cardEssay);

  async function RePublish(){
    data.value.content = RichTextRef.value.valueHtml;
    data.value.isPublished = true;
    try{
      var resp = await api.put(`/essay/${data.value.id}`,data.value)
      if(resp.status == 200){
        console.log("更新成功");
        userStore.setcardEssay(data.value)
        snackBarRef.value.configSnackBar(true,"更新成功","green")
      }else{
        console.log("更新失败")
        snackBarRef.value.configSnackBar(true,"更新失败","red")
      }
    }catch(error){
      console.log(error,"发生错误");    
      snackBarRef.value.configSnackBar(true,"更新失败","red")
    }
  }
  async function Save() 
  {
      data.value.isPublished = false;
      try{
        var resp = await api.put(`/essay/${data.value.id}`,data.value)
        if(resp.status == 200){
          console.log("已放入草稿");
          userStore.setcardEssay(data.value)
          snackBarRef.value.configSnackBar(true,"放入草稿","green")
        }else{
          console.log("更新失败")
          snackBarRef.value.configSnackBar(true,"更新失败","red")
        }
      }catch(error){
        console.log(error,"发生错误");    
        snackBarRef.value.configSnackBar(true,"更新失败","red")
      }
  }
  
  </script>
<style>
.bg{
    background-color: #FFECB3;
}
</style>