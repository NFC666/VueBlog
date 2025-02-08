<template>
    <VSheet class="ma-5" color="#FFF8E1" elevation="3">
        <VDataTable
        class="table"
        :items="users"
        >

        </VDataTable>
        <VTable
        class="table"
        >

            <tr>
                <div class="pa-2">
                    <VBtn variant="text" @click="Register">添加用户</VBtn>
                </div>
            </tr>
        </VTable>
    </VSheet>
</template>

<script lang="ts">
export default {
    name:"UserAdminstration"
}
</script>


<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import api from '@/utils/request';
import router from '@/router';

const users = ref([]); // 用 ref() 让 users 变成响应式

onBeforeMount(async () => {
  const res = await api.get("/user/users");
  users.value = res.data; // 赋值给 ref 响应式变量
});

function Register(){
    router.push("UserRegister");
}
</script>
<style scoped>
.table{
    background-color: #FFF8E1;
}
</style>