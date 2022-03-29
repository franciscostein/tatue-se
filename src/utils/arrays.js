export const isEmpty = array => array.length === 0;

export const isNotEmpty = array => array.length > 0;

export const intersect = (arrayA, arrayB) =>
	arrayA.filter(a => arrayB.some(b => b._id === a._id));
