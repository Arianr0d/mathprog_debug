<template>
   <div class="form">
      <div class="label" :id="id" @click="funcOpen" >
         <div v-bind:style="{openSelect: imgRotate}" class="textDirection">
            <p type="text">{{ checkOption }}</p>
         </div>
         <div class="right_img">
            <img src="../assets/img/ArrowDownWhite.svg">
         </div>
      </div>
      <div v-if="openSelect" class="dropdown">
         <div class="test"></div>
         <p class="option" v-for="item in listName" :key="item.item" 
         @click="funcCheckOption(item)">{{ item.value }}</p>
      </div>
   </div>
</template>

<script>

export default {
   name: "formDropDownList",
   props: ['listName','id','checkOption'],
   emits: ['update:checkOption'],
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
      funcCheckOption(value) {
         this.$emit('update:checkOption', value.value)

      }
   }

   /*
      ! проблема с поворотом изображения
   */
}
</script>

<style scoped>

.form {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   margin: 0px;
   margin-bottom: 20px;
}

.label {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   border-radius: 5px 5px 0px 0px;
   background: rgba(0,0,0,0.07);

   border: solid 1px rgba(0,0,0,0.0);
   border-bottom-color: black;
   border-bottom-width: 1.5px;

   width: 100%;
   height: 100%;
   cursor: pointer;
}

.textDirection {
   padding-left: 15px;
}

.label_after {
   border-bottom: none;
   transition: .6s;
}

.right_img {
   background: rgba(0,0,0,0.07);
   width: 55px;
}

.label:hover .right_img {
   background: rgba(0,0,0,0.15);
}

.right_img img + .imgRotate {
   transform: rotateX(180deg);
   margin-bottom: 5px;
}

img {
   transform-style: preserve-3d;
   transition: .7s ease-in-out;
   margin-top: 20px;
}

.dropdown {
   text-align: left;
   flex-direction: column;
   list-style-type: none;
   width: 100%;
   font-size: 16px;
   cursor: pointer;
   border: 1px solid rgba(0,0,0,0.0);
   border-top: 1px solid rgba(0,0,0,0.07);
   background: rgba(0,0,0,0.07);
   transition: .4s ease-in-out;
}

.dropdown::-webkit-scrollbar-thumb {
   width: 250px;  
}

.option {
   background: rgba(0,0,0,0.0);
   border: none;
   padding: 10px 15px;
   color: black;
   vertical-align: left;
   margin: 0px;
}

.option:hover {
   background: rgba(0,0,0,0.09);
   color: #FFFEFE;
}
.test::before {
   content: '';
}
</style>