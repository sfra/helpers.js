# Some js helpers.

This repository (index.js file) will consist of commonly used js function, which are often unnecessary rewritten
    in many projects (or the whole libraries like lodash (great and useful) are added as an dependency, when one function is needed). So far it has been provided

## boolean deepEqual([any])
Returns a fresh copy (without any references) of a given object
## [T] deepCopy([T])

It makes recursive copy of on js item. In the case of instances of collections classes for example,
the shortest method 

````javascript
let src = [(new Set()).add(3).add(4),'Hello'];
let cp = JSON.parse( JSON.stringify(src) );
console.dir(cp);
````

does not pass an exam. That is terminal returns

````bash
>[ {}, 'Hello' ]
````

## [obj] deepMerge([obj],[obj],[obj]={})

Takes the two js objects and applies a merge according to the last one object. This object contains (called config)
the rules what to do when two objects have the same defined property which differs. Each rule has a schema

### "simple type": (a,b)=>{ return someOperation(a,b) }

For example, if config is of the form:

````javascript
    {
        'string':(a,b)=>a+b,
        'number': (a,b)=>a*b
    }
````

then the simple properties fixed on analogously places in two objects being the arguments of deepMerge function,
will be merged into the concatenation (if there are strings), or multiplication (in a case of numbers).
If we expect different types for this values, then the "hybrid" rules can be passed to config:

````javascript
    {
        'string.number':(a,b)=>Math.parseInt(a,10)+b,
        'number.string': (a,b)=> {
                                let merged ='';
                                for(let i=0; i<a; i++) {
                                    merged+=b+' ';
                                 }

                                return trim(merged);
                                }
    }
````
###Example
####   Input
````javascript
    let p0={
         a: [1,2,4],
         b: {a: 'Hello'},
         c: [1,2,3,true, {a: 11}],
         d: 33,
         e: {a: {a: []}}
    };

    let p1 = {
       a: [-1,3,-4, 6,7],
       b: {a: 'World'},
       c: [9,0,3,true, {a: 9}],
       d: 33,
          e: {b: [1,2,17]}
      };
````

and

````javascript
let config={
       'string': (a,b)=>a+b,
       'number': (a,b)=> Math.min(a,b),
       };

````

####   Result

````javascript
{
      a: [-1,2,-4,6,7],
      b: {a: 'HelloWorld'},
      c: [1,0,3,true, {a: 9}],
      d: 33,
      e: {a: {a: []},b:[1,2,17]}
}
````
