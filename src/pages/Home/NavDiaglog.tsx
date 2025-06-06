import {CloseRounded, SearchRounded} from '@mui/icons-material';
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogProps,
	DialogTitle,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import {JSX, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {routes} from '../../common/constants';

export function NavDialog({
	open,
	handleClose,
	...dialogProps
}: {open: boolean; handleClose: () => any} & DialogProps) {
	const location = useLocation();
	const path = location.pathname.replace('/', '');
	const navigate = useNavigate();

	useEffect(handleClose, [location]);

	return (
		<Dialog maxWidth='sm' fullWidth {...dialogProps} open={open} onClose={handleClose}>
			<DialogTitle align='center'>Animations</DialogTitle>
			<IconButton
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
				}}
			>
				<CloseRounded />
			</IconButton>
			<DialogContent sx={{pt: 0}}>
				<TextField
					fullWidth
					size='small'
					placeholder='Search Animation'
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position='start'>
									<SearchRounded />
								</InputAdornment>
							),
						},
					}}
				/>
				<Box mt='1rem' display='flex'>
					{routes.map(item => (
						<Button
							key={item.path as string}
							variant={
								path === item.path || (!path && item.path === 'clock')
									? 'contained'
									: 'text'
							}
							sx={{
								width: '8rem',
								height: '8rem',
								flexDirection: 'column',
								textTransform: 'capitalize',
								wordBreak: 'break',
							}}
							onClick={() => navigate(item.path as string)}
						>
							{item.icon as JSX.Element}
							<Typography sx={{position: 'absolute', bottom: 6}} fontSize={14}>
								{(item.path as string).replace('-', ' ')}
							</Typography>
						</Button>
					))}
				</Box>
			</DialogContent>
		</Dialog>
	);
}
