<template>
    <div class="mt-15 ">
        <div class="container mx-auto">
            <VRow
            no-gutters
            >
                <VCol
                sm="12"
                md="3"
                >
                    <Login/>
                    <v-select
                    v-model="selectedTags"
                    :items="tags"
                    label="选择文章分类"
                    multiple
                    persistent-hint
                    ></v-select>
                </VCol>


                <VCol
                class="pa-3"
                sm="12"
                md="6"
                >
                    <v-row
                    v-for="essay in essaysList"
                    class="px-3"
                    :key="essay.id"
                    
                    >
                        <VSheet width="100%" class="mb-2">
                            <EssayHomePage :essay="essay" />
                        </VSheet>
                        
                        
                    </v-row>
                    <v-pagination :length="10" v-model="page" class="mt-2"></v-pagination>
                </VCol>
                <VCol
                sm="12"
                md="3"
                >

                    <v-date-picker show-adjacent-months v-if="mdAndUp" color="#33691E" width="100%">
                    </v-date-picker>
                </VCol>
            </VRow>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name:"HomePage"
}
</script>

<script lang="ts" setup>
    import {type EssayDTO} from "@/types/EssayDTO"
    import { ref } from 'vue';
    import { onBeforeMount,watchEffect } from 'vue';
    import api from '@/utils/request';
    import { tags } from '@/utils/tags';
    import EssayHomePage from "./EssayShow/EssayHomePage.vue";
    import Login from "./Login.vue";
    import { useDisplay } from 'vuetify'

    const { mdAndUp } = useDisplay() // 仅在中等屏幕及以上渲染
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
.container{
    width: 100%;
}
.showcolumn{
    background-color: #6D4C41;
    height: 600px;
    color: white;
    padding: 10px;
}
</style>