<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <methodMonte_Carlo/>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue';
import methodMonte_Carlo from './views/methodMonte_Carlo.vue';

export default {
  name: 'App',
  components: {
    //HelloWorld,
    methodMonte_Carlo
  }
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
</style>
