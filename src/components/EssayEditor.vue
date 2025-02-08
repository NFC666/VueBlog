
<template>
  <div>
    
    <v-row no-gutters>
      <v-col
      sm="12"
      md="12"
      lg="9"
      class="pa-3"
      >
        <v-sheet style="background-color:#FFF8E1" height="100%" class="pa-3">
          <RichText ref="htmlContent" :content="data.content"/>
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
            <div class="text-h5 pb-2 text-center">文章信息</div>
            <VDivider/>
            <v-text-field label="文章名称" variant="outlined" v-model="data.title"></v-text-field>
            <VTextField label="文章发布者" variant="outlined" v-model="data.author" disabled></VTextField>
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
              <VBtn class="ml-2" color="#FFA726" @click="Publish">发布</VBtn>
            </div>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
    <CustomSnackBar ref="snackbar"></CustomSnackBar>
  </div>
</template>

<script lang="ts">


export default {
  name:"EssayEditor"
}
</script>

<script lang="ts" setup>
import RichText from './RichText/RichText.vue';
import { onBeforeMount, onMounted, onUpdated, reactive, ref } from 'vue';
import {type Essay} from "@/types/Essay"
import axios from 'axios';
import api from '@/utils/request';
import CustomSnackBar from "@/components/snackbars/CustomSnackBar.vue"
import { useUserStore } from '@/store/user';
import {tags as tagList} from "@/utils/tags"
const htmlContent = ref();
const items = tagList;
const tags = ref([]);
const snackbar = ref(null);
const userStore = useUserStore();
const data = ref(userStore.essayData)

onBeforeMount(()=>{
  data.value.author =  userStore.userData.username;
})

async function Publish(){
  console.log(userStore.essayData)
  try{
    data.value.content = htmlContent.value.valueHtml;
    data.value.isPublished = true;
    const resp = await api.post("/essay/addessay",data.value);

    if(resp.status == 200){
      console.log("提交成功",resp)
      snackbar.value.configSnackBar(true,"提交成功","green")
      
    }else{
      console.log("提交失败",resp)
      snackbar.value.configSnackBar(true,"提交失败","red")
    }
  }catch(error){
    console.log("提交失败",error)
    snackbar.value.configSnackBar(true,"提交失败","red")
  }
}
async function Save() {
  try{
    data.value.content = htmlContent.value.valueHtml;
    const resp = await api.post("/essay/addessay",data.value);

    if(resp.status == 200){
      console.log("提交成功",resp)
      snackbar.value.configSnackBar(true,"提交成功","green")
      
    }else{
      console.log("提交失败",resp)
      snackbar.value.configSnackBar(true,"提交失败","red")
    }
  }catch(error){
    console.log("发生错误",error)
    snackbar.value.configSnackBar(true,"发生错误","red")
  }
}

</script>
