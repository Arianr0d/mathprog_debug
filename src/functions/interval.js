import { create, factory, all } from 'mathjs'
const math = create(all)


const createInterval = factory('IntervalType', ['typed'], ({ typed }) => {
  // create a new data type
  function IntervalType (left, right) {
    this.left = left
    this.right = right
  }
  IntervalType.prototype.isInterval = true
  IntervalType.prototype.contain = function (el) {
    return ( el > this.left && el < this.right);
  }
  IntervalType.prototype.len = function () {
    return (this.right - this.left);
  }
  IntervalType.prototype.toString = function () {
    return '[ ' + this.left + '; ' + this.right + ']';
  }
  IntervalType.prototype.toString = function (pres) {
    return '[ ' + math.round(this.left, pres) + '; ' + math.round(this.right, pres) + ']';
  }
  // define a new data type with typed-function
  typed.addType({
    name: 'IntervalType',
    test: function (x) {
      // test whether x is of type CustomValue
      return x && x.isInterval === true
    }
  })

  return IntervalType
})
const createAddInterval = factory('add', ['typed', 'IntervalType'], ({ typed, IntervalType }) => {
  return typed('add', {
    'IntervalType, IntervalType': function (a, b) {
      return new IntervalType(a.left + b.left, a.right + b.right)
    },
    'IntervalType, number': function (a, b) {
      return new IntervalType(a.left + b, a.right + b)
    },
    'number, IntervalType': function (b, a) {
      return new IntervalType(a.left + b, a.right + b)
    }
  })
})
const createMultiplyInterval = factory('multiply', ['typed', 'IntervalType'], ({ typed, IntervalType }) => {
  return typed('multiply', {
    'IntervalType, IntervalType': function (a, b) {
      let arr = [a.left*b.left, a.right*b.left, a.left*b.right, a.right*b.right]
      return new IntervalType(math.min(arr), math.max(arr))
    },
    'IntervalType, number': function (a, b) {
      let arr = [a.left*b, a.right*b]
      return new IntervalType(math.min(arr), math.max(arr))
    },
    'number, IntervalType': function (b, a) {
      let arr = [a.left*b, a.right*b]
      return new IntervalType(math.min(arr), math.max(arr))
    },
  })
})
const createSubtractInterval = factory('subtract', ['typed', 'IntervalType'], ({ typed, IntervalType }) => {
  return typed('subtract', {
    'IntervalType, IntervalType': function (a, b) {
      return new IntervalType(a.left-b.right, b.right-a.left)
    },
    'IntervalType, number': function (a, b) {
      return new IntervalType(a.left - b, a.right - b)
    },
    'number, IntervalType': function (b, a) {
      return new IntervalType(a.left - b, a.right - b)
    }
  })
})
const createDivideInterval = factory('divide', ['typed', 'IntervalType'], ({ typed, IntervalType }) => {
  return typed('divide', {
    'IntervalType, IntervalType': function (a, b) {
      let znam = new IntervalType(math.divide(1,b.right), math.divide(1,b.left));
      if (b.contain(0)){
        znam = new IntervalType(math.divide(-1,0), math.divide(1,0));
      }
      if (b.left == 0){
        znam = new IntervalType(math.divide(1,b.right), math.divide(1,b.left));
      }
      if (b.right == 0){
        znam = new IntervalType(math.divide(-1,b.right), math.divide(1,b.left));
      }
      let arr = [a.left*znam.left, a.right*znam.left, a.left*znam.right, a.right*znam.right]
      return new IntervalType(math.min(arr), math.max(arr))
    },
    'IntervalType, number': function (a, b) {
      let arr = [a.left/b, a.right/b]
      return new IntervalType(math.min(arr), math.max(arr))
    },
    'number, IntervalType': function (a2, b) {
      let a = new IntervalType(a2,a2);
      let znam = new IntervalType(math.divide(1,b.right), math.divide(1,b.left));
      if (b.contain(0)){
        znam = new IntervalType(math.divide(-1,0), math.divide(1,0));
      }
      if (b.left == 0){
        znam = new IntervalType(math.divide(1,b.right), math.divide(1,b.left));
      }
      if (b.right == 0){
        znam = new IntervalType(math.divide(-1,b.right), math.divide(1,b.left));
      }
      let arr = [a.left*znam.left, a.right*znam.left, a.left*znam.right, a.right*znam.right]
      return new IntervalType(math.min(arr), math.max(arr))
    },
  })
})
const createSinInterval = factory('sin', ['typed', 'IntervalType'], ({ typed, IntervalType }) => {
  return typed('sin', {
    'IntervalType': function (a) {
      let len = a.len()
      if ( len >= 2*math.pi){
        return new IntervalType(-1,1);
      }
      let l = a.left/math.pi;
      let r = a.right/math.pi;
      let li = math.ceil(l);
      if (li > r){
        let arr = [math.sin(a.left), math.sin(a.right)]
        return new IntervalType(math.min(arr), math.max(arr))
      }
      if (li < r && (li+1) > r){
        let dop = 1;
        if (li%2 == 1) dop = -1;
        let arr = [math.sin(a.left), math.sin(a.right), dop]
        return new IntervalType(math.min(arr), math.max(arr))
      }
      if ((li+1)< r){
        return new IntervalType(-1,1);
      }
      return new IntervalType(-1,1);
    }
  })
})
const createCosInterval = factory('cos', ['typed', 'IntervalType'], ({ typed, IntervalType }) => {
  return typed('cos', {
    'IntervalType': function (a) {
      let len = a.len()
      if ( len >= 2*math.pi){
        return new IntervalType(-1,1);
      }
      let l = a.left/math.pi;
      let r = a.right/math.pi;
      let li = math.ceil(l);
      if ((li+ 0.5) > r){
        let arr = [math.cos(a.left), math.cos(a.right)]
        return new IntervalType(math.min(arr), math.max(arr))
      }
      if ((li+ 0.5) < r && (li+1.5) > r){
        let dop = 1;
        if (li%2 == 1) dop = -1;
        let arr = [math.cos(a.left), math.cos(a.right), dop]
        return new IntervalType(math.min(arr), math.max(arr))
      }
      if ((li+1)< r){
        return new IntervalType(-1,1);
      }
      return new IntervalType(-1,1);
    }
  })
})
const createTgInterval = factory('tan', ['typed', 'IntervalType'], ({ typed, IntervalType }) => {
  return typed('tan', {
    'IntervalType': function (a) {
      let len = a.len()
      if ( len >= math.pi){
        return new IntervalType(math.divide(-1,0),math.divide(1,0));
      }  
      let ld = math.tan(a.left);
      let rd = math.tan(a.right);
      let l = a.left/math.pi;
      let r = a.right/math.pi;
      let li = math.ceil(l-0.5);
      if (li+0.5 <= r){
        if ((l-0.5)%1 == 0){
            ld = math.divide(-1,0)
            if (l == r) rd = ld;
        }
        if ((r-0.5)%1 == 0){
            rd = math.divide(1,0)
            if (l == r) ld = rd;
        }    
        let arr = [ld, rd]
        return new IntervalType(math.min(arr), math.max(arr))
      }
      return new IntervalType(math.divide(-1,0),math.divide(1,0));
    }
  })
})
const createCtgInterval = factory('cot', ['typed', 'IntervalType'], ({ typed, IntervalType }) => {
  return typed('cot', {
    'IntervalType': function (a) {
      let len = a.len()
      if ( len >= math.pi){
        return new IntervalType(math.divide(-1,0),math.divide(1,0));
      }  
      let ld = math.cot(a.left);
      let rd = math.cot(a.right);
      let l = a.left/math.pi;
      let r = a.right/math.pi;
      let li = math.ceil(l-0.5);
      if (li <= r){
        if ((l)%1 == 0){
            ld = math.divide(-1,0)
            if (l == r) rd = ld;
        }
        if ((r)%1 == 0){
            rd = math.divide(1,0)
            if (l == r) ld = rd;
        }    
        let arr = [ld, rd]
        return new IntervalType(math.min(arr), math.max(arr))
      }
      return new IntervalType(math.divide(-1,0),math.divide(1,0));
    }
  })
})
const createExpInterval = factory('exp', ['typed', 'IntervalType'], ({ typed, IntervalType }) => {
  return typed('exp', {
    'IntervalType': function (a) {
      return new IntervalType(math.exp(a.left), math.exp(a.right))
    }
  })
})
const createPowInterval = factory('pow', ['typed', 'IntervalType'], ({ typed, IntervalType }) => {
  return typed('pow', {
    'IntervalType, number': function (a, b) {
      if (a.contain(0)){
        if (b%1 == 0){
          let arr = [math.pow(a.left, b), math.pow(a.right, b), 0];
          return new IntervalType(math.min(arr), math.max(arr));
        }
        else{
          return new IntervalType(0, math.pow(a.right, b));
        }
      }else{
        if (a.right < 0){
          if (b%1 == 0){
            let arr = [math.pow(a.left, b), math.pow(a.right, b)];
            return new IntervalType(math.min(arr), math.max(arr));
          }
          else{
            return new IntervalType(undefined, undefined);
          }
        }
        else{
            let arr = [math.pow(a.left, b), math.pow(a.right, b)];
            return new IntervalType(math.min(arr), math.max(arr));
        }
      }
    }
  })
})


math.import([
  createInterval,
  createAddInterval,
  createMultiplyInterval,
  createSubtractInterval,
  createDivideInterval,
  createSinInterval,
  createCosInterval,
  createTgInterval,
  createCtgInterval,
  createExpInterval,
  createPowInterval
])

export default math;