import { Box } from '@mui/material';
import { Stage } from 'react-konva';
import { Outlet } from 'react-router';
import { NavButtons } from './NavButtons';
import { useLayoutEffect, useState } from 'react';
import { SettingsDialog } from './SettingsDialog';

export function Layout() {
    const [unit, setUnit] = useState<number>(Math.min(window.innerWidth, window.innerHeight));
    const [settings, updateSettings] = useState<Record<string, any>>({});
    const [isSettingsOpen, updateIsSettingsOpen] = useState<boolean>(false);

    useLayoutEffect(() => {
        const updateUnit = () => {
            setUnit(Math.min(window.innerWidth, window.innerHeight));
        }
        window.addEventListener('resize', updateUnit);
        updateUnit();
        return () => window.removeEventListener('resize', updateUnit);
    }, [])

    return (
        <>
            <NavButtons handleOpenSettings={updateIsSettingsOpen} />
            <SettingsDialog
                settings={settings}
                updateSettings={updateSettings}
                open={isSettingsOpen}
                handleOpen={updateIsSettingsOpen}
            />
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Outlet context={{ unit, settings, updateSettings }} />
            </Stage>
        </>
    )
}