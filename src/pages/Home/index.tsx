import { Stage } from 'react-konva';
import { Outlet } from 'react-router';
import { NavButtons } from './NavButtons';
import { useLayoutEffect, useState } from 'react';
import { SettingsDialog } from './SettingsDialog';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { NavDialog } from './NavDiaglog';
import { Box } from '@mui/material';

export function Home() {
    const fullScreenHandle = useFullScreenHandle();
    const [isNavOpen, setOpenNav] = useState<boolean>(false);
    const [isSettingsOpen, setOpenSettings] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [settings, updateSettings] = useState<Record<string, any>>({});

    useLayoutEffect(() => {
        const updateWindowSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', updateWindowSize);
        return () => window.removeEventListener('resize', updateWindowSize);
    }, [])

    return (
        <FullScreen handle={fullScreenHandle}>
                <NavButtons
                    handleFullSreen={fullScreenHandle}
                    handleOpenNav={() => setOpenNav(true)}
                    handleOpenSettings={() => setOpenSettings(true)}
                />
                <NavDialog
                    open={isNavOpen}
                    handleClose={() => setOpenNav(false)}
                />
                <SettingsDialog
                    settings={settings}
                    updateSettings={updateSettings}
                    open={isSettingsOpen}
                    handleClose={() => setOpenSettings(false)}
                />
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Outlet context={{ windowSize, settings, updateSettings }} />
                </Stage>

        </FullScreen>
    )
}