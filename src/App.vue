<template>
   <router-link to="/">
      <button>Монте-Карло</button>
   </router-link>
   <router-link to="/methodsimulatedannealing">
      <button>Имитация отжига</button>
   </router-link>
   <router-link to="/methodgenetic">
      <button>Генетический алгоритм</button>
   </router-link>
   <router-link to="/methodinterval">
      <button>Интервальный алгоритм</button>
   </router-link>
   <router-view/>
</template>

<script>

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
   margin: 0px 20px 10px 20px;
   padding: 10px 15px;
   font-size: 18px;
   color: rgba(0,0,0,0.8);
   cursor: pointer;
   user-select: none;
}

button:hover {
   color: white;
   box-shadow: 0 0 5px rgba(0,0,0,1);
   background: #fa7014;
}

a.router-link-active button,
button:active {
   color: white;
   box-shadow: 0 0 5px rgba(0,0,0,1);
   background: #DD6514;
}

</style>
