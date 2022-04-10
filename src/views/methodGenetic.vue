<template>
   <form>
      <div class="group_col">
         <div class="group_row_">
            <img src="../assets/img/debug2.svg">
            <p class="title_name">Генетический алгоритм</p>
         </div>
         <formInput v-model:value="functionString" :labelText="'Вид целевой функции'" :validate="validFuncString" :textError="textErrorFunc" @change="funcFindVariable" v-model:validError="errorsForm.funcError" :countWidth="100" :countWidthLine="100"/>
         <formInterval v-model:params="objVariables"/>
         <div class="group_row_start">
               <div class="component"> 
                  <formInput v-model:value="countIteration" :labelText="'Число итераций'"  :validate="validNumber_no_zero" :textError="textErrorNumber"
                  :reference="true"
                  :visible_ref = "false"
                  :countWidth="100" :countWidthLine="96.6"/>
               </div>
               <div class="component"> 
                  <formInput v-model:value="sizeStartPopulation" :labelText="'Размер начальной популяции'" 
                  :visible_ref = "false"
                  :reference="true"
                  :validate="validNumber_no_zero"   :textError="textErrorNumber" :countWidth="100" :countWidthLine="96.6"/>
               </div>
               <div class="component"> 
                  <formInput v-model:value="selectionFactor" :labelText="'Коэфициент отбора'" :validate="validZero_to_One" :textError="textErrorSelectionFactor" :reference="true" :textTooltip="toolTipSelectCoef" :countWidth="90" :countWidthLine="95.65"/>
               </div>
               <div class="component"> 
                  <formInput v-model:value="crossProbability" :labelText="'Вероятность скрещивания'" :validate="validZero_to_One" :textError="textErrorProbability" :reference="true" :textTooltip="toolTipCrossChance" :countWidth="90" :countWidthLine="95.65"/>
               </div>
               <div class="component"> 
                  <formInput v-model:value="mutationProbability" :labelText="'Вероятность мутации'" :validate="validZero_to_One" :textError="textErrorProbability" :reference="true" :textTooltip="toolTipMutationChance" :countWidth="90" :countWidthLine="95.65"/>
               </div>
               <div class="component">   
                  <formRangeInput v-model:value="valuePrecision" :minVal="0" :maxVal="15" :step="1" :id="'range3'" style="width: 288px"/>
               </div>
            </div>
         <div class="group_row_start">
            <div class="component"> 
               <formDropDownList v-model:checkOption="checkTypeCross" :listName="listTypeCross" :id="'list1'" v-bind:class="{ widthDiv : (width > 650)}"/>
            </div>
            <div class="component"> 
               <formInput v-if="checkTypeCross == 'Равномерный'" v-model:value="byteProbability" :labelText="'Вероятность наследования бита'" :validate="validZero_to_One" :textError="textErrorProbability" :reference="true" :textTooltip="toolTipByteProbability" :countWidth="90" :countWidthLine="95.55"/>
            </div>
         </div>
         <div class="group_row_start">
            <div class="component">          
               <formSwitch v-model:value="toggleTypeElit" :labelText="'Добавить элиты'" style="margin-top: 10px"/>
            </div>
            <div class="component"> 
               <formInput v-if="toggleTypeElit" v-model:value="percentElit" :labelText="'% элит'" :validate="validZero_to_One" :textError="textErrorPercent" :reference="true" :textTooltip="toolTipPercentElit" :countWidth="90" :countWidthLine="95.65"/>
            </div> 
         </div>
         <div v-if="toggleTypeElit" class="group_row_start">
            <div class="component">          
               <formSwitch v-model:value="toggleTypeParthenogenes" :labelText="'Добавить партеногенез'" style="margin-top: 10px"/>
            </div>
            <div class="component"> 
               <formInput v-if="toggleTypeParthenogenes" v-model:value="mutatElitProbability" :labelText="'Вероятность мутации гена элиты'" :validate="validZero_to_One" :textError="textErrorPercent" :reference="true" :textTooltip="toolTipMutationChanceEP" :countWidth="90" :countWidthLine="95.65"/>
            </div>
            <div class="component"> 
               <formInput v-if="toggleTypeParthenogenes" v-model:value="countMutatGen" :labelText="'Число мутируемых генов'" :validate="validNumber_no_zero" :textError="textErrorNumber" :reference="true" :textTooltip="toolTipMutationGenCount" :countWidth="90" :countWidthLine="95.65"/>
            </div>
         </div>
         <div class="group_row_right">
            <formButton :buttonText="'Рассчитать'" @click="clickButton"/>
         </div>
      </div>
      <div v-if="loading">
         <formLoader/>
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
import GeneticALg from '../functions/GeneticAlgorithm.js'
import formInput from '../components/formInput.vue'
import formInterval from '../components/formInterval.vue'
import formButton from '../components/formButton.vue'
import formRangeInput from '../components/formRangeInput.vue'
import formDropDownList from '../components/formDropDownList.vue'
import formSwitch from '../components/formSwitch.vue'
import formLoader from '../components/formLoader.vue'

import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

export default {
   name: "methodGenetic",
   components: {
      formInput,
      formInterval,
      formButton,
      formRangeInput,
      formDropDownList,
      formSwitch,
      formLoader
   },
   data() {
      return {
         width: document.documentElement.clientWidth,
         height: document.documentElement.clientHeight,

         functionString: 'x^2',
         countIteration: 1000,
         sizeStartPopulation: 100,
         selectionFactor: 0.25,
         crossProbability: 0.95,
         mutationProbability: 0.01,
         valuePrecision: 3,
         checkTypeCross: 'Одноточечный',
         listTypeCross: [
            {item: 1, value: 'Одноточечный'},
            {item: 2, value: 'Двуточечный'},
            {item: 3, value: 'Равномерный'}
         ],
         byteProbability: 0.5,
         toggleTypeElit: false,
         toggleTypeParthenogenes: false,
         percentElit: 0.1,
         mutatElitProbability: 0.5,
         countMutatGen: 1,

         validNumber_no_zero: /^[1-9]\d*$/,
         validFuncString: /^.[^\s]*$/,
         validValueFloat: /^(0|[-]?[0-9]?[1-9]*[0-9]*.[0-9]|[-]?[1-9]*|[1-9][0-9]*)$/, 
         validZero_to_One: /^(0|1|0\.[0-9]*)$/,

         errorsForm: { funcError: false },
         
         textErrorFunc: 'Функция введена не корректно',
         textErrorNumber: 'Число должно быть натуральным',
         textErrorSelectionFactor: 'Коэффициент введён неверно',
         textErrorProbability: 'Вероятность введена неверно',
         textErrorPercent: 'Процент введён неверно',

         toolTipSelectCoef: "Доля наиболее приспособленных особей, которая даст потомство.",
         toolTipCrossChance: "Вероятность, с которой будет проводиться скрещивание особей.",
         toolTipMutationChance: "Вероятность, с которой будет мутирован один случайный ген каждой особи.",
         toolTipByteProbability: "Вероятность, с которой бит 1 родителя будет передоваться 1 потомку.",
         toolTipPercentElit: "Доля наиболее приспособленных особей из числа тех, что прошли размножение, которая перейдёт в новую популяцию без изменения.",
         toolTipMutationChanceEP: "Вероятность, с которой будет мутироваться 1 случайный ген клона элиты.",
         toolTipMutationGenCount: "Число генов, которые будут подвергаться мутированию с заданной вероятностью клона элиты.",

         loading: true,
         defaultLeft: -100,
         defaultRight: 100,
         objVariables: {'x' : { min: -100, max: 100, name: 'x'}},

         openFormResult: false,
         stringResult: '',
         resParam: {},
         result: {}
      }
   },
   watch: {
      toggleTypeElit(new_val) {
         if(!new_val) {
            this.toggleTypeParthenogenes = false
         }
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
            Func: this.functionString,
            Params: this.objVariables,
            Iteraions: this.countIteration,
            StartSize: this.sizeStartPopulation,
            SelectCoef: this.selectionFactor,
            CrossChance: this.crossProbability,
            MutationChance: this.mutationProbability,
            CrossType: this.checkTypeCross,
            Bchance: this.byteProbability, 
            Elits: this.toggleTypeElit,
            ElitsCoef: this.percentElit,
            ElitsP: this.toggleTypeParthenogenes,
            MutationChanceEP: this.byteProbability,
            MutationGenCount: this.countMutatGen,
            pres: this.valuePrecision
         }

         let res =  GeneticALg(options)
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
      },
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
   justify-content: space-between;
   flex-wrap: wrap;
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

.widthDiv {
   width: 275px
}

@media (max-width: 350px) {
   form {
      min-width: 350px;
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