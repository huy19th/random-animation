import '@mui/material/Fab';

declare module '@mui/material/Fab' {
  interface FabPropsVariantOverrides {
    outlined: true;
  }
}