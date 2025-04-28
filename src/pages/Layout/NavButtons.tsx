import { Box, Fab, useMediaQuery } from '@mui/material';
import { MenuRounded, FullscreenRounded, SettingsRounded } from '@mui/icons-material';
import { SetState } from '../../common/types';

export function NavButtons({ handleOpenSettings }: { handleOpenSettings: SetState<boolean> }) {
    useMediaQuery
    return (
        <Box
            position={'absolute'}
            justifyContent={'center'}
            display={'flex'}
            width={'100%'}
        >
            <Fab size='small' >
                <MenuRounded />
            </Fab>
            <Fab>
                <FullscreenRounded />
            </Fab>
            <Fab onClick={() => handleOpenSettings(true)}>
                <SettingsRounded />
            </Fab>
        </Box>
    )
}