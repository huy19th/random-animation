import {z} from 'zod';
import {Settings} from '../../common/utils/settings';
// import { Color } from '../../common/constants';

export const schema = z
	.object({
		background: z.object({
			color: z.string(),
		}),
		lantern: z.object({
			count: z.number().int().gt(0).lte(200),
		}),
	})
	.default({
		background: {
			color: '#3a3b68', // Color.Indigo[950] is alternative color
		},
		lantern: {
			count: 15,
		},
	});

export const SkyLanternSettings = new Settings('SkyLantern', schema);
