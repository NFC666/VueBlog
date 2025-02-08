<template>
    <v-snackbar
      v-model="config.showTrigger"
      :color="config.color"
      timeout="3000"
    >
      {{ config.text }}

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="config.showTrigger = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script lang="ts">
export default {
    name:"CustomSnackBar"
}
</script>

<script lang="ts" setup>
import { reactive } from 'vue';

const config = reactive({
    showTrigger:false,
    text:"",
    color:""
})

function configSnackBar(showTrigger,text,color){
    config.showTrigger = showTrigger;
    config.text = text;
    config.color = color;
}

defineExpose({
    config,configSnackBar
})

</script>