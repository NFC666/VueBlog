<template >
    <v-dialog
      v-model="config.dialog"
      width="400px"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-alert"
        text="确认删除吗？"
        title="删除"
      >
        <VCardActions class="d-flex justify-right">
            <VBtn @click="Cancel">取消</VBtn>
            <VBtn @click="Confirm" color="red">确定</VBtn>
        </VCardActions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
export default {
    name:"DeleteDialog"
}
</script>

<script lang="ts" setup>
    import { reactive } from 'vue';
    import { ref } from 'vue';
    import api from '@/utils/request';
    const props = defineProps<{
      eassyId:string
    }>();
    
    const config = reactive({
        dialog:false,
    })
    function Cancel(){
        config.dialog = false;
    }
    async function Confirm(){
        config.dialog = false;
        try{
            var resp = await api.delete(`/essay/${props.eassyId}`);
        }catch(error){
            console.log(error,"发生错误");
        }
    }

    function Open(){
      console.log("opened");
      config.dialog = true;
    }
    defineExpose({
      Open
    })
</script>