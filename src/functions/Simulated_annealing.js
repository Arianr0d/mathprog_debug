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
function generate_point_in_eps(pred_point, eps){
    let point = {};
    for (let key in pred_point){
        point[key] = math.random(pred_point[key]-eps, pred_point[key]+eps)
    }
    return point;
}

function Simulated_annealing(options){
    let iterarions = options.iterations;
    let temperature = options.temperature;
    let params = options.params;
    let func = options.func;
    let eps = options.eps;
    let r = options.r;

    let start = new Date().getTime();

    let x = generate_point(params)
    let value = math.evaluate(func, x);
    while (temperature > 1){
        for(let l = 0 ; l < iterarions; l++){
            let dx = generate_point_in_eps(x,eps);
            let df = math.evaluate(func, dx);
            if (df < value) {
                x = dx;
                value = df;
            }
            else{
                let k = math.evaluate('e^(-d/T)', {d:(df - value), T:temperature});
                let q = math.random(0,1);
                if(k > q) {
                    x = dx;
                    value = df;
                }
            }
        }
        temperature = temperature - r.temperature;
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

export default Simulated_annealing;