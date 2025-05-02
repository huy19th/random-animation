import { ScheduleRounded } from '@mui/icons-material';
import { Clock } from '../../pages/Clock'
import { CherryBlossomIcon } from '../icons';
import { CherryBlossom } from '../../pages/CherryBlossom';
import { BrickBreaker } from '../../pages/BrickBreaker';
import { BrickWallIcon } from '../icons/BrickWall';
import { JSX } from 'react';

export const routes = [
    ['clock', <Clock />, ScheduleRounded],
    ['cherry-blossom', <CherryBlossom />, CherryBlossomIcon],
    ['brick-breaker', <BrickBreaker />, BrickWallIcon]
].map(([path, element, Icon]) => // @ts-ignore
    ({ path, element, icon: <Icon fontSize='large' /> })) as Array<{ path: string, element: JSX.Element, icon: JSX.Element }>