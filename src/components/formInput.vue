<template>
   <div>
      <div class="group_rows">
         <input :value="value" @input="$emit('update:value', $event.target.value)" type="text">
         <label>{{ labelText }}</label>
      </div>
   </div>
</template>

<script>

export default {
   name:'formInput',
   props:['labelText','value'],
   emits:['update:value']
}
</script>

<style scoped>

.group_rows {
   position: relative;
   margin-bottom: 20px;
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

</style>
