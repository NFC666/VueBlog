<template>
  <Toolbar class="toolbar" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
  <Editor
    class="editor_"
    :default-config="editorConfig"
    :mode="mode"
    v-model="valueHtml"
    style="height: 700px; overflow-y: hidden;"
    @on-created="handleCreated"
  />
</template>

<script lang="ts">
  export default {
    name:"RichText"
  }
</script>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css';
import { ref, shallowRef, onBeforeUnmount, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import {useUserStore} from "@/store/user"
const props = defineProps<{ content?: string }>();
const userStore = useUserStore();
const editorRef = shallowRef();
const valueHtml = ref(props.content || "");
const mode = ref('default');
const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };
let timer = null;
onMounted(()=>{
  timer = setInterval(()=>{
    userStore.essayData.content = valueHtml.value;
    console.log("Saved")
  },2000)
})



onBeforeUnmount(() => {editorRef.value?.destroy();clearInterval(timer);});

const handleCreated = (editor: any) => {
  console.log('created', editor);
  editorRef.value = editor;
};


defineExpose({ valueHtml });
</script>

<style>
.editor_ .w-e-text-container,
.toolbar .w-e-toolbar {
  background-color: transparent !important;

}

.editorarea {
  border-left: 2px solid #e9e9e9;
}
/* 滚动条整体 */
.editor_ ::-webkit-scrollbar {
  width: 6px;  /* 纵向滚动条宽度 */
  height: 6px; /* 横向滚动条高度 */
}

/* 滚动条轨道 */
.editor_ ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1); /* 半透明背景 */
  border-radius: 10px;
}

/* 滚动条滑块 */
.editor_ ::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #FFCA28  , #FF6F00  ); /* 渐变色 */
  border-radius: 10px;
}

/* 悬停时滚动条滑块样式 */
.editor_ ::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #FFCA28  , #FF6F00);
}


</style>
