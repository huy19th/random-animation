import {ScheduleRounded} from '@mui/icons-material';
import {SvgIcon} from '@mui/material';
import {JSX} from 'react';
import {BrickBreaker} from '../../pages/BrickBreaker';
import {CherryBlossom} from '../../pages/CherryBlossom';
import {Clock} from '../../pages/Clock';
import {SkyLantern} from '../../pages/SkyLantern';
import {BrickWallIcon, CherryBlossomIcon, SkyLanterIcon} from '../icons';

export const routes: {path: string; element: JSX.Element; icon: JSX.Element}[] = (
	[
		['clock', <Clock />, ScheduleRounded],
		['cherry-blossom', <CherryBlossom />, CherryBlossomIcon],
		['brick-breaker', <BrickBreaker />, BrickWallIcon],
		['sky-lantern', <SkyLantern />, SkyLanterIcon],
	] as [string, JSX.Element, typeof SvgIcon][]
).map(([path, element, Icon]) => ({
	path,
	element,
	icon: <Icon fontSize='large' sx={{position: 'relative', bottom: 6}} />,
}));
