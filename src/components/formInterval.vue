<template>
   <div class="main_div" v-bind:class="{openForm: openForm}">
      <div class="group_top" @click="openForm =! openForm">
            <img v-bind:class="{openForm: imgRotate}" src="../assets/img/angleDown.svg" >
         <p>Ограничения оптимизации</p>
      </div>
      <div v-if="openForm" class="group">
         <div v-for="value in params" :key="value.name" class="group_var">
            <label>{{ value.name }}:</label>
            <div class="group__column">
               <formInput v-model:value="value.min" :validate="validNumber" :labelText="'от'" class="input" :countWidth="100" :countWidthLine="99.95"/>
               <formInput v-model:value="value.max" :validate="validNumber" :labelText="'до'" class="input" :countWidth="100" :countWidthLine="99.95"/>
            </div>
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
         validNumber: /^(0|[-]?[0-9]?[1-9]*[0-9]*.[0-9]|[-]?[1-9]*|[1-9][0-9]*)$/
      }
   }
}
</script>

<style scoped>
.main_div{
   transition: .4s ease-in-out;
}
.openForm {
   margin: 20px 0 20px 0;
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
   justify-content: flex-start;
   width: 100%;
   cursor: pointer;
}

.openForm div img {
   transform: rotateX(180deg);
   margin-bottom: 5px;
}

img {
   transform-style: preserve-3d;
   margin-right: 10px;
   transition: .7s ease-in-out;
   width: 30px;
   height: auto;
}

.group_var {
   display: flex;
   align-items: flex-start;
   justify-content: center;
   margin-top: 20px;
}

.group_var label, .input {
   margin-right: 20px;
}

.group__column {
   display: flex;
}

label {
   margin-top: 15px;
   font-size: 26px;
}

p {
   color: #fa7014;
   font-size: 18px;
}

.input {
   max-width: 170px;
}

@media (max-width: 600px) {
   .group__column {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
   }
}
</style>