<template>
   <div class="form">
      <div class="label" :v-click-outside="funcOutside" :id="id" @click="funcOpen">
         <p class="nameOption">Выбрать метод</p>
         <div class="right_img">
            <img v-if="!openSelect" src="../assets/img/ArrowDownWhite.svg">
            <img v-else src="../assets/img/ArrowUpWhite.svg">
         </div>
      </div>
      <div v-if="openSelect" class="dropdown">
         <p class="option" v-for="item in listName" :key="item.item">{{ item.value }}</p>
      </div>
   </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
   name: "formDropDownList",
   props: {
      listName: {
         type: Array,
         default() {
            return []
         }
      },
      id: { type: String }
   },
   directives: {
      ClickOutside
   },
   data() {
      return {
         select: '',
         openSelect: false
      }
   },
   methods: {
      funcOpen() {
         this.openSelect = ! this.openSelect;
         if(this.openSelect) {
            document.getElementById(this.id).className += " label_after"
         }
         else {
            document.getElementById(this.id).className = " label"
         }
      },
      funcOutside() {
         if(this.openSelect) {
            this.openSelect = ! this.openSelect;
            document.getElementById(this.id).className += " label_after"
         }
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
   margin-bottom: 20px;
}

.label {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   width: 100%;
   height: 100%;
   border-radius: 10px;
   border: 3px solid #fa7014;
   cursor: pointer;
}

.label_after {
   border-radius: 10px 10px 0px 0px;
   border-bottom: none;
   transition: .6s;
}

.right_img {
   background: #fa7014;
   width: 55px;
}

img {
   margin-top: 20px;
}

.nameOption {
   margin-left: 40px;
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