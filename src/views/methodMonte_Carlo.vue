<template>
   <form>
      <div class="group_col">
         <div class="group_row_">
            <img src="../assets/img/debug2.svg">
            <p class="title_name">Метод Монте-Карло</p>
         </div>
         <formInput v-model:value="functionString" :labelText="'Вид целевой функции'" :validate="validFuncString" :textError="textErrorFunc" @change="funcFindVariable" v-model:validError="errorsForm.funcError" :countWidth="100" :countWidthLine="100"/>
         <formInterval v-model:params="objVariables"/>
         <div class="group_row_start" v-bind:class="{ small: (width <= 900)}">
            <div class="component">
               <formInput v-model:value="countPoint" :labelText="'Число генерируемых точек'" :validate="validNumber_no_zero" :textError="textErrorVariable" :countWidth="100" :countWidthLine="99.95"/>
            </div>
            <div class="component">
               <formRangeInput v-model:value="valuePrecision" :minVal="0" :maxVal="15" :step="1" :id="'range1'"/>
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
         width: document.documentElement.clientWidth,
         height: document.documentElement.clientHeight,

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
   mounted() {
      window.onresize = () => {
         this.width = document.documentElement.clientWidth;
         this.height = document.documentElement.clientHeight;
      };
   },
   methods: {
      // поиск переменных функции
      clickButton() {
         let options = {iterations: this.countPoint, params: this.objVariables, func: this.functionString}
         let res = Monte_Karlo(options)
         this.openFormResult = true;
         this.result = res;

         this.stringResult = 'f(';
         for(let index in res.ans) {
            this.resParam[index] = { value: math.round(res.ans[index], this.valuePrecision), index: index};
            this.stringResult += index + ',';
         } 
         this.stringResult = this.stringResult.substring(0, this.stringResult.length - 1) + ') = ' + math.round(res.value, this.valuePrecision);
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

</style>