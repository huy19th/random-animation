import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { SetState } from '../../common/types';
import { GroupSettings, Switch } from '../../common/components';
import { useEffect, useMemo, useState } from 'react';
import { inputType, inputValue, sameKeys } from '../../common/utils';

export function SettingsDialog(
    { settings, updateSettings, open, handleClose }:
        { settings: Record<string, any>, updateSettings: SetState<Record<string, any>>, open: boolean, handleClose: () => any }
) {
    const [formData, updateFormData] = useState<Record<string, any>>({});
    const baseSettings = useMemo(() => settings, [Object.keys(settings).join()])
    useEffect(() => updateFormData(settings), [settings])

    const handleChange = (e: any) => {
        const { name, value, type } = e.target;
        const [setting, subSetting] = name.split('.');
        console.log(formData, type)

        updateFormData({
            ...formData,
            [setting]: {
                ...formData[setting],
                [subSetting]: inputValue(value, type),
            }
        });
    }

    const handleSwitch = (name: string) => {
        const [setting, subSetting] = name.split('.');
        const previousValue = formData[setting][subSetting]

        updateFormData({
            ...formData,
            [setting]: {
                ...formData[setting],
                [subSetting]: !previousValue,
            }
        });
    }

    const handleClick = () => {
        updateSettings(formData);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle align='center'>Settings</DialogTitle>
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
            <DialogContent>
                {
                    sameKeys(formData, settings) && Object.keys(formData).map(setting => {
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
                                            Object.keys(formData[setting]).map((subSetting) => {
                                                const settingValue = formData[setting][subSetting]
                                                const fieldName = `${setting}.${subSetting}`

                                                return (
                                                    <Grid size={size}>
                                                        {
                                                            typeof settingValue === 'boolean' ?
                                                                <Switch
                                                                    key={fieldName}
                                                                    label={subSetting}
                                                                    checked={settingValue}
                                                                    handleClick={() => handleSwitch(fieldName)}
                                                                />
                                                                :
                                                                <TextField
                                                                    key={fieldName}
                                                                    fullWidth
                                                                    size='small'
                                                                    variant='outlined'
                                                                    type={inputType(baseSettings[setting][subSetting])}
                                                                    label={subSetting}
                                                                    name={fieldName}
                                                                    onChange={handleChange}
                                                                    value={`${settingValue}`[0] === '0' ? `${settingValue}`.slice(1) : settingValue}
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
            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    variant='contained'
                    fullWidth
                    onClick={handleClick}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}