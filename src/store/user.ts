import { defineStore } from "pinia";
import { type UserDTO } from "@/types/UserDTO";
import {type EssayDTO } from "@/types/EssayDTO";
import {type Essay} from "@/types/Essay"
export const useUserStore = defineStore("user", {
  state: () => ({
    cardEssay: null as EssayDTO | null,
    essayData: {
      title: "", // 标题
      content: "", // 内容
      author: "", // 作者
      coverImage: "", // 封面图片，可选
      tags: [], // 标签列表
      category: "", // 分类
      isPublished: false, // 是否发布
      metaDescription: "", // SEO 描述，可选
    },
    jwtToken:String,
    userData:{
      id:"",
      username:"",
      email:"",
      avatarUrl:"",
      role:"",
      rreatedAt:""
    }
  }),
    
  actions: {

    setcardEssay(data: EssayDTO) {
      this.cardEssay = data;
    },
    resetcardEssay() {
      this.cardEssay = null;
    },
    setEssayData(data:Essay){
      this.essayStore = data
    },
    resetEssayData() {
      this.essayStore = {
        title: "", // 标题
        content: "", // 内容
        author: "", // 作者
        coverImage: "", // 封面图片，可选
        tags: [], // 标签列表
        category: "", // 分类
        isPublished: false, // 是否发布
        metaDescription: "", // SEO 描述，可选
      }
    },
    setToken(token:string){
      this.jwtToken = token;
    },
    clearToken(){
      this.jwtToken = ""
    },
    setUserdata(Dto:UserDTO){
      this.userData = Dto
    },
    clearUserdata(){
      this.userData = null;
    }
  },
  persist: true
});
