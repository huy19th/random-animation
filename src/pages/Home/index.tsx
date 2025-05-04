import { Stage } from 'react-konva';
import { Outlet } from 'react-router';
import { NavButtons } from './NavButtons';
import { useLayoutEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { SettingsDialog } from './SettingsDialog';
import { NavDialog } from './NavDiaglog';

export function Home() {
    const fullScreenHandle = useFullScreenHandle();
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
            <Stage width={windowSize.width} height={windowSize.height}>
                <Outlet context={{ windowSize, settings, updateSettings }} />
            </Stage>
        </FullScreen>
    )
}