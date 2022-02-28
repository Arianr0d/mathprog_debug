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
function local(options){
    
    return options;
}

function Monte_Karlo(options){
    let iterarions = options.iterations;
    let params = options.params;
    let func = options.func;
    let ready = options.ready;
    let count = options.count;
    let isLocal = options.local;
    if (isLocal == undefined) isLocal = false; 
    if (count == undefined) count = 1;
    let arr_cnt = 1;
    let arr = new Array();
    let start = new Date().getTime();
    

    let x = generate_point(params);
    arr.unshift(x);
    let value = math.evaluate(func, x);
    for (let t = 0; t < iterarions; t++){
        let dx = generate_point(params);
        let df = math.evaluate(func, dx);
        if (df < value) {
            arr.unshift(x);
            if (arr_cnt < count){
                arr_cnt++;
            }
            else{
                arr.pop();
            }
            value = df;
            x = dx;
            if (ready != undefined && ready > value){
                break;
            }
        }
    }
    
    if(isLocal){
        arr.forEach(item =>{
            let dans = local(item, func);
            if (value < dans.value){
                value = dans.value;
                x = dans.x;
            }

        })
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