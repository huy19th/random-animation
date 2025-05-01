import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, OutlinedInput, Tooltip, TextField } from '@mui/material';
import { CloseRounded, SearchRounded } from '@mui/icons-material';
import { routes } from '../../common/constants';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { JSX, useEffect } from 'react';

export function NavDialog(
    { open, handleClose }:
        { open: boolean, handleClose: () => any }
) {
    const location = useLocation();
    const path = location.pathname.replace('/', '')
    const navigate = useNavigate()

    useEffect(handleClose, [location])

    return (
        <Dialog
            open={open} onClose={handleClose}
            maxWidth='sm' fullWidth
        >
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
            <DialogContent sx={{ pt: 0 }}>
                <TextField
                    fullWidth size='small' placeholder='Search Animation'
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position='start'><SearchRounded /></InputAdornment>
                        }
                    }}
                />
                <Box mt='1rem' display='flex'>
                    {routes.map(item =>
                        <Button
                            key={item.path as string}
                            variant={path === item.path ? 'contained' : 'text'}
                            onClick={() => navigate(item.path as string)}
                        >
                            <Tooltip title={(item.path as string).replace('-', ' ')}>
                                {item.icon as JSX.Element}
                            </Tooltip>
                        </Button>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    )
}