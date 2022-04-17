import math from "./interval.js";

function genrange (options){
    let point = {};
    for (let key in options){
        point[key] = new math.IntervalType(options[key].min, options[key].max);
    }
    return point;
}

function wid(a){
    let point = undefined;
    for (let key in a){
        if (point == undefined || a[key].len() > point){
            point = a[key].len();
        }
    }
    return point;
}

function SimpleMethod(options){
    let params = options.params;
    let func = options.func;
    let e = options.eps;
    let range = genrange(params);
    let L = [range];
    let start = new Date().getTime();
    let p = L[0];
    while (wid(p) > e){
        L.shift();
        let maxind = undefined;
        for (let key in p){
            if (maxind == undefined || p[key].len() > p[maxind].len()){
                maxind = key;
            }
        }
        let point1 = {};
        let point2 = {};
        for (let key in p){
            if (key == maxind){
                let midle = math.evaluate('(x+y)/2',{x:p[key].left,y:p[key].right,});
                point1[key] = new math.IntervalType(p[key].left, midle);
                point2[key] = new math.IntervalType(midle, p[key].right);
                
            }
            else{
                point1[key] = p[key];
                point2[key] = p[key];
            }
        }
        L.push(point1);
        L.push(point2);
        L.sort(function (a, b) {
            return math.evaluate(func,a).left - math.evaluate(func,b).left;
          });
        p = L[0];
    }
    let end = new Date().getTime();


    let t = end - start;


    let result = {
        ans: p,
        value: math.evaluate(func,p),
        time: t 
    } 
    
    return result;
}

export default SimpleMethod;