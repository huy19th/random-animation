import { Stage } from 'react-konva';
import { Outlet } from 'react-router';
import { NavButtons } from './NavButtons';
import { RefObject, useLayoutEffect, useRef, useState } from 'react';
import { useFullscreen, useToggle } from 'react-use';
import { SettingsDialog } from './SettingsDialog';
import { NavDialog } from './NavDiaglog';
import { Box } from '@mui/material';

export function Home() {
    const ref = useRef(null) as unknown as RefObject<Element>
    const [show, toggle] = useToggle(false);
    const isFullscreen = useFullscreen(ref, show, { onClose: () => toggle(false) });
    const [isNavOpen, setOpenNav] = useState<boolean>(false);
    const [isSettingsOpen, setOpenSettings] = useState<boolean>(false);
    const [settings, updateSettings] = useState<Record<string, any>>({});
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useLayoutEffect(() => {
        const updateWindowSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', updateWindowSize);
        return () => window.removeEventListener('resize', updateWindowSize);
    }, [])

    return (
        <Box ref={ref} bgcolor='white'>
            <NavButtons
                isFullScreen={isFullscreen}
                handleFullSreen={() => toggle(!isFullscreen)}
                handleOpenNav={() => setOpenNav(true)}
                handleOpenSettings={() => setOpenSettings(true)}
            />
            <NavDialog
                container={ref.current}
                open={isNavOpen}
                handleClose={() => setOpenNav(false)}
            />
            <SettingsDialog
                container={ref.current}
                settings={settings}
                updateSettings={updateSettings}
                open={isSettingsOpen}
                handleClose={() => setOpenSettings(false)}
            />
            <Stage width={windowSize.width} height={windowSize.height}>
                <Outlet context={{ windowSize, settings, updateSettings }} />
            </Stage>
        </Box>
    )
}