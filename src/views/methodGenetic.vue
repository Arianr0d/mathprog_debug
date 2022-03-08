<template>
   <form>
      <div class="group_col">
         <div class="group_row_">
            <img src="../assets/img/debug2.svg">
            <p class="title_name">Генетический алгоритм</p>
         </div>
         <formInput v-model:value="functionString" :labelText="'Вид целевой функции'" :validate="validFuncString" :textError="textErrorFunc" @change="funcFindVariable" v-model:validError="errorsForm.funcError"/>
         <formInterval v-model:params="objVariables"/>
         <div class="group_row_start">
            <formInput v-model:value="countIteration" :labelText="'Число итераций'" :validate="validNumber_no_zero" :textError="textErrorNumber"/>
            <formInput v-model:value="sizeStartPopulation" :labelText="'Размер начальной популяции'" :validate="validNumber_no_zero" :textError="textErrorNumber"/>
            <formInput v-model:value="selectionFactor" :labelText="'Коэфициент отбора'" :validate="validZero_to_One" :textError="textErrorSelectionFactor"/>
         </div>
         <div class="group_row_start">
            <formInput v-model:value="crossProbability" :labelText="'Вероятность скрещивания'" :validate="validZero_to_One" :textError="textErrorProbability"/>
            <formInput v-model:value="mutationProbability" :labelText="'Вероятность мутации'" :validate="validZero_to_One" :textError="textErrorProbability"/>
            <div style="width: 275px">
               <formRangeInput v-model:value="valuePrecision" :minVal="0" :maxVal="15" :step="1" :id="'range3'"/>
            </div>
         </div>
         <div class="group_row_start">
            <div style="width: 275px">
               <formDropDownList v-model:checkOption="checkTypeCross" :listName="listTypeCross" :id="'list1'"/>
            </div>
         </div>
         <div class="group_row_right">
            <formButton :buttonText="'Рассчитать'" @click="clickButton"/>
         </div>
      </div>
   </form>
</template>

<script>
import formInput from '../components/formInput.vue'
import formInterval from '../components/formInterval.vue'
import formButton from '../components/formButton.vue'
import formRangeInput from '../components/formRangeInput.vue'
import formDropDownList from '../components/formDropDownList.vue'

export default {
   name: "methodGenetic",
   components: {
      formInput,
      formInterval,
      formButton,
      formRangeInput,
      formDropDownList
   },
   data() {
      return {
         functionString: 'x^2',
         countIteration: 1000,
         sizeStartPopulation: 100,
         selectionFactor: 0.25,
         crossProbability: 0.95,
         mutationProbability: 0.01,
         valuePrecision: 3,
         checkTypeCross: 'Тип скрещивания',
         listTypeCross: [
            {item: 1, value: 'Одноточечный'},
            {item: 2, value: 'Двуточечный'},
            {item: 3, value: 'Равномерный'}
         ],

         validNumber_no_zero: /^[1-9]\d*$/,
         validFuncString: /^.[^\s]*$/,
         validValueFloat: /^(0|[-]?[0-9]?[1-9]*[0-9]*.[0-9]|[-]?[1-9]*|[1-9][0-9]*)$/, 
         validZero_to_One: /^(0|1|0\.[0-9]*)$/,

         errorsForm: { funcError: false },
         
         textErrorFunc: 'Функция введена не корректно',
         textErrorNumber: 'Число должно быть целым',
         textErrorSelectionFactor: 'Коэффициент введён неверно',
         textErrorProbability: 'Вероятность введена неверно',

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
      clickButton() {

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
   align-items: center;
   margin-bottom: 20px;
}

.component {
   margin: 0 40px 10px 0;
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