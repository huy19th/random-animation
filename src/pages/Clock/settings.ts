import {z} from 'zod';
import {Color} from '../../common/constants';
import {validateColor, validateDecimal} from '../../common/utils';
import {Settings} from '../../common/utils/settings';

const unit =
	Math.min(window.innerHeight, window.innerWidth) *
	(window.innerHeight < window.innerWidth ? 1 / 4 : 2 / 5);
const clockHandSchema = z.object({
	width: z.number(),
	height: z.number(),
});

const schema = z
	.object({
		clock: z.object({
			background: z.string(),
			color: z.string().refine(...validateColor),
			size: z.number().refine(...validateDecimal),
		}),
		numbers: z.object({
			roman: z.boolean(),
		}),
		constant: z.object({
			second_hand: clockHandSchema,
			minute_hand: clockHandSchema,
			hour_hand: clockHandSchema,
			center: z.object({
				radius: z.number(),
			}),
			numbers: z.object({
				size: z.number().gt(0),
				distance: z.number().gt(0),
			}),
		}),
	})
	.default({
		clock: {
			background: Color.Neutral[50],
			color: Color.Neutral[950],
			size: 1,
		},
		numbers: {
			roman: true,
		},
		constant: {
			second_hand: {
				width: unit / 40,
				height: unit,
			},
			minute_hand: {
				width: unit / 25,
				height: (unit * 3) / 4,
			},
			hour_hand: {
				width: unit / 20,
				height: unit / 2,
			},
			center: {
				radius: unit / 20,
			},
			numbers: {
				size: unit / 5,
				distance: unit,
			},
		},
	});

export const ClockSettings = new Settings('Clock', schema);
