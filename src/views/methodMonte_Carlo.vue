<template>
   <form>
      <div class="group_col">
         <p class="title_name">Метод Монте-Карло</p>
         <formInput v-model:value="functionString" :labelText="'Вид целевой функции'"/>
         <div class="group_row_between">
            <formInput v-model:value="countPoint" :labelText="'Число генерируемых точек'"/>
            <formInput v-model:value="countVariable" :labelText="'Количество переменных'"/>
            <formRangeInput v-model:value="valuePrecision" :minVal="0" :maxVal="20" :step="1" :id="'range1'"/>
         </div>
         <formSwitch v-model:value="switchOn" :labelText="'Добавить метод для дополнительного поиска'"/>
         <formDropDownList :listName="methodsName" :id="'listid'"/>
         <div class="group_row_right">
            <formButton :buttonText="'Рассчитать'" @click="funcClick"/>
         </div>
      </div>
   </form>
</template>

<script>
import formInput from '../components/formInput.vue'
import formButton from '../components/formButton.vue'
import formSwitch from '../components/formSwitch.vue'
import formRangeInput from '../components/formRangeInput.vue'
import formDropDownList from '../components/formDropDownList.vue'

export default{
   name: 'methodMonte_Carlo',
   components: {
      formInput,
      formButton,
      formSwitch,
      formRangeInput,
      formDropDownList
   },
   data() {
      return {
         methodsName: [
            {value: 'Монте-Карло', item: 1},
            {value: 'Имитация отжига', item: 2}
         ],
         functionString: '',
         countPoint: 100,
         countVariable: 2,
         valuePrecision: 3,
         switchOn: ''
      }
   },
   methods: {
      funcClick() {
         console.log(this.switchOn)
      },
      funcValidNumber(value) {
         let res = '/^[/d]$/';
         return res.test(value);
      }
   }
}
</script>

<style scoped>
@import "../assets/scss/function.scss";

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

.group_row_between {
   display: flex;
   align-items: center;
   justify-content: space-between;
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