import {
	FullscreenExitRounded,
	FullscreenRounded,
	MenuRounded,
	SettingsOutlined,
} from '@mui/icons-material';
import {Fab, Fade, Stack, SvgIcon} from '@mui/material';

export function NavButtons({
	isFullScreen,
	isIdle,
	handleFullSreen,
	handleOpenNav,
	handleOpenSettings,
}: {
	isFullScreen: boolean;
	isIdle: boolean;
	handleFullSreen: () => any;
	handleOpenNav: () => any;
	handleOpenSettings: () => any;
}) {
	const buttons: [typeof SvgIcon, () => any][] = [
		[MenuRounded, handleOpenNav],
		[isFullScreen ? FullscreenExitRounded : FullscreenRounded, handleFullSreen],
		[SettingsOutlined, handleOpenSettings],
	];

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
				sx={{
					pointerEvents: isIdle ? 'none' : 'auto', // prevent cusor remain in hover state after to hide it after idling
				}}
			>
				{buttons.map(([Icon, handleClick], index) => (
					<Fab key={index} size='small' variant='outlined' onClick={handleClick}>
						<Icon />
					</Fab>
				))}
			</Stack>
		</Fade>
	);
}
