<template>
   <div class="form">
      <div class="label">
         <p class="nameOption">Выбрать метод</p>
         <img src="../assets/img/ArrowDownWhite.svg">
      </div>
      <div class="dropdown">
         <p class="option" v-for="item in listName" :key="item.item">{{ item.value }}</p>
      </div>
   </div>
</template>

<script>
export default {
   name: "formDropDownList",
   props: {
      listName: {
         type: Array,
         default() {
            return []
         }
      }
   },
   data() {
      return {
         select: ''
      }
   }
}
</script>

<style scoped>

.form {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 250px;
   margin: 0px;
}

.label {
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   background: #fa7014;
   width: 100%;

   border-radius: 10px 10px 0px 0px;
   border: 3px solid #fa7014;
}

.nameOption {
   background: #fa7014;

}

.dropdown {
   flex-direction: column;
   list-style-type: none;
   width: 100%;
   font-size: 16px;
   border: 3px solid #fa7014;
   border-radius: 0px 0px 10px 10px;
   cursor: pointer;
}

.dropdown::-webkit-scrollbar-thumb {
   width: 250px;  
}

.option {
   background: #fff;
   border: none;
   padding: 10px 20px;
   color: black;
   vertical-align: left;
   margin: 0px;
}

.option:hover {
   background: rgba(0,0,0,0.09);
}

</style>