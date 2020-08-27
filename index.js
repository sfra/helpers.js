function deepEqual(a, b) {
  let eq = true;
  if (Array.isArray(a)) {
    if (a.length ===  0) {
      return (b.length === 0) 
       
    }

    return typeof a === typeof b && a.length === b.length &&
        ((a.length === 1 && a[0] === b[0]) ||
          a.reduce((p, n, i) => {
            return eq && deepEqual(n, b[i]) && deepEqual(a[0], b[0]);
          })
    );
  }
/* the Set is an object also, so let us finish it before the next, object condition is checked*/
  if (a instanceof Set) {
    return (
      parseInt(a.size) === parseInt(b.size) &&
      (() => {
        let eq2 = false;

        for (let x in a) {
          eq = eq && eq2;
          for (let y in b) {
            eq2 = eq2 || deepEqual(x, y);
          }
        }
        return eq;
      })()
    );
  }

  if (typeof a === 'object') {
    for (let prop in a) {
      eq = eq && deepEqual(a[prop], b[prop]);
    }

    for (let prop in b) {
      eq =
        eq &&
        !(typeof b[prop] !== 'undefined' && typeof a[prop] === 'undefined');
    }
    return eq;
  }
  return a === b;
}

function deepCopy(src) {

  let copy=null;

  if(Array.isArray(src)) {
    copy=[];

    for(let i=0, max=src.length;i<max;i++) {
      copy.push(deepCopy(src[i]));
    }
    return copy;
  }

  if(src instanceof Set) {
    copy = new Set();
    for(let item of src) {
      copy.add(item);
    }
    return copy;
  }

  if(typeof src==='object') {
    copy = {};
    for(let item in src) {
      copy[item] = deepCopy(src[item]);
    }
    return copy;
  }


  return src;
}

function deepMerge(a,b,config={}){
  let merged = null;

  config['string'] = config['string'] || ((a,b)=>a);
  config['number'] = config['number'] || ((a,b)=>a);
  config['boolean'] = config['boolean'] || ((a,b)=> a);

  if(typeof a==='undefined' || typeof b==='undefined') {
    return deepCopy(a) || deepCopy(b);
  }
  if(Array.isArray(a) && Array.isArray(b)){
        merged = [];
        for(let i=0,max=Math.max(a.length,b.length); i<max;i++){
            merged.push(deepMerge(a[i],b[i],config));
        }
  }

  if(typeof a ==='object' && typeof b ==='object' && b) {
      merged = deepCopy(b) || {};
      for(let prop in a) {
         merged[prop] = deepMerge(a[prop],b[prop],config);
      }
      return merged;
  }




  return config[ (`${typeof a}.${typeof b}` in config ) || typeof a || typeof b ](a,b);
}



const Sstring = {
  suffix:(st,su)=>{
    let ss=null;
    if(typeof su==='number') {
      return st.substring(0,st.length-su);
    }
    if(typeof su=='string') {
      ss = st.split(su);
      ss.pop();
      return ss.join(su);
    }


  }
}


 const sleep = (milliseconds) => {
     return new Promise(resolve => setTimeout(resolve, milliseconds))
 }

      
const whichOne = (obj,array,ref=false)=>{
    let equality = deepEqual;
    ref || (equality=(x,y)=> x===y);
    
  for(let i=0, max = array.length;i<max;i++){
    debugger;
    if(equality(array[i],obj)) {
      return i;
    }


  }
  return -1;

};



const toFixedString=(linePatern, line, prefix='', postfix='', fill=' ' )=> {
  let linePatternLength = (typeof linePatern==='string')?linePatern.length: linePatern;

  let lineLength = Math.max(line.length, linePatternLength);
  let out = line;
  for(let i=0;  i<lineLength-line.length; i++) {
    out+=fill;
  }

 return prefix+out+postfix;
}


const makeFlatArray=(array) =>{
  return [];
}

const findPathInObject = (ob, key, paths=[], path = '') => {
  let keys =Object.keys(ob);
  
  for(let i=0, max = keys.length; i<max; i++) {
    if(keys[i]===key) {
      paths.push(path)
      return paths
    }
    if(typeof ob[keys[i]]==='object') {
      findPathInObject(ob[keys[i]],key,paths, path===''?keys[i]:path+'.'+keys[i])

    }
   }

  
  

  return paths.flat(10000);
}







exports.deepEqual = deepEqual;
exports.deepCopy = deepCopy;
exports.deepMerge = deepMerge;
exports.Sstring = Sstring;
exports.sleep = sleep;
exports.whichOne=whichOne;
exports.toFixedString = toFixedString;
exports.makeFlatArray = makeFlatArray;
exports.findPathInObject = findPathInObject;