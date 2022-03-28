<template>
   <form>
      <div class="group_col">
         <div class="group_row_">
            <img src="../assets/img/debug2.svg">
            <p class="title_name">Метод имитации отжига</p>
         </div>
         <formInput v-model:value="functionStringSA" :labelText="'Вид целевой функции'" :validate="validFuncString" :textError="textErrorFunc" @change="funcFindVariable" v-model:validError="errorsForm.funcError" :countWidth="100" :countWidthLine="100"/>
         <formInterval v-model:params="objVariablesSA"/>
         <div class="group_row_start" v-bind:class="{ small: (width <= 900)}">
            <div class="component">
               <formInput v-model:value="countPointSA" :labelText="'Число генерируемых точек'" :validate="validNumber_no_zero" :textError="textErrorVariable" :countWidth="100" :countWidthLine="99.95"/>
            </div>
            <div class="component">            
               <formInput v-model:value="countTemperatureSA" :labelText="'Температура'" :validate="validValueFloat" :textError="textErrorTemperature" :countWidth="100" :countWidthLine="99.95"/>
            </div>
            <div class="component">
               <formInput v-model:value="countReductionTempSA" :labelText="'Коэфициент снижения температуры'" :validate="validReductionTempSA" :textError="textErrorReductionTempSA" :countWidth="100" :countWidthLine="99.95"/>
            </div>
            <div class="component">
               <formInput v-model:value="epsilon" :labelText="'Окрестность для выбора точек'" :validate="validReductionTempSA" :textError="textErrorEpsilon" :countWidth="100" :countWidthLine="99.95"/>
            </div>
            <div class="component">
               <formRangeInput v-model:value="valuePrecisionSA" :minVal="0" :maxVal="15" :step="1" :id="'range2'"/>
            </div>
            <div class="component">
               <formInput style="visibility: hidden"/>
            </div>
         </div>
         <div class="group_row_right" v-bind:class="{ margin__button: (width <= 650) }">
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
import Simulated_annealing from '../functions/Simulated_annealing.js'
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

export default {
   name: "methodSimulatedAnnealing",
   components: {
      formInput,
      formButton,
      formRangeInput,
      formInterval
   },
   data() {
      return {
         width: document.documentElement.clientWidth,
         height: document.documentElement.clientHeight,

         functionStringSA: 'x^2',
         countPointSA: 100,
         countTemperatureSA: 1000000000,
         countReductionTempSA: 0.01,
         epsilon: 0.000001,
         valuePrecisionSA: 3,
         validNumber_no_zero: /^[1-9]\d*$/,
         validFuncString: /^.[^\s]*$/,
         validValueFloat: /^(0|[-]?[0-9]?[1-9]*[0-9]*.[0-9]|[-]?[1-9]*|[1-9][0-9]*)$/, 
         validReductionTempSA: /^(0|1|0\.[0-9]*)$/,

         errorsForm: {funcError: false },
         
         textErrorFunc: 'Функция введена не корректно',
         textErrorVariable: 'Количество точек должно быть целым',
         textErrorTemperature: 'Температура введена неверно',
         textErrorReductionTempSA: 'Коэффициент введён неверно',
         textErrorEpsilon: 'Размер окрестности введён неверно',

         defaultLeft: -100000000,
         defaultRight: 100000000,
         objVariablesSA: {'x' : { min: -100000000, max: 100000000, name: 'x'}},

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
         let options = {iterations: this.countPointSA, 
                        params: this.objVariablesSA, 
                        func: this.functionStringSA,
                        temperature: this.countTemperatureSA,
                        eps: this.epsilon,
                        r: this.countReductionTempSA }
         let res = Simulated_annealing(options)
         this.openFormResult = true;
         this.result = res;

         this.stringResult = 'f(';
         for(let index in res.ans) {
            this.resParam[index] = { value: math.round(res.ans[index], this.valuePrecisionSA), index: index};
            this.stringResult += index + ',';
         } 
         this.stringResult = this.stringResult.substring(0, this.stringResult.length - 1) + ') = ' + math.round(res.value, this.valuePrecisionSA);
      },
      /*
         TODO: поиск переменных функции при смене фокуса
      */
      funcFindVariable() {
         let result = this.functionStringSA.match(/[^(\d)(!@#$%^&*()_+-/)]*|[^!@#$%^&*()_\d]*/g)
         result = Array.from(new Set(result.filter(Boolean)));
         let exception = ['cos','sin','tang','ctang','e','exp','log','pi']
         let res = result.reduce( (acc, item) => {
         if (!exception.includes(item)) acc.push(item); return acc;} , []);    
         
         let new_val = {}
         res.forEach(item => {
            new_val[item] = { min: this.defaultLeft, max: this.defaultRight, name: item }
         })  
         for(let item in new_val) {
            if(this.objVariablesSA[new_val[item].name] != undefined) {
               new_val[item] = this.objVariablesSA[new_val[item].name]
            }
         }
         this.objVariablesSA = new_val
      }
   }
}
</script>

<style scoped>

form {
   margin: auto 15vw;
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

.margin__button {
   margin-top: -65px;
}

@media (max-width: 380px) {
   form {
      min-width: 280px;
   }
}

@media (max-width: 650px) {
   .component {
      margin: 0 0px 15px 0;
      width: 100%;
   }
}

@media (max-width: 900px) {
   form {
      margin: auto 7vw;
      padding: 1vw 5vw 5vw 5vw;
   }
}

</style>