import { ScheduleRounded } from '@mui/icons-material';
import { Clock } from '../../pages/Clock'
import { CherryBlossomIcon } from '../icons';
import { CherryBlossom } from '../../pages/CherryBlossom';

export const routes = [
    ['clock', <Clock />, <ScheduleRounded fontSize='large'/>],
    ['cherry-blossom', <CherryBlossom />, <CherryBlossomIcon fontSize='large'/>]
].map(([path, element, icon]) => ({ path, element, icon }))