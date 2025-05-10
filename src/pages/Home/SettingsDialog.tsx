import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Divider, Grid, IconButton, TextField } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { SetState } from '../../common/types';
import { GroupSettings, Switch } from '../../common/components';
import { useEffect, useMemo, useState } from 'react';
import { inputType, inputValue } from '../../common/utils';
import { Settings } from '../../common/utils/settings';
import { z } from 'zod';

export function SettingsDialog(
    { settings, updateSettings, open, handleClose, ...dialogProps }:
        { settings: Settings<z.Schema>, updateSettings: SetState<Settings<z.Schema>>, open: boolean, handleClose: () => any } & DialogProps
) {
    const [formData, updateFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const currentSettings = useMemo(() => settings, [settings.name]);
    useEffect(() => updateFormData(settings.value), [settings.name]);

    const handleChange = (e: any) => {
        const { name, value, type } = e.target;
        const [setting, subSetting] = name.split('.');

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
        const validationError = settings.schema.safeParse(formData).error?.errors;
        if (validationError) {
            setErrors(validationError.reduce((a, b) => {
                const prop = b.path.join('.')
                a[prop] = a[prop] ? [...a[prop], b.message] : [b.message]
                return a
            }, {} as Record<string, string[]>));
        } else {
            setErrors({});
            updateSettings({ ...settings, value: formData });
            handleClose();
        }
    }

    if (
        !formData ||
        !settings?.value ||
        Object.keys(settings.value).join() !== Object.keys(formData).join()
    ) return null;

    return (
        <Dialog {...dialogProps} open={open} onClose={handleClose}>
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
            <Divider />
            <DialogContent>
                {
                    Object.keys(formData).map(setting => {
                        const settingCount = Object.keys(formData[setting]).length;
                        let size: number

                        if (settingCount === 1) size = 12
                        else if (settingCount % 2 === 0) size = 6
                        else size = 4

                        return (
                            <GroupSettings key={setting} title={setting.replace('_', ' ')}>
                                <Grid container spacing={1} rowSpacing={1}>
                                    {
                                        Object.keys(formData[setting]).map((subSetting) => {
                                            const settingValue = formData[setting][subSetting]
                                            const fieldName = `${setting}.${subSetting}`
                                            const err = errors[fieldName]?.join('. ')

                                            return (
                                                <Grid key={fieldName} size={size}>
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
                                                                fullWidth
                                                                size='small'
                                                                variant='outlined'
                                                                key={fieldName}
                                                                error={Boolean(err)}
                                                                type={inputType(currentSettings.value[setting][subSetting])}
                                                                label={subSetting}
                                                                name={fieldName}
                                                                helperText={err}
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