import { create, all, e, random } from 'mathjs'

const config = { }
const math = create(all, config)

function detech(params, pres){
    new_params = {}
    for (let key in params){
        new_params[key]={min:0, max:math.round((params[key].max - params[key].min)/(math.evaluate('10^x',{x:-pres})))}
    }
    return new_params;
}
function gen_point(options){
    let point = {};
    for (let key in options){
        point[key] = math.round(math.random(options[key].min, options[key].max))
    }
    return point;
}
function gen_points(Params, count){
    let points = [];
    for(let it = 0; it < count; it++){
        points.push(gen_point(Params))
    }
    return points;
}
function toG(point){
    let G_point = {}
    for(let key in point){
        G_point[key] = point[key] ^ (point[key] >> 1);
    }
    return G_point;
}
function fromG(G_point){
    let point = {}
    for( let key in G_point){
        let arg = 0;
        let Garg = G_point[key];
        while (Garg > 0){
            arg = arg ^ Garg;
            Garg = Garg >> 1;
        }
        point[key] = arg;
    }
    return point;
}
function arrtoG(points){
    let Gpoints = [];
    points.array.forEach(element => {
        Gpoints.push(toG(element))
    });
    return Gpoints;
}
function arrfromG(Gpoints){
    let points = [];
    Gpoints.array.forEach(element => {
        points.push(fromG(element))
    });
    return points;
}
function toval(point,options){
    let p = {}
    for(let key in point){
        p[key] = get_val(options.params[key].min, point[key],options.h);
    }
    return p;
}
function get_val(min,n,h){
    return min + n*h + h/2;
}
function evalfunkGpoint(func, point, op){
    let p = toval(fromG(point),op);
    return math.evaluate(func, p);
}
function onePoint(opt){
    let arg1 = opt.arg1;
    let arg2 = opt.arg2;
    let points = {1:{},2:{}};
    for (let key in arg1){
        let a1 = Number(arg1[key]).toString(2);
        let a2 = Number(arg2[key]).toString(2);
        let max_len = math.max(a1.length, a2.length);
        a1 = a1.padStart(max_len,'0');
        a2 = a2.padStart(max_len, '0');
        let bp = math.round(math.random(1, max_len));
        let b1 = a1.substring(0,bp) + a2.substring(bp);
        let b2 = a2.substring(0,bp) + a1.substring(bp);
        points[1][key]=parseInt(b1, 2);
        points[2][key]=parseInt(b2, 2);
    }
    return points;
}
function twoPoint(opt){
    let arg1 = opt.arg1;
    let arg2 = opt.arg2;
    let points = {1:{},2:{}};
    for (let key in arg1){
        let a1 = Number(arg1[key]).toString(2);
        let a2 = Number(arg2[key]).toString(2);
        let max_len = math.max(a1.length, a2.length);
        a1 = a1.padStart(max_len,'0');
        a2 = a2.padStart(max_len, '0');
        let bp1 = math.round(math.random(1, max_len));
        let bp2 = math.round(math.random(1, max_len));
        if (bp1 > bp2){
            let c = bp1;
            bp1 = bp2;
            bp2 = c;
        }
        let b1 = a1.substring(0,bp1) + a2.substring(bp1,bp2) + a1.substring(bp2);
        let b2 = a2.substring(0,bp1) + a1.substring(bp1,bp2) + a2.substring(bp2);
        points[1][key]=parseInt(b1, 2);
        points[2][key]=parseInt(b2, 2);
    }
    return points;
}
function manyPoint(opt){
    let arg1 = opt.arg1;
    let arg2 = opt.arg2;
    let options = opt.options;
    let points = {1:{},2:{}};
    for (let key in arg1){
        let a1 = Number(arg1[key]).toString(2);
        let a2 = Number(arg2[key]).toString(2);
        let max_len = math.max(a1.length, a2.length);
        a1 = a1.padStart(max_len,'0');
        a2 = a2.padStart(max_len, '0');
        let b1 = '';
        let b2 = '';
        
        for (let it = 0; it < max_len; it++){
            let r = math.random(0, 1);
            if (r < options){
                b1 += a1[it];
                b2 += a2[it];
            }
            else{
                b1 += a2[it];
                b2 += a1[it];
            }
        }
        points[1][key]=parseInt(b1, 2);
        points[2][key]=parseInt(b2, 2);
    }
    return points;
}
function mutate(point, chance, cnt){
    let npoint = []
    for (let key in point){
        let length = (point[key].toString(2).length);
        let p = math.random(cnt,0,length);
        p.forEach(it => {it = round(it)});
        p.sort(function(a,b){return a-b});
        let a = 0;
        p.forEach(el => {
            for(it = 0; it < el; it++){
                a = a << 1;
            }
            let r = random(0,1);
            if (r < chance) a = a | 1;
        });
        npoint[key] = point[key] ^ a;
    }
    return npoint;
}

function GeneticALg(options){
    let Func = options.Func;
    let Params = options.Params;
    let Iteraions = options.Iteraions;
    let StartSize = options.StartSize;
    let SelectCoef = options.SelectCoef;
    let CrossChance = options.CrossChance;
    let MutationChance = options.MutationChance;
    let CrossType = options.CrossType;
    let Bchance = null;
    let Crossf = null;
    if (CrossType == 1) Crossf = onePoint;
    if (CrossType == 2) Crossf = twoPoint;
    if (CrossType == 3) {
        Bchance = options.Bchance;
        Crossf = manyPoint;
    }
    let Elits = options.Elits;
    let ElitsCoef = null;
    if (Elits) ElitsCoef = options.ElitsCoef;
    let ElitsP = options.ElitsP;
    let MutationChanceEP = null;
    let MutationGenCount = null;
    if (ElitsP) {
        MutationChanceEP = options.MutationChanceEP;
        MutationGenCount = options.MutationGenCount;
    }
    let pres = options.pres;
    let h = math.evaluate('10^x', {x:-pres});
    let op = {params: Params, h: h};
    let new_params = detech(Params, pres);
    let start = new Date().getTime();


    let population = gen_points(new_params,StartSize);
    population = arrtoG(population);
    for(let it = 0; it < Iteraions; it++){
        population.sort(function(a,b){
            return evalfunkGpoint(Func,a,op) - evalfunkGpoint(Func,b,op);
        });
        let dpop = [];
        for (let it = 0; it < math.round(population.length*SelectCoef); it++){
            dpop.push(population[it]);
        }
        let new_pop = [];
        dpop.forEach(el1 =>{
            dpop.forEach(el2 =>{
                let r = math.random(0,1);
                if (el1 != el2 && r < CrossChance){
                    let opt = {arg1:el1, arg2: el2, options:Bchance}
                    let ans = Crossf(opt);
                    
                    new_pop.push(mutate(ans[1],MutationChance,1));
                    new_pop.push(mutate(ans[2],MutationChance,1));
                }
            });
        });
        if (Elits){
            for (let it = 0; it < math.round(dpop.length*ElitsCoef); it++){
                new_pop.push(dpop[it]);
                if(ElitsP){
                    new_pop.push(mutate(dpop[it],MutationChanceEP,MutationGenCount));
                }
            }
        }
        population = new_pop;
    }
    population.sort(function(a,b){
        return evalfunkGpoint(Func,a,op) - evalfunkGpoint(Func,b,op);
    });
    let anspoint = population[0];
    anspoint = fromG(anspoint);
    anspoint = toval(anspoint, op);
    let Fans = math.evaluate(Func, anspoint);

    let end = new Date().getTime();


    let t = end - start;


    let result = {
        ans: anspoint,
        value: Fans,
        time: t
    } 

    return result;
}


export default GeneticALg;