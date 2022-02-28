<template>
   <div>
      <button type="button">{{ buttonText }}</button>
   </div>
</template>

<script>

export default {
   name: "formButton",
   props: {
      buttonText: { type: String }
   }
}
</script>

<style scoped>

button {
   padding: 10px 20px;
   border-radius: 4px;
   border: none;
   cursor: pointer;

   background: #fa7014;
   color: #fff;
   box-shadow: 0 0 5px rgba(0,0,0,0.5);
   font-size: 18px;
   font-weight: bold;
}

button:hover {
   box-shadow: 0 0 5px rgba(0,0,0,0.8);
}

button:active {
   box-shadow: 0 0 5px rgba(0,0,0,1);
   background: #DD6514;
}

</style>