<template>
   <form>
      <div class="group_col">
         <p class="title_name">Метод Монте-Карло</p>
         <formInput :labelText="'Вид целевой функции'" :labelId="lab" v-model:value="functionString"/>
         <div class="group_row_between">
            <formInput :labelText="'Число генерируемых точек'" :labelId="'lab1'" :inputValue="100"/>
            <formInput :labelText="'Количество переменных'" :labelId="lab2" :inputValue="2"/>
            <formRangeInput :minVal="0" :maxVal="20"/>
         </div>
         <formSwitch :labelText="'Добавить метод для дополнительного поиска'"/>
         <formDropDownList :listName="methodsName"/>
         <div class="group_row_right">
            <formButton :buttonText="'Рассчитать'"/>
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
         functionString: ''
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