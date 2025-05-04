import { createTheme } from '@mui/material';
import { Color } from './common/constants';

export const theme = createTheme({
    palette: {
        primary: {
            main: Color.Neutral[800],
        },
    },
    components: {
        MuiFab: {
            variants: [
                {
                    props: { variant: 'outlined' },
                    style: {
                        color: Color.Neutral[900],
                        border: '0.5px solid',
                        borderColor: Color.Neutral[900],
                        backgroundColor: Color.Neutral[50],
                        opacity: 0.5,
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: Color.Neutral[900],
                            backgroundColor: Color.Neutral[200],
                        },
                    }
                }
            ]
        }
    },
});
