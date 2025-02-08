<template>
    <div class="container d-flex justify-center align-center">
        
        <VSheet height="600px" width="400px" color="#FFF8E1" elevation="3">
            <VSheet height="400px" class="mb-3 pa-3" color="#FFF8E1">
                <VSheet height="150px" class="d-flex flex-wrap justify-center align-center " color="#FFF8E1">
                    <v-avatar :image="registerUser.avatarUrl"  size="100" class="mb-4" rounded="0"/>
                </VSheet>
                <v-text-field label="头像url地址" v-model="registerUser.avatarUrl"  variant="outlined" ></v-text-field>
                <v-text-field label="用户名" variant="outlined" v-model="registerUser.username" ></v-text-field>
                <v-text-field label="密码" variant="outlined" type="password" v-model="registerUser.passwordHash" ></v-text-field>
                
                <v-text-field label="邮箱" variant="outlined" v-model="registerUser.email"></v-text-field>
                <VBtn width="100%" color="#6D4C41" @click="Register">注册</VBtn>
                <VBtn width="100%" color="#6D4C41" variant="outlined" class="mt-3" @click="BackToTable">取消注册</VBtn>
                <CustomSnackBar ref="snackerRef"></CustomSnackBar>
            </VSheet>
        </VSheet>
    </div>
        
</template>

<script lang="ts">
export default {
    name:"UserRegister"
}
</script>

<script lang="ts" setup>
import router from '@/router';
import { User } from '@/types/User';
import { ref, watchEffect } from 'vue';
import api from '@/utils/request';
import CustomSnackBar from '../snackbars/CustomSnackBar.vue';
const snackerRef = ref();
const registerUser = ref<User>({
    username:"",
    email:"",
    avatarUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F10%2F20210610081847_24267.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
    passwordHash:""
});

function BackToTable(){
    router.push("UserAdminstration");
}
watchEffect(()=>{
    console.log(registerUser.value);
})


async function Register(){
    
    try {
        const resp = await api.post("/user/register/user", registerUser.value);
        if (resp.status === 200 || resp.status === 201) {
            return snackerRef.value.configSnackBar(true, "注册成功", "green");
    }
    } catch (error) {
        if (error.response && error.response.status === 409) {
            return snackerRef.value.configSnackBar(true, "用户名重复", "red");
        }
        return snackerRef.value.configSnackBar(true, "注册失败", "red");
    }



}
</script>

<style scoped>
.container{
    height: 100%;
    width: 100%;
    position: relative;
}
.BackBtn{
    display: absolute;
    top: 10px;
    left: 10px;
}

</style>