<template>
    <v-card color="#FFF8E1">
        <v-img
            height="200px"
            :src="essay.coverImage"
            cover
        >
        </v-img>
        <v-card-title >
            <div v-if="!essay.isPublished" class="text-grey">{{ essay.title }}|草稿 </div>
            <div v-else class="">{{ essay.title }} </div>
        </v-card-title>
        <VCardText>
            {{ essay.excerpt }}
            <div class="pt-2">
                <v-chip v-for="tag in essay.tags" :key="tag" variant="elevated" class="mr-2" color="#FFECB3">
                    {{ tag }}
                </v-chip>
                
            </div>
        </VCardText>
        <VCardActions>
            <VBtn @click="Check">查看</VBtn>
            <VBtn @click="Edit">修改</VBtn>
            <VBtn color="red" @click="Remove">删除</VBtn>
        </VCardActions>
        <CustomSnackBar ref="snackerRef"></CustomSnackBar>
        <DeleteDialog ref="dialogRef" :eassyId="essay.id"></DeleteDialog>
        </v-card>
</template>

<script lang="ts">
export default {
    name:"EssayCard"
}
</script>

<script lang="ts" setup>
    import { useRouter } from 'vue-router';
    import {type EssayDTO} from "@/types/EssayDTO"
    import router from '@/router';
    import { ref } from 'vue';
    
    import {useUserStore} from "@/store/user"
    import api from '@/utils/request';
    import CustomSnackBar from '../snackbars/CustomSnackBar.vue';
    import DeleteDialog from "@/components/Dialog/DeleteDialog.vue";
    const props = defineProps<{essay:EssayDTO}>();
    const userStore = useUserStore();
    const snackerRef = ref(null);
    const dialogRef = ref(null);
    function Check(){
        userStore.setcardEssay(props.essay);
        router.push(`/EssayDetail/${props.essay.slug}`)

        // router.push({name:"EssayDetail",params:{name:props.essay.slug}})
    }
    function Edit(){
        userStore.setcardEssay(props.essay);
        router.push(`/EssayReEditor/${props.essay.slug}`)
    }
    async function Remove(){
        console.log("remove");
        dialogRef.value.Open();

    }
</script>
