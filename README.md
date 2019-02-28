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