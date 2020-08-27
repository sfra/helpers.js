# Some js helpers.


This repository (index.js file) will consist of commonly used js function, which are often unnecessary rewritten
in many projects (or the whole libraries like lodash (great and useful) are added as an dependency, when one function is needed).


## Installlation
````bash
npm install --save @sz.frankyy/helpers
````

This micro library does not require any dependencies.

## Api
So far it has been provided

## boolean deepEqual([any],[any])
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

Look at the end of README to see real application of the such approach.
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


## Real world case study

I had two projects with the appropriate packages.json files

../interface/package.json
````json
{
  "name": "Vue2-Babel-Phaser-Es6-starter",
  "version": "0.1.0",
  "author": "Szymon Frankowski",
  "homepage": "https://github.com/sfra/Vue2-Babel-Phaser-Es6-starter",
  "license": "MIT",
  "private": true,
  "scripts": {
    "start": "npm run serve:dev",
    "build": "cross-env NODE_ENV=production webpack",
    "serve:dev": "cross-env NODE_ENV=development node bin/dev-server.js",
    "serve:production": "cross-env NODE_ENV=production node bin/spa-server.js",
    "lint:scripts": "eslint --ext .js,.vue --ignore-path .gitignore .",
    "lint:styles": "stylelint --syntax scss 'src/**/*.+(scss|vue)'",
    "lint": "npm run lint:scripts && npm run lint:styles"
  },
  "dependencies": {
    "normalize.css": "^8.0.0",
    "phaser": "^3.16.2",
    "reset-css": "^3.0.0",
    "vue": "^2.5.16",
    "vue-router": "^3.0.1"
  },
  "devDependencies": {
    "@avalanche/eslint-config": "^2.0.0",
    "@avalanche/stylelint-config": "^0.1.2",
    "@babel/core": "^7.0.0-beta.42",
    "@babel/plugin-syntax-dynamic-import": "^7.0.0-beta.42",
    "@babel/preset-env": "^7.0.0-beta.42",
    "@mapbox/stylelint-processor-arbitrary-tags": "^0.2.0",
    "babel-eslint": "^8.2.2",
    "babel-loader": "^8.0.0-beta.2",
    "compression": "^1.7.2",
    "cross-env": "^5.1.4",
    "css-loader": "^0.28.11",
    "eslint": "^4.19.1",
    "eslint-plugin-import": "^2.10.0",
    "eslint-plugin-vue": "^4.4.0",
    "express": "^4.16.3",
    "file-loader": "^3.0.1",
    "html-webpack-plugin": "^3.1.0",
    "mini-css-extract-plugin": "^0.4.0",
    "node-sass": "^4.8.3",
    "node-sass-magic-importer": "^5.1.1",
    "opn": "^5.3.0",
    "optimize-css-assets-webpack-plugin": "^4.0.0",
    "sass-loader": "^6.0.7",
    "stylelint": "^9.1.3",
    "uglifyjs-webpack-plugin": "^1.2.4",
    "vue-loader": "^15.0.0-beta.7",
    "vue-template-compiler": "^2.5.16",
    "webpack": "^4.4.1",
    "webpack-cli": "^2.0.13",
    "webpack-serve": "^0.3.0"
  }
}

````

and ../array4/package.json
````json
{
  "name": "tile_game_logic",
  "version": "1.0.0",
  "description": "logic for mobile game",
  "main": "index.ts",
  "scripts": {
    "build": "tsc",
    "start": "node js/index.js",
    "test": "jest",
    "visual": "tsuml --glob ./src/classes/**/*.ts",
    "doc": "jsdoc -c jsdoc.json -d docs js/classes/"
  },
  "keywords": [
    "game",
    "typescript"
  ],
  "author": "Szymon Frankowski <sz.frankyy@gmail.com>",
  "license": "ISC",
  "devDependencies": {
    "@types/jest": "^24.0.6",
    "jest": "^24.1.0",
    "jsdoc": "^3.5.5",
    "jsdoc-inheritance-diagram": "^1.2.3",
    "ts-jest": "^24.0.0",
    "ts-node": "^8.0.2",
    "tsuml": "0.0.1-alpha.8",
    "typescript": "^3.3.3"
  },
  "dependencies": {
    "@types/node": "^11.9.5"
  }
}
````

Then, using the script
````javascript
const helpers = require('@sz.frankyy/helpers');
const fs = require('fs');
let p0 = JSON.parse(fs.readFileSync('../interface/package.json').toString());
let p1 = JSON.parse(fs.readFileSync('../array4/package.json').toString());

fs.writeSync('package.json',JSON.stringify(helpers.deepMerge(p0,p1,{string:(a,b)=> `${a}<<<>>>${b}`} ),null,2));
````
we obtain as a result package.json file

````json
{
  "name": "Vue2-Babel-Phaser-Es6-starter<<<>>>tile_game_logic",
  "version": "0.1.0<<<>>>1.0.0",
  "description": "logic for mobile game",
  "main": "index.ts",
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack<<<>>>tsc",
    "start": "npm run serve:dev<<<>>>node js/index.js",
    "test": "jest",
    "visual": "tsuml --glob ./src/classes/**/*.ts",
    "doc": "jsdoc -c jsdoc.json -d docs js/classes/",
    "serve:dev": "cross-env NODE_ENV=development node bin/dev-server.js",
    "serve:production": "cross-env NODE_ENV=production node bin/spa-server.js",
    "lint:scripts": "eslint --ext .js,.vue --ignore-path .gitignore .",
    "lint:styles": "stylelint --syntax scss 'src/**/*.+(scss|vue)'",
    "lint": "npm run lint:scripts && npm run lint:styles"
  },
  "keywords": [
    "game",
    "typescript"
  ],
  "author": "Szymon Frankowski<<<>>>Szymon Frankowski <sz.frankyy@gmail.com>",
  "license": "MIT<<<>>>ISC",
  "devDependencies": {
    "@types/jest": "^24.0.6",
    "jest": "^24.1.0",
    "jsdoc": "^3.5.5",
    "jsdoc-inheritance-diagram": "^1.2.3",
    "ts-jest": "^24.0.0",
    "ts-node": "^8.0.2",
    "tsuml": "0.0.1-alpha.8",
    "typescript": "^3.3.3",
    "@avalanche/eslint-config": "^2.0.0",
    "@avalanche/stylelint-config": "^0.1.2",
    "@babel/core": "^7.0.0-beta.42",
    "@babel/plugin-syntax-dynamic-import": "^7.0.0-beta.42",
    "@babel/preset-env": "^7.0.0-beta.42",
    "@mapbox/stylelint-processor-arbitrary-tags": "^0.2.0",
    "babel-eslint": "^8.2.2",
    "babel-loader": "^8.0.0-beta.2",
    "compression": "^1.7.2",
    "cross-env": "^5.1.4",
    "css-loader": "^0.28.11",
    "eslint": "^4.19.1",
    "eslint-plugin-import": "^2.10.0",
    "eslint-plugin-vue": "^4.4.0",
    "express": "^4.16.3",
    "file-loader": "^3.0.1",
    "html-webpack-plugin": "^3.1.0",
    "mini-css-extract-plugin": "^0.4.0",
    "node-sass": "^4.8.3",
    "node-sass-magic-importer": "^5.1.1",
    "opn": "^5.3.0",
    "optimize-css-assets-webpack-plugin": "^4.0.0",
    "sass-loader": "^6.0.7",
    "stylelint": "^9.1.3",
    "uglifyjs-webpack-plugin": "^1.2.4",
    "vue-loader": "^15.0.0-beta.7",
    "vue-template-compiler": "^2.5.16",
    "webpack": "^4.4.1",
    "webpack-cli": "^2.0.13",
    "webpack-serve": "^0.3.0"
  },
  "dependencies": {
    "@types/node": "^11.9.5",
    "normalize.css": "^8.0.0",
    "phaser": "^3.16.2",
    "reset-css": "^3.0.0",
    "vue": "^2.5.16",
    "vue-router": "^3.0.1"
  },
  "homepage": "https://github.com/sfra/Vue2-Babel-Phaser-Es6-starter",
  "private": true
}
````


which contains conflict points indicated by <<<>>>.

Moreover, if the function 

````javascript
(a, b) => {
  if (a[0] === '^') {
    let v = [a.match(/\^(.*)$/)[1].split('.'), b.match(/\^(.*)$/)[1].split('.')],
      merged = '',
      selected = -1;
    return '^' + v[0].map((x, i) => {
      (!(selected < 0) || !(v[0][i] < v[1][i]) || (selected = 0)) && (!(selected < 0) || (v[0][i] < v[1][i]) || (selected = 1));
      return v[0][i];
    }).join('.');
  };
  return a+b
};
````
then the depencies would be automatically set to the min version. For example, if "reset-css": "^3.0.2", and "reset-css": "^3.2.1" occur in two
package.json file, then "reset-css": "^3.0.2" would be choosen.

## [Promise] sleep([number])
Sleep for some time (the only one argument express it in miliseconds). Can be used in async funtions:
````javascript
async ()=>{
    console.log('One');
    await sleep(1000);
    console.log('Two');
    await sleep(1000);
    console.log('Three');
}

````

## [number] whichOne([object],[array],[boolean]=false)

Returns an index of the array on which an object occurs. If the object is not present it returns -1.
If the boolean argument if true an equality is understood as equality by reference (identity of objects). 



## [string] toFixedString=([string or number], [string], [string]='',[string]='',[string]=' ');


Completes a given string by the character given the the last argument and ads an prefix and suffix.
It can be used in console application to improve data presentation. 


## [Array] findPathInObject = (ob [object], key [string], paths=[] [Array], path = '' [Array])

Computes the path to the key in the object ob. For example the path of 'z' in {x: {u: 11, b: {z: 11}}} is 'x.b'. Therefore findPathInObject({x: {u: 11}, b: {z: 11}}, 'z') will equal

['x.b']. The paths of 'z' in {x: {u: 11, b: {z: 11}}, c: [23,5,6,7, {z: []}]} is ['x.b', 'c.4'].



