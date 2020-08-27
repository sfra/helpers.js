const { deepEqual, deepCopy, deepMerge, Sstring, whichOne, toFixedString, findPathInObject } = require('../index');




let objs0 = [
  { x: 44, y: 22 },
  { x: 44, y: -22 },
  [],
  (new Set()).add([2, 1]).add(3).add([new Set(), 'hello'])
];
let objs1 = [
  { x: 44, y: 22 },
  { x: 44, y: -22 },
  [],
  (new Set()).add([2, 1]).add([new Set(), 'hello']).add(3)
];

let obj = (new Set()).add([2, 1]).add(-3).add([new Set(), 'hello']);

describe('deepEqual', () => {
  test('simple objects and Sets', () => {




    objs0.forEach((el, i) => {
      console.log(`${i})`);
      //console.dir(`[${el}]`);
      expect(deepEqual(el, objs1[i])).toBeTruthy();
    });
    expect(deepEqual(obj, objs0)).toBeFalsy();


  });
});

describe('deepCopy', () => {
  test('simpleobjects', () => {

    let copy = deepCopy('Some string');
    expect(deepEqual(copy, 'Some string')).toBeTruthy();
    // sending by copy not a reference
    let src = [[1], 2, 3];
    copy = deepCopy(src);
    expect(deepEqual(src, copy)).toBeTruthy();

    expect(deepEqual(copy, 'Some string')).toBeFalsy();


  });

});


describe('deepMerge', () => {

  let config = {
    'string': (a, b) => a + b,
    'number': (a, b) => Math.min(a, b),
    'boolean': (a, b) => a || b,
    'function': (a, b) => {
      return (...arg) => {
        a(...arg) + b(...arg);
      };
    },
    'string.number': (a, b) => parseInt(a) * parseInt(b)
  };

  test('Simple expample', () => {
    let p0 = [3, 4, 5];
    let p1 = [6, 7, 9];



    p0 = {
      a: [1, 2, 4],
      b: { a: 'Hello' },
      c: [1, 2, 3, true, { a: 11 }],
      d: 33,
      e: { a: { a: [] } }

    };

    p1 = {
      a: [-1, 3, -4, 6, 7],
      b: { a: 'World' },
      c: [9, 0, 3, true, { a: 9 }],
      d: 33,
      e: { b: [1, 2, 17] },


    };




    expect(deepEqual(deepMerge(p0, p1, config),
      {
        a: [-1, 2, -4, 6, 7]
        ,
        b: { a: 'HelloWorld' },
        c: [1, 0, 3, true, { a: 9 }],
        d: 33,
        e: { a: { a: [] }, b: [1, 2, 17] }

      }
    )

    ).toBeTruthy();





  });
})


let s = 'http://somehost/profile'
describe('Sstring', () => {
  test('suffix', () => {
    expect(Sstring.suffix(s, 7)).toBe('http://somehost/');

    expect(Sstring.suffix(s, 'file')).toBe('http://somehost/pro');


  });


});

let objInArray = { x: 11, y: 12 };

let array = [{ x: 11, y: 12 }, { x: 11 }, 'Hello world', objInArray, { z: 22, u: 33 }];
describe('whichOne', () => {
  test('exists', () => {
    expect(whichOne(objInArray, array)).toBe(3);

  })
  test('non-exists', () => {
    expect(whichOne({ x: 11 }, array)).toBe(-1);

  })

  test('by value', () => {

    expect(whichOne(objInArray, array, true)).toBe(0);
  });
});





describe('toFixedString', () => {
  test('by number', () => {
    expect(toFixedString(10, 'start', '|', '|')).toBe('|start     |');
    expect(toFixedString(9, 'start', '', '|')).toBe('start    |');
    expect(toFixedString(10, 'start', '|', '|', '+')).toBe('|start+++++|');

  });

  test('by string', () => {
    expect(toFixedString('xxxxxx', 'start', '|', '|')).toBe('|start |');
    expect(toFixedString('xxxxxxx', 'start', '', '|')).toBe('start  |');
    expect(toFixedString('xxxxx', 'start', '|', '|', '+')).toBe('|start|');

  });

});



describe('findPathInObject', () => {
  test('find z', () => {
    let examinedObject = { x: { y:  { z: 'dadsw' } } , uu: { c: { z: { k: [], l: 1 } }} };
    let examinedObject0 = {x: {y: {z:11}}}
    let examinedObject1 ={z:[11]};
    let examinedObject2 ={ x: { y: [2, 3, 4, { zz: 'dadsw' }] }, uu: { c: 'ABC', zz: { k: [], l: 1 } } };;
    let examinedObject3 = {x: [1,2,{u: {z: 'dd'}}]}
    
    expect(findPathInObject(examinedObject0, 'z')).toEqual(['x.y']);

    expect(findPathInObject(examinedObject, 'z')).toEqual([`x.y`,'uu.c']);
     expect(findPathInObject(examinedObject1, 'z')).toEqual(['']);
    expect(findPathInObject(examinedObject2, 'z')).toEqual([]);
    expect(findPathInObject(examinedObject3, 'z')).toEqual(['x.2.u']);

  });



});
