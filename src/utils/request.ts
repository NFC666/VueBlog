import axios from "axios";
import { error } from "console";
import { useUserStore } from "@/store/user.js";
import router from "@/router/index.js";
const api = axios.create({
    baseURL:'https://39.105.1.152/api',//修改了此处的代码

    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    }
});


api.interceptors.request.use((config)=>{
    const userStore = useUserStore();
    if(userStore.jwtToken){
        config.headers.Authorization = `Bearer ${userStore.jwtToken}`;

    }
    return config;
},(error)=>{
    return Promise.reject(error);
})

api.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    const userStore = useUserStore();
    if(error.response.status ==  401){
        userStore.clearToken();
        router.push("/HomePage");
    }
    return Promise.reject(error);
})

export default api;