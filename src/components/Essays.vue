<template>
    <div class="pa-3">
        <div>
            <v-select
            v-model="selectedTags"
            :items="tags"
            label="选怎文章分类"
            multiple
            persistent-hint
          ></v-select>
        </div>
        <v-row no-gutters
        >
            <v-col
            v-for="essay in essaysList"
            sm="12"
            md="6"
            class="px-2 pb-2"
            :key="essay.id"
            
            >
                <VSheet>
                    <EssayCard :essay="essay" />
                </VSheet>
                
                <DeleteDialog ref="dialogRef" :eassyId="essay.id"></DeleteDialog>
            </v-col>
        </v-row>
        <div>
            <v-pagination :length="10" v-model="page"></v-pagination>
        </div>
    </div>
    
</template>

<script lang="ts">
export default {
  name:"EssayEditor"
}
</script>

<script lang="ts" setup>

import type { EssayDTO } from "@/types/EssayDTO";
import EssayCard from "./EssayShow/EssayCard.vue";
import api from "@/utils/request";
import { onBeforeMount, reactive, ref, watch, watchEffect } from "vue";
import { tags } from "@/utils/tags";
const selectedTags = ref([]);
var essaysList = ref<Array<EssayDTO>>([]);
var page = ref(1);
onBeforeMount(async () => {
    try {
        const resp = await api.get(`/essay?page=${page.value}`); // 确保这里使用 await
        if(resp.status == 204){
            essaysList.value = [];
        }
        essaysList.value = resp.data; // 赋值时需要 `.value`
    } catch (error) {
        console.error("获取文章列表失败:", error);
    }
});

watchEffect(async()=>{
    if(selectedTags.value.length == 0){
        const resp = await api.get(`/essay?page=${page.value}`); // 确保这里使用 await
        essaysList.value = resp.data;
        return;
    }
        const params = new URLSearchParams();
        selectedTags.value.forEach(tag => params.append('tags', tag));
        const res = await api.get(`/essay/tag?${params.toString()}&page=${page.value}`);
    essaysList.value = res.data;
});

</script>

<style scoped>

</style>