import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Color } from './common/constants/color.ts';

const theme = createTheme({
  palette: {
    primary: {
      main: Color.Neutral[300], // your default primary color
    },
    secondary: {
      main: '#dc004e', // your default secondary color
    },
  },
});

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline>
//         <App />
//       </CssBaseline>
//      </ThemeProvider>,
//   </StrictMode>,
// )

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)

