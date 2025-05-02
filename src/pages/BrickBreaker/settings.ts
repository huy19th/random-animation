import { Color } from '../../common/constants';
import { roundAbsUp } from '../../common/utils';

const Unit = Math.min(window.innerWidth, window.innerHeight) / 7;

export const BrickBreakerSettings = {
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
        pair: 1
    }
}