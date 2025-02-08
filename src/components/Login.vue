
<template>
    <div v-if="!isLogin">
        <VSheet height="400px" class="mb-3 pa-3" color="#FFF8E1">
          <VSheet height="150px" class="d-flex flex-wrap justify-center align-center " color="#FFF8E1">
              <v-avatar :image="user.avatarUrl" size="100" class="mb-4"/>
          </VSheet>
          <v-text-field label="用户名" variant="outlined" v-model="user.username"></v-text-field>
          <v-text-field label="密码" variant="outlined" type="password" v-model="user.passwordHash"></v-text-field>
          <VBtn width="100%" color="#6D4C41" @click="Login">登录</VBtn>
          <CustomSnackBar ref="snackerRef"></CustomSnackBar>
      </VSheet>
    </div>
    <div v-else>
      <VSheet height="400px" class="pa-5" color="#FFF8E1">
        <VSheet height="150px" class="d-flex flex-wrap justify-center align-center " color="#FFF8E1">
          <v-avatar :image="userStore.userData.avatarUrl" size="100" class="mb-4"/>
        </VSheet>
        <div class="text-h4 font-weight-bold">欢迎！</div>
        <div class="text-h4 font-weight-bold">{{ userStore.userData.username }}</div>
        <VBtn  @click="ToDashBorad" color="#6D4C41" rounded="20" width="100%" class="mt-5">前往后台</VBtn>

      </VSheet>
  </div>
</template>

<script lang="ts">
export default {
  name:"Login"
}
console.log("hello")
</script>

<script lang="ts" setup>
  import { onBeforeMount, reactive, ref } from 'vue'; 
  import { useRouter,useRoute } from 'vue-router';
  import { User } from "@/types/User"
  import api from "@/utils/request"
  import CustomSnackBar from './snackbars/CustomSnackBar.vue';
  import { useUserStore } from '@/store/user';
  const userStore = useUserStore();
  const user = reactive(new User("", "", "",""));
  user.avatarUrl = "https://img1.baidu.com/it/u=106223020,3427811242&fm=253&fmt=auto&app=120&f=JPEG";
  const router = useRouter();
  var snackerRef = ref();
  var isLogin = ref(false);

  onBeforeMount(async()=>{
    const resp = await api.get("/auth/secure",{
          headers:{
            Authorization:`Bearer ${userStore.jwtToken}`
          }
    });
    if(resp.status == 200){
      isLogin.value = true;
    }
  })

  async function Login(){
    try{
        const res = await api.post("/auth/login",user);
      if(res.status == 200){
        snackerRef.value.configSnackBar(true,"登录成功","green");
        userStore.setToken(res.data.token);

        const userResp = await api.get(`/user/name?name=${user.username}`);
        isLogin.value = true;
        console.log(userResp.data);
        userStore.setUserdata(userResp.data);
      }else{
        snackerRef.value.configSnackBar(true,"登陆失败","yellow");
      }
    }catch(error){
      snackerRef.value.configSnackBar(true,"发生错误","red");
    }
  }
  function ToDashBorad(){
    router.push("/DashBorad");
  }
  defineExpose({
    isLogin
  })
</script>

<style lang="scss">



</style>