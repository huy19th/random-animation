import { Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Switch, TextField } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { SetState } from '../../common/types';
import { GroupSettings } from '../../common/components';
import { useEffect, useState } from 'react';

export function SettingsDialog(
    { settings, updateSettings, open, handleOpen }:
        { settings: Record<string, any>, updateSettings: SetState<Record<string, any>>, open: boolean, handleOpen: SetState<boolean> }
) {
    const [formData, updateFormData] = useState<Record<string, any>>({});
    console.log('formData', formData)

    useEffect(() => updateFormData(settings), [settings])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const [setting, subSetting] = name.split('.');

        updateFormData({
            ...formData,
            [setting]: {
                ...formData[setting],
                [subSetting]: value === 'on' ? e.target.checked : value,
            }
        });
    }

    return (
        <Dialog
            open={open}
            onClose={() => handleOpen(false)}
        >
            <DialogTitle align='center'>Settings</DialogTitle>
            <IconButton
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <CloseRounded />
            </IconButton>
            <DialogContent>
                {
                    Object.keys(formData).map(setting => {
                        const settingCount = Object.keys(formData[setting]).length;
                        let size: number

                        if (settingCount === 1) size = 12
                        else if (settingCount % 2 === 0) size = 6
                        else size = 4

                        return (
                            <>
                                <GroupSettings title={setting.replace('_', ' ')}>
                                    <Grid container spacing={1} rowSpacing={1}>
                                        {
                                            Object.keys(formData[setting]).map(subSetting => {
                                                const settingValue = formData[setting][subSetting] 
                                                const fieldProps = {
                                                    label: subSetting,
                                                    name: `${setting}.${subSetting}`,
                                                    checked: settingValue,
                                                    onChange: handleChange,
                                                }
                                                return (
                                                    <Grid size={size}>
                                                        {
                                                            typeof settingValue === 'boolean' ?
                                                                <FormControlLabel
                                                                    label={subSetting}
                                                                    labelPlacement='start'
                                                                    control={<Switch {...fieldProps} />}
                                                                />
                                                                :
                                                                <TextField
                                                                    fullWidth
                                                                    size='small'
                                                                    variant='outlined'
                                                                    type={
                                                                        typeof settingValue === 'number' ? 'number' :
                                                                            subSetting === 'color' ? 'color' :
                                                                                'text'
                                                                    }
                                                                    {...fieldProps}
                                                                    value={settingValue }
                                                                />
                                                        }
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </GroupSettings>
                            </>
                        )
                    })
                }
            </DialogContent>
        </Dialog>
    )
}