function deepEqual(a, b) {
	if (Array.isArray(a)) {
		let eq = true;

		return a.length === b.length && ((a.length === 1 && a[0] === b[0]) || a.reduce((p, n, i) => {
			return deepEqual(n, b[i]) && deepEqual(a[0],b[0]);
		}));
	};

	if (typeof a === 'object') {
		let eq = true;

		for (let prop in a) {
			eq = eq && deepEqual(a[prop], b[prop]);
		};

		for (let prop in b) {
			eq = eq && !(typeof b[prop] !== 'undefined' && typeof a[prop] === 'undefined');
		}
		return eq;
	}
	return a === b;

};


exports.helpers = {
	deepEqual
}
