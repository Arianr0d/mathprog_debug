<template>
   <router-link to="/">
      <button>Монте-Карло</button>
   </router-link>
   <router-link to="/methodsimulatedannealing">
      <button>Иммитация отжига</button>
   </router-link>
   <router-view/>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue';
//import methodMonte_Carlo from './views/methodMonte_Carlo.vue';

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
   border: none; 
   outline: none;
   background: white;
   margin: 0px 20px 10px 0px;
   padding: 10px 15px;
   font-size: 18px;
   color: rgba(0,0,0,0.8);
   cursor: pointer;
}

button:hover {
   color: white;
   box-shadow: 0 0 5px rgba(0,0,0,1);
   background: #fa7014;
}

button:active {
   box-shadow: 0 0 5px rgba(0,0,0,1);
   background: #DD6514;
}

</style>
