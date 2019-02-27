function deepEqual(a, b) {
  let eq = true;
  if (Array.isArray(a)) {
    if (a.length === 0) {
      if (b.length === 0) {
        return true;
      }
      return false;
    }

    return (
      true ===
      (typeof a === typeof b &&
        a.length === b.length &&
        ((a.length === 1 && a[0] === b[0]) ||
          a.reduce((p, n, i) => {
            return eq && deepEqual(n, b[i]) && deepEqual(a[0], b[0]);
          })))
    );
  }

  if (a instanceof Set) {
    return (
      b instanceof Set &&
      a.size === b.size &&
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

exports.deepEqual = deepEqual;
