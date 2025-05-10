import { z } from 'zod';
import { Color } from '../../common/constants';
import { Settings } from '../../common/utils/settings';

export const schema = z.object({
    background: z.object({
        color: z.string()
    }),
    lantern: z.object({
        count: z.number().int().gt(0).lte(200)
    })
}).default({
    background: {
        color: Color.Indigo[950]
    },
    lantern: {
        count: 30
    }
})

export const SkyLanternSettings = new Settings('SkyLantern', schema)