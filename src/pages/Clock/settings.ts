import { z } from 'zod';
import { Color } from '../../common/constants';
import { Settings } from '../../common/utils/settings';
import { validateColor, validateDecimal } from '../../common/utils';

const unit = Math.min(window.innerHeight, window.innerWidth) * (window.innerHeight < window.innerWidth ? 1 / 4 : 2 / 5);

const schema = z.object({
    clock: z.object({
        background: z.string(),
        color: z.string().refine(...validateColor),
        size: z.number().refine(...validateDecimal)
    }),
    numbers: z.object({
        roman: z.boolean(),
        size: z.number().gt(0),
        distance: z.number().gt(0)
    })
}).default({
    clock: {
        background: Color.Neutral[50],
        color: Color.Neutral[950],
        size: 1,
    },
    numbers: {
        roman: true,
        size: unit / 5,
        distance: unit,
    }
})

export const ClockSettings = new Settings('Clock', schema, {
    second_hand: {
        width: unit / 40,
        height: unit,
    },
    minute_hand: {
        width: unit / 25,
        height: unit * 3 / 4,
    },
    hour_hand: {
        width: unit / 20,
        height: unit / 2,
    },
    center: {
        radius: unit / 20,
    },
})