import {z} from 'zod';
import {Color} from '../../common/constants';
import {Settings} from '../../common/utils/settings';

const schema = z
	.object({
		background: z.object({
			color: z.string(),
		}),
		petal: z.object({
			count: z.number().int().gt(0).lte(500),
		}),
	})
	.default({
		background: {
			color: Color.Neutral[800],
		},
		petal: {
			count: 50,
		},
	});

export const CherryBlossomSettings = new Settings('CherryBlossom', schema);
