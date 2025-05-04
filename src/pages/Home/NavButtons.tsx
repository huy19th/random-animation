import { Fab, Fade, Stack, SvgIcon } from '@mui/material';
import { MenuRounded, FullscreenRounded, FullscreenExitRounded, SettingsOutlined } from '@mui/icons-material';
import { FullScreenHandle } from 'react-full-screen';
import { useIdle } from 'react-use';

export function NavButtons(
    { handleFullSreen, handleOpenNav, handleOpenSettings }:
        { handleFullSreen: FullScreenHandle, handleOpenNav: () => any, handleOpenSettings: () => any }
) {
    const isIdle = useIdle(10000); // is true after 10s inacctive

    const buttons: [typeof SvgIcon, () => any][] = [
        [MenuRounded, handleOpenNav],
        [
            handleFullSreen.active ? FullscreenExitRounded : FullscreenRounded,
            () => handleFullSreen.active ? handleFullSreen.exit() : handleFullSreen.enter()
        ],
        [SettingsOutlined, handleOpenSettings]
    ]

    return (
        <Fade in={!isIdle}>
            <Stack
                position={'absolute'}
                zIndex={100}
                justifyContent={'center'}
                display={'flex'}
                width={'100%'}
                direction='row'
                spacing={1}
                top={8}
            >
                {buttons.map(([Icon, handleClick], index) =>
                    <Fab
                        key={index}
                        size='small'
                        variant='outlined'
                        onClick={handleClick}
                    >
                        <Icon />
                    </Fab>
                )}
            </Stack>
        </Fade>
    )
}