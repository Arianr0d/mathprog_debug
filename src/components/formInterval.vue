<template>
   <div v-bind:class="{openForm: openForm}">
      <div class="group_top" @click="openForm =! openForm">
         <img v-bind:style="{ openForm: imgRotate }" src="../assets/img/angleDown.svg">
         <p>Ограничения оптимизации</p>
      </div>
      <div v-if="openForm" class="group">
         <div v-for="value in params" :key="value.name" class="group_var">
            <label>{{ value.name }}:</label>
            <formInput v-model:value="value.min" :validate="validNumber" :labelText="'от'" class="input"/>
            <formInput v-model:value="value.max" :validate="validNumber" :labelText="'до'" class="input"/>
         </div>
      </div>
   </div>
</template>

<script>
import formInput from '../components/formInput.vue'

export default {
   name: "formInterval",
   components: {
      formInput
   },
   props: ['params'],
   emits: ['update:params'],
   data() {
      return {
         openForm: false,
         validNumber: /^[-]|[0-9]\d*$/
      }
   }
}
</script>

/*
   ! не меняется отображение галочки при раскрытии div с интервалами переменных 
*/

<style scoped>

.openForm {
   margin: 10px 0 40px 0;
   border: 1px solid rgba(0, 0, 0, 0.3);
   border-radius: 5px 5px 0 0;
   box-shadow: 0 0 5px rgba(0,0,0,0.04);
   padding: 5px 10px;
}

.group {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   margin-bottom: 10px;
}

.group_top {
   display: flex;
   width: 250px;
   cursor: pointer;
}

img {
   width: 30px;
   height: auto;
   margin-right: 10px;
   transition: 1s ease-in-out;
}

img.imgRotate {
   transform: rotateY(180deg);
}

.group_var {
   display: flex;
   align-items: flex-start;
   margin-top: 20px;
}

.group_var label, .input {
   margin-right: 20px;
}

label {
   margin-top: 15px;
}

.input {
   width: 150px;
}
</style>