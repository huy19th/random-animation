import { z } from 'zod';
import { Color } from '../../common/constants';
import { Settings } from '../../common/utils/settings';

const unit = Math.min(window.innerHeight, window.innerWidth) * (window.innerHeight < window.innerWidth ? 1 / 4 : 2 / 5);

const clockHandSchema = z.object({
    color: z.string(),
    width: z.number().gt(0),
    height: z.number().gt(0)
})

const schema = z.object({
    second_hand: clockHandSchema,
    minute_hand: clockHandSchema,
    hour_hand: clockHandSchema,
    center: z.object({
        color: z.string(),
        radius: z.number().gt(0)
    }),
    numbers: z.object({
        roman: z.boolean(),
        color: z.string(),
        size: z.number().gt(0),
        distance: z.number().gt(0)
    })
}).default({
    second_hand: {
        color: Color.Neutral[500],
        width: unit / 40,
        height: unit,
    },
    minute_hand: {
        color: Color.Neutral[600],
        width: unit / 25,
        height: unit * 3 / 4,
    },
    hour_hand: {
        color: Color.Neutral[800],
        width: unit / 20,
        height: unit / 2,
    },
    center: {
        color: Color.Neutral[900],
        radius: unit / 20,
    },
    numbers: {
        roman: true,
        color: Color.Neutral[900],
        size: unit / 5,
        distance: unit,
    }
})

export const ClockSettings = new Settings('Clock', schema)