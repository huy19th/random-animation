import { ScheduleRounded } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { JSX } from 'react';
import { Clock } from '../../pages/Clock'
import { CherryBlossomIcon, BrickWallIcon } from '../icons';
import { CherryBlossom } from '../../pages/CherryBlossom';
import { BrickBreaker } from '../../pages/BrickBreaker';

export const routes: { path: string, element: JSX.Element, icon: JSX.Element }[] = ([
    ['clock', <Clock />, ScheduleRounded],
    ['cherry-blossom', <CherryBlossom />, CherryBlossomIcon],
    ['brick-breaker', <BrickBreaker />, BrickWallIcon]
] as [string, JSX.Element, typeof SvgIcon][]).map(([path, element, Icon]) =>
    ({ path, element, icon: <Icon fontSize='large' sx={{ position: 'relative', bottom: 6 }} /> }))