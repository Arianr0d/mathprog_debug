<template>
   <form>
      <div class="group_col">
         <div class="group_row_start">
            <img src="../assets/img/debug2.svg">
            <p class="title_name">Метод Монте-Карло</p>
         </div>
         <formInput v-model:value="functionString" :labelText="'Вид целевой функции'" :validate="validFuncString" :textError="textErrorFunc" @change="funcFindVariable" v-model:validError="errorsForm.funcError"/>
         <formInterval v-model:params="objVariables"/>
         <div class="group_row_start">
            <div class="component">
               <formInput v-model:value="countPoint" :labelText="'Число генерируемых точек'" :validate="validNumber_no_zero" :textError="textErrorVariable"/>
            </div>
            <div class="component">
               <formRangeInput v-model:value="valuePrecision" :minVal="0" :maxVal="20" :step="1" :id="'range1'"/>
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
import Monte_Karlo from '../functions/Monte-Karlo.js'
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

export default{
   name: 'methodMonte_Carlo',
   components: {
      formInput,
      formButton,
      formRangeInput,
      formInterval
   },
   data() {
      return {
         functionString: 'x^2',
         countPoint: 100,
         valuePrecision: 3,
         validNumber_no_zero: /^[1-9]\d*$/,
         validFuncString: /^.[^\s]*$/,

         errorsForm: {funcError: false },
         
         textErrorFunc: 'Функция введена не корректно',
         textErrorVariable: 'Количество точек должно быть целым',

         defaultLeft: -100000000,
         defaultRight: 100000000,
         objVariables: {'x' : { min: -100000000, max: 100000000, name: 'x'}},

         openFormResult: false,
         stringResult: '',
         resParam: {},
         result: {}
      }
   },
   methods: {
      // поиск переменных функции
      clickButton() {
         let options = {iterations: this.countPoint, params: this.objVariables, func: this.functionString}
         let res = Monte_Karlo(options)
         console.log(res.xxx)
         this.openFormResult = true;
         this.result = res;

         console.log(res)
         this.stringResult = 'f(';
         for(let index in res.ans) {
            this.resParam[index] = { value: math.round(res.ans[index], this.valuePrecision), index: index};
            this.stringResult += index + ',';
         } 
         this.stringResult = this.stringResult.substring(0, this.stringResult.length - 1) + ') = ' + math.round(res.value, this.valuePrecision);
         console.log(this.stringResult);
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
         console.log(this.objVariables)
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

.group_col {
   display: flex;
   justify-content: flex-start;
   flex-direction: column;
}

.group_res_center {
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
}

.group_res {
   display: flex;
   align-items: flex-start;
   flex-direction: column;
}

.group_row_start {
   display: flex;
   justify-content: flex-start;
   align-items: center;
}

.component {
   margin: 0 20px 10px 0;
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

</style>