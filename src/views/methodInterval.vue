<template>
   <form>
      <div class="group_col">
         <div class="group_row_">
            <img src="../assets/img/debug2.svg">
            <p class="title_name">Интервальный алгоритм</p>
         </div>
         <formInput v-model:value="functionString" :labelText="'Вид целевой функции'" :validate="validFuncString" :textError="textErrorFunc" @change="funcFindVariable" v-model:validError="errorsForm.funcError" :countWidth="100" :countWidthLine="100"/>
         <formInterval v-model:params="objVariables"/>
         <div class="group_row_start" v-bind:class="{ small: (width <= 900)}">
            <div class="component">
               <formInput v-model:value="epsilon" :labelText="'Минимум ширины бруса'" :validate="validValueReal" :textError="textErrorEpsilon" :countWidth="100" :countWidthLine="99.95"/>
            </div>
            <div class="component">
               <formRangeInput v-model:value="valuePrecision" :minVal="0" :maxVal="15" :step="1" :id="'range2'"/>
            </div>
            <div class="component">
               <formSwitch v-model:value="toggleOnMultipleOpt" :labelText="'Поиск всех оптимумов'" style="margin-top: 10px"/>
            </div>
         </div>
         <div class="group_row_right">
            <formButton :buttonText="'Рассчитать'" @click="clickButton"/>
         </div>
      </div>
      <div v-if="openFormResult">
         <div class="group_res">
            <p class="outputText">{{ stringResult }}</p>
         </div>
         <div class="group_res_center">
            <ul v-for="item in resParam" :key="item.index">
               <li>{{item.index}} = {{ item.value }}</li>
            </ul>
         </div>
         <div class="group_row_right">
            <p class="outputText">Время работы алгоритма: {{ result.time }} мс</p>
         </div>
      </div>
   </form>
</template>

<script>
import formInput from '../components/formInput.vue'
import formButton from '../components/formButton.vue'
import formRangeInput from '../components/formRangeInput.vue'
import formInterval from '../components/formInterval.vue'
import formSwitch from '../components/formSwitch.vue'
import SimpleMethod from '../functions/simple.js'
//import { create, all } from 'mathjs'
//const config = { }
//const math = create(all, config)

export default {
   name: "methodInterval",
   components: {
      formInput,
      formButton,
      formRangeInput,
      formInterval,
      formSwitch
   },
   data() {
      return {
         width: document.documentElement.clientWidth,
         height: document.documentElement.clientHeight,

         functionString: 'x^2',
         epsilon: 0.01,
         valuePrecision: 3,
         toggleOnMultipleOpt: false,

         validFuncString: /^.[^\s]*$/,
         validValueReal: /^(0\.[0-9]*|[1-9][0-9]*\.[0-9]*|[1-9][0-9]*)$/,

         // ([1-9][0-9]*) - целое число положительное

         errorsForm: {funcError: false },
         
         textErrorFunc: 'Функция введена не корректно',
         textErrorEpsilon: 'Размер ширины введён неверно',

         defaultLeft: -100,
         defaultRight: 100,
         objVariables: {'x' : { min: -100, max: 100, name: 'x'}},

         openFormResult: false,
         stringResult: '',
         resParam: {},
         result: {}
      }
   },
   mounted() {
      window.onresize = () => {
         this.width = document.documentElement.clientWidth;
         this.height = document.documentElement.clientHeight;
      };
   },
   methods: {
      clickButton() {
         let options = {
            func: this.functionString,
            params: this.objVariables, 
            eps: this.epsilon,
            onMultipleOpt: this.toggleOnMultipleOpt }
         
         let res = SimpleMethod(options)
         console.log(res)
         //this.openFormResult = true
         //this.result = res

         /*this.stringResult = 'f(';
         for(let index in res.ans) {
            this.resParam[index] = { value: math.round(res.ans[index], this.valuePrecision), index: index};
            this.stringResult += index + ',';
         } 
         this.stringResult = this.stringResult.substring(0, this.stringResult.length - 1) + ') = ' + math.round(res.value, this.valuePrecision);*/
      },
      /*
         TODO: поиск переменных функции при смене фокуса
      */
      funcFindVariable() {
         let result = this.functionString.match(/[^(\d)(!@#$%^&*()_+-/)]*|[^!@#$%^&*()_\d]*/g)
         result = Array.from(new Set(result.filter(Boolean)));
         let exception = ['cos','sin','tang','ctang','e','exp','log','pi']
         let res = result.reduce( (acc, item) => {
         if (!exception.includes(item)) acc.push(item); return acc;} , []);    
         
         let new_val = {}
         res.forEach(item => {
            new_val[item] = { min: this.defaultLeft, max: this.defaultRight, name: item }
         })  
         for(let item in new_val) {
            if(this.objVariables[new_val[item].name] != undefined) {
               new_val[item] = this.objVariables[new_val[item].name]
            }
         }
         this.objVariables = new_val
      }
   }
}
</script>

<style scoped>

form {
   width: 64%;
   margin: 0px auto;
   padding: 1vw 3vw 5vw 3vw;
   background: #fff;
   box-shadow: 0 0 5px rgba(0,0,0,0.5);
}

.small {
   flex-direction: column;
}

.group_col {
   display: flex;
   justify-content: flex-start;
   flex-direction: column;
}

.group_row_ {
   display: flex;
   justify-content: flex-start;
   align-items: center; 
}

.group_res {
   display: flex;
   align-items: flex-start;
   flex-direction: column;
}

.group_row_start {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   align-items: flex-start;
}

.component {
   margin-bottom: 20px;
}

.group_row_right {
   display: flex;
   align-items: center;
   justify-content: right;
}

.title_name {
   text-align: left;
   font-size: 20pt;
   font-weight: bold;
}

ul {
   list-style-type: none;
}

img {
   width: 50px;
   height: auto;
   margin-right: 15px;
}

.outputText, li { 
   font-size: 20px;
   color: rgba(0, 0, 0, 0.8);
}

@media (max-width: 350px) {
   form {
      min-width: 280px;
   }
}

@media (max-width: 650px) {
   form {
      width: 85%;
      padding: 1vw 10vw 10vw 10vw;
   }

   .component {
      margin: 0 0px 15px 0;
      width: 100%;
   }
}

@media (max-width: 900px) {
   form {
      width: 70%;
      padding: 1vw 10vw 10vw 10vw;
   }
}

@media (min-width: 1600px) and (max-width: 2000px) {
   .component {
      width: 300px;
   }
}
</style>