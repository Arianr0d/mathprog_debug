<template>
   <form>
      <div class="group_col">
         <p class="title_name">Метод имитации отжига</p>
         <formInput v-model:value="functionStringSA" :labelText="'Вид целевой функции'" :validate="validFuncString" :textError="textErrorFunc" @change="funcFindVariable" v-model:validError="errorsForm.funcError"/>
         <formInterval v-model:params="objVariablesSA"/>
         <div class="group_row_start">
            <formInput v-model:value="countPointSA" :labelText="'Число генерируемых точек'" :validate="validNumber_no_zero" :textError="textErrorVariable"/>
            <formInput v-model:value="countTemperatureSA" :labelText="'Температура'" :validate="validValueFloat" :textError="textErrorTemperature"/>
            <formInput v-model:value="countReductionTempSA" :labelText="'Коэфициент снижения температуры'" :validate="validReductionTempSA" :textError="textErrorReductionTempSA"/>
            <formRangeInput v-model:value="valuePrecisionSA" :minVal="0" :maxVal="20" :step="1" :id="'range2'"/>
         </div>
         <div class="group_row_right">
            <formButton :buttonText="'Рассчитать'" @click="clickButton"/>
         </div>
      </div>
   </form>
</template>

<script>
import formInput from '../components/formInput.vue'
import formButton from '../components/formButton.vue'
import formRangeInput from '../components/formRangeInput.vue'
import formInterval from '../components/formInterval.vue'

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
         functionStringSA: 'x^2',
         countPointSA: 100,
         countTemperatureSA: 1000000000,
         countReductionTempSA: 0.01,
         valuePrecisionSA: 3,
         validNumber_no_zero: /^[1-9]\d*$/,
         validFuncString: /^.[^\s]*$/,
         validValueFloat: /^(0|[-]?[0-9][1-9]*\.[0-9]*|[-]?[1-9]*)$/, 
         validReductionTempSA: /^(0|1|0\.[0-9]*)$/,

         errorsForm: {funcError: false },
         
         textErrorFunc: 'Функция введена не корректно',
         textErrorVariable: 'Количество точек должно быть целым',
         textErrorTemperature: 'Температура введена неверно',
         textErrorReductionTempSA: 'Коэффициент введён неверно',

         defaultLeft: -100000000,
         defaultRight: 100000000,
         objVariablesAS: {'x' : { min: -100000000, max: 100000000, name: 'x'}},
      }
   },
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

.group_row_start {
   display: flex;
   justify-content: space-between;
   align-items: flex-start;
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

</style>