import {z} from 'zod';
import {Color} from '../../common/constants';
import {roundAbsUp} from '../../common/utils';
import {Settings} from '../../common/utils/settings';

const Unit = Math.min(window.innerWidth, window.innerHeight) / 7;

export const schema = z
	.object({
		color: z.object({
			light: z.string(),
			dark: z.string(),
		}),
		brick: z.object({
			width: z.number().gt(0),
			height: z.number().gt(0),
		}),
		ball: z.object({
			radius: z.number().gt(0),
			speed: z.number().gt(0),
			pair: z.number().int().gte(1),
		}),
	})
	.default({
		color: {
			light: Color.Neutral[50],
			dark: Color.Neutral[900],
		},
		brick: {
			width: roundAbsUp(Unit, 2),
			height: roundAbsUp(Unit, 2),
		},
		ball: {
			radius: roundAbsUp(Unit / 2, 2),
			speed: roundAbsUp(Unit / 10, 2),
			pair: 1,
		},
	});

export const BrickBreakerSettings = new Settings('BrickBreaker', schema);
