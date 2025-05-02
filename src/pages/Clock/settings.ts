import { Color } from '../../common/constants';

const base = Math.min(window.innerHeight, window.innerWidth) * (window.innerHeight < window.innerWidth ? 1 / 4 : 2 / 5);

export const ClockSettings = (unit = base) => {
    return {
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
    }
}