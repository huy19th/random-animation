export const distance = (x1: number, y1: number, x2: number, y2: number) =>
	Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

export const roundAbsUp = (num: number, decimal: number) => {
	if (num === 0) return num;
	const gtZero = num > 0;
	let rounded = Number(num.toFixed(decimal));
	const addition = Number(`0.${'0'.repeat(decimal - 1)}1`) * (gtZero ? 1 : -1);
	if (Math.abs(rounded) < Math.abs(num)) rounded += addition;
	return rounded;
};

export const randBetween = (min: number, max: number) =>
	Math.random() * (max - min) + min;
