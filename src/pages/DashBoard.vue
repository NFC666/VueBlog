
<template>
    <v-app >
        <v-navigation-drawer
        expand-on-hover
        v-model="drawer"
        rail
        class="drawer"
      >
        <v-list>
          <v-list-item
          :prepend-avatar="userStore.userData.avatarUrl"  
          :subtitle="userStore.userData.email"           
          :title="userStore.userData.username"            
        ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-plus" title="撰写文章" to="/DashBorad/EssayEditor"></v-list-item>
          <v-list-item prepend-icon="mdi-folder" title="我的文章" to="/DashBorad/Eassy"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group" title="用户管理" to="/DashBorad/UserAdminstration"></v-list-item>
          <v-list-item prepend-icon="mdi-home" title="返回主页" @click="BackToHome"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" title="退出登录" @click="logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="maincontent">
        <router-view></router-view> 
        <v-btn
        class="toggle-button"
        color="#FFD54F"
        icon="mdi-menu"
        @click="toggleDrawer"
      ></v-btn>
      </v-main>
    </v-app>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';


export default {
    name: "DashBoard",
}
</script>

<script lang="ts" setup>
    import { onBeforeMount, ref } from 'vue';
    import { useUserStore } from '@/store/user';
    import api from '@/utils/request';
    const router = useRouter();
    const drawer = ref(true);
    const userStore = useUserStore();
    const isAdmin = ref(false);
    console.log("This is DashBoard")

    onBeforeMount(async()=>{
      try{
        const resp = await api.get("auth/secure");

      }catch(error){
        console.log(error);
      }
      
    })

    const logout = () => {
        userStore.clearToken();
        router.push("/HomePage");
    };
    const toggleDrawer = () => {
        drawer.value = !drawer.value;
    };
    const BackToHome = () =>{
      router.push("/HomePage");
    }
</script>

<style scoped>
/* 悬浮按钮样式 */
.toggle-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.drawer{
    background-color: #6D4C41;
    color: white;
}
.maincontent{
    background-color:#FFECB3;
}
</style>