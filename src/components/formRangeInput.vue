<template>
   <div class="group_row">
      <div class="group_col">
         Число знаков после запятой: <span v-text="valueInput"></span>
      </div>
      <input v-model="valueInput" type="range" class="rangeInput" :min="minVal" :max="maxVal" step="1" id="range">
   </div>   
</template>

<script>
export default {
   name: "formRangeInput",
   props: {
      minVal: { type: Number },
      maxVal: { type: Number }
   },
   data() {
      return {
         valueInput: Math.round((this.maxVal - this.minVal + 1) * 0.25, 0)
      }
   },
   watch: {
      valueInput: function(value) {
         let val = Math.round((value * 100.0) / (this.maxVal - this.minVal + 1), 0);
         document.getElementById("range").style.background = '-webkit-linear-gradient(left, #fa7014 0%, #fa7014 '+val+'%, #fff '+val+'%, #fff 100%)'
      }
   }
}
</script>

<style scoped>

.group_row {
   display: flex;
   align-items: flex-start;
   flex-direction: column;
   margin-bottom: 20px;
}

.group_col {
   margin: 0px 0px 10px 5px;
}

.rangeInput {
   -webkit-appearance: none;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   width: 250px;
   height: 10px;
   background: -webkit-linear-gradient(left, #fa7014 0%, #fa7014 25%, #fff 25%, #fff 100%);
   cursor: pointer;
   transition: .4s;
}

.rangeInput::-webkit-slider-thumb {
   -webkit-appearance: none;
   background: #d4d4d4;
   width: 20px;
   height: 20px;
   border-radius: 100%;
   cursor: pointer;
   box-shadow: 0 0 5px rgba(0,0,0,0.5);
}

.rangeInput::-webkit-slider-thumb:hover,
.rangeInput::-webkit-slider-thumb:active {
   width: 24px;
   height: 24px;
}

</style>