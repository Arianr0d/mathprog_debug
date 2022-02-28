import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

function generate_point(options){
    let point = {};
    for (let key in options){
        point[key] = math.random(options[key].min, options[key].max)
    }
    return point;
}


function Monte_Karlo(options){
    let iterarions = options.iterations;
    let params = options.params;
    let func = options.func;


    let start = new Date().getTime();


    let x = generate_point(params);
    let value = math.evaluate(func, x);
    for (let t = 0; t < iterarions; t++){
        let dx = generate_point(params);
        let df = math.evaluate(func, dx);
        if (df < value) {
            value = df;
            x = dx;
        }
    }


    let end = new Date().getTime();


    let t = end - start;


    let result = {
        ans: x,
        value: value,
        time: t 
    } 
    
    return result;
}

export default Monte_Karlo;