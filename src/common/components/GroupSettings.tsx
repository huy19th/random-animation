import {Grid, Typography} from '@mui/material';
import {ReactNode} from 'react';
import {Color} from '../constants';

export function GroupSettings({children, title}: {children?: ReactNode; title: string}) {
	return (
		<>
			<Typography
				sx={{
					top: '0.7rem',
					position: 'relative',
					textAlign: 'center',
					bgcolor: 'white',
					width: 'fit-content',
					marginX: 'auto',
					px: '0.3rem',
				}}
			>
				{title}
			</Typography>
			<Grid
				border={1}
				borderRadius={2}
				borderColor={Color.Neutral[600]}
				px={1}
				pb={1}
				pt={2}
			>
				{children}
			</Grid>
		</>
	);
}
