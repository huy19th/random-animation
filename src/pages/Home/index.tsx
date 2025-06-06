import {Box} from '@mui/material';
import {RefObject, useLayoutEffect, useRef, useState} from 'react';
import {Stage} from 'react-konva';
import {Outlet} from 'react-router';
import {useFullscreen, useToggle} from 'react-use';
import {z} from 'zod';
import {Settings} from '../../common/utils/settings';
import {NavButtons} from './NavButtons';
import {NavDialog} from './NavDiaglog';
import {SettingsDialog} from './SettingsDialog';

export function Home() {
	const ref = useRef(null) as unknown as RefObject<Element>;
	const [show, toggle] = useToggle(false);
	const isFullscreen = useFullscreen(ref, show, {onClose: () => toggle(false)});
	const [isNavOpen, setOpenNav] = useState<boolean>(false);
	const [isSettingsOpen, setOpenSettings] = useState<boolean>(false);
	const [settings, updateSettings] = useState<Settings<z.Schema>>(
		{} as Settings<z.Schema>,
	);
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useLayoutEffect(() => {
		const updateWindowSize = () =>
			setWindowSize({width: window.innerWidth, height: window.innerHeight});
		window.addEventListener('resize', updateWindowSize);
		return () => window.removeEventListener('resize', updateWindowSize);
	}, []);

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
				<Outlet context={{windowSize, settings, updateSettings}} />
			</Stage>
		</Box>
	);
}
