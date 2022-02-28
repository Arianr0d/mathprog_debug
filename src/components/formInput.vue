<template>
   <div class="group">
      <div class="group_rows">
         <input :value="value" @input="funcValidate" @blur="funcFindVariable" type="text">
         <label>{{ labelText }}</label>
      </div>
      <p v-if="error">{{ textError }}</p>
   </div>
</template>

<script>

export default {
   name:'formInput',
   props:['labelText','validate','textError','value'],
   emits:['update:value'],
   data() {
      return {
         error: false
      }
   },
   methods: {
      funcValidate(el) {
         if(this.validate.test(el.target.value)) {
            this.$emit('update:value', el.target.value)
            el.target.className = " .group_rows input"
            this.error = false
         }
         else {
            el.target.className = " error"
            el.target.value = ''
            this.error = true
            this.$emit('update:value', '')
         }
      },
      /*
         TODO: поиск переменных функции при смене фокуса
      */
      funcFindVariable(el) {
         let result = el.target.value.match(/[^(\d)(!@#$%^&*()_+-/)]*|[^!@#$%^&*()_\d]*/g)
         result = Array.from(new Set(result.filter(Boolean)));
         let exception = ['cos','sin','tang','ctang','e','exp','log','pi']
         let res = result.reduce( (acc, item) => {
         if (!exception.includes(item)) acc.push(item); return acc;} , []);      
         console.log(res);
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
   margin-bottom: 20px;
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
   width: 100%;
   height: 30px;
}

.group_rows input:hover {
   background: rgba(0,0,0,0.09);
}

.group_rows input:focus {
   outline:none;
   background: rgba(0,0,0,0.12);
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

.error {
   box-shadow: 0 0 11px red;
}

.group p {
   color: rgba(255, 0, 0, 0.7);
}
</style>
