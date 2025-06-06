import {CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {theme} from './theme.ts';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<App />
			</CssBaseline>
		</ThemeProvider>
	</StrictMode>,
);
