import {HexColorRegex} from '../constants';
import {zRefine} from '../types';

export const inputType = (value: any): string => {
	if (typeof value === 'boolean') return 'checkbox';
	if (typeof value === 'number') return 'number';
	if (typeof value === 'string' && HexColorRegex.test(value)) return 'color';
	return 'text';
};

export const inputValue = (value: any, inputType: any): any => {
	if (inputType === 'number') return Number(value);
	return value;
};

export const validateDecimal: zRefine = [
	(val: number) => {
		const decimals = val.toString().split('.')[1];
		return !decimals || decimals.length <= 2;
	},
	'Number must have at most 2 decimal places',
];

export const validateColor: zRefine = [
	(val: string) => HexColorRegex.test(val),
	'Invalid color code',
];
