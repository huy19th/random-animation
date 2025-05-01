import { Fab, Stack, useMediaQuery } from '@mui/material';
import { MenuRounded, FullscreenRounded, SettingsRounded, FullscreenExitRounded } from '@mui/icons-material';
import { FullScreenHandle } from 'react-full-screen';

export function NavButtons(
    { handleFullSreen, handleOpenNav, handleOpenSettings }:
        { handleFullSreen: FullScreenHandle, handleOpenNav: () => any, handleOpenSettings: () => any }
) {
    useMediaQuery
    return (
        <Stack
            position={'absolute'}
            justifyContent={'center'}
            display={'flex'}
            width={'100%'}
            direction='row'
            spacing={1}
            top={8}
        >
            <Fab size='small' onClick={handleOpenNav}>
                <MenuRounded />
            </Fab>
            <Fab size='small' onClick={() => handleFullSreen.active ? handleFullSreen.exit() : handleFullSreen.enter()}>
                {handleFullSreen.active ? <FullscreenExitRounded /> : <FullscreenRounded />}
            </Fab>
            <Fab size='small' onClick={handleOpenSettings}>
                <SettingsRounded />
            </Fab>
        </Stack>
    )
}