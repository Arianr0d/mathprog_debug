<template>
   <div class="group">
      <div class="group_rows">
         <input :value="value" @input="funcValidate" @blur="$emit('change')" v-bind:class="{error: error}" type="text" v-bind:style="'--width:'+countWidth+'%'">
         <label>{{ labelText }}</label>
         <div v-if="reference" class="reference">
            <img src="../assets/img/question.svg">
            <span>{{ textTooltip }}</span>
         </div>
      </div>
      <a v-bind:style="'--width:'+countWidthLine+'%'"></a>
      <p v-if="error">{{ textError }}</p>
   </div>
</template>

<script>

export default {
   name:'formInput',
   props: {
      labelText: String,
      reference: {
         type: Boolean,
         default: false
      },
      validate: Boolean,
      textError: String,
      value: String,
      validError: Boolean,
      textTooltip: String,
      countWidth: String,
      countWidthLine: String
   },
   emits:['update:value', 'change', 'update:validError'],
   data() {
      return {
         error: false
      }
   },
   methods: {
      funcValidate(el) {
         this.error = !this.validate.test(el.target.value)
         this.$emit('update:value', el.target.value)
         this.$emit('validError', this.error)
      }
   }
}
</script>

<style scoped>

.group {
   position: relative;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
}

.group_rows {
   position: relative;
   display: flex;
   width: 100%;
}

.group_rows input {
   cursor: pointer;
   outline: none;
   display: block;
   background: rgba(0,0,0,0.07);
   border: solid 1px #f2f2f2;
   border-radius: 5px 5px 0px 0px;
   border-bottom-color: black;
   border-bottom-width: 1.5px;
   padding: 25px 15px 0px 15px;
   font-size: 20px;
   width: var(--width);
   height: 30px;
}

a {
   display: inline-block;
   color: transparent;
   text-decoration: none;
   position: relative;
   width: var(--width);
   margin-top: -2px;
}


a:after {
    display: block;
    content: "";
    background-color: #fa7014;
    height: 2px;
    width: 0%;
    left: 50%;
    position: absolute;
    -webkit-transition: width .4s ease-in-out;
    -moz--transition: width .4s ease-in-out;
    transition: width .4s ease-in-out;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    transform: translateX(-50%);
}

.group_rows:hover + a:after {
    width: 100%;
}


.group_rows input:hover {
   background: rgba(0,0,0,0.09);
}

.group_rows input:focus {
   outline:none;
   background: rgba(0,0,0,0.12);
   border-bottom-color: #fa7014;
   border-bottom-width: 2px;
}

.group_rows label {
   cursor: pointer;
   display: block;
   position: absolute;
   left: 15px;
   top: 5px;
   -webkit-transition: .2s;
   transition: .2s;
   font-size: 14px;
   color: rgba(0,0,0,0.65);
   padding: 0px;
}

.form-group_rows input:valid + label,
.form-group_rows input:focus + label {
  top: 0;
  font-size: 14px;
}

.reference {
   position: relative;
   display: inline-block;
   margin: -3px 0px 0px -16px;
   height: 27px;
   width: 30px;
}

img {
   height: 23px;
   width: auto;
}

.reference span {
   visibility: hidden;
   width: 135px;
   min-height: 28px;
   background-color: #555;
   color: #fff;
   font-size: 14px;
   text-align: center;
   padding: 5px 5px;
   border-radius: 6px;

   position: absolute;
   z-index: 1;
   top: -8px;
   left: 105%;
   /*bottom: 125%;
   left: 50%;*/
   margin-left: 10px;

   opacity: 0;
   transition: opacity 0.3s;
}

.reference span:after {
   content: "";
   position: absolute;
   top: 13px;
   right: 100%;
   margin-left: -6px;
   border-width: 6px;
   border-style: solid;
   border-color: transparent #555 transparent transparent;
}

.reference:hover span {
   visibility: visible;
   opacity: 1;
}

.reference:hover img {
   box-shadow: 0 0 7px rgba(0,0,0,0.7);
   border-radius: 60%;
}

.error {
   box-shadow: 0 0 11px red;
}

.group p {
   color: rgba(255, 0, 0, 0.7);
}
</style>
