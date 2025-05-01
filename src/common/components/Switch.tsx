import { useState } from "react"
import { styled, FormControl, InputLabel, Box } from "@mui/material"
import { SetState } from '../types';

// Custom styled switch container that mimics the TextField outlined variant
const OutlinedSwitchContainer = styled(FormControl)(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    "& .MuiInputLabel-root": {
        position: "absolute",
        left: 10,
        top: 0,
        transform: "translate(0, -9px) scale(0.75)",
        transformOrigin: "left top",
        backgroundColor: theme.palette.background.paper,
        padding: "0 5px",
        pointerEvents: "none",
        color: theme.palette.text.secondary,
        zIndex: 1,
        transition: theme.transitions.create(["color", "transform"], {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut,
        }),
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: theme.palette.primary.main,
    },
}))

// Custom switch that fills the entire container
const FullSizeSwitch = styled("div")<{ checked: boolean; focused: boolean }>(({ theme, checked, focused }) => ({
    position: "relative",
    width: "100%",
    height: 38,
    borderRadius: theme.shape.borderRadius,
    border: focused
        ? `2px solid ${theme.palette.primary.main}`
        : `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
    transition: theme.transitions.create(["background-color", "border-color"], {
        duration: theme.transitions.duration.shorter,
    }),
    cursor: "pointer",
    overflow: "hidden",
    backgroundColor: checked ? "rgba(25, 118, 210, 0.08)" : "transparent",
    "&:hover": {
        borderColor: theme.palette.text.primary,
        backgroundColor: checked ? "rgba(25, 118, 210, 0.12)" : "rgba(0, 0, 0, 0.04)",
    },
    // Square thumb with rounded corners
    "&::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        // Position at extreme left (0) when off, extreme right (100% - thumb width) when on
        left: checked ? "calc(67% - 14px)" : "14px", // 4px buffer from the edge
        transform: "translateY(-50%)",
        width: '33%',
        height: 24,
        borderRadius: "3px", // Rounded corners for square thumb
        backgroundColor: checked ? theme.palette.primary.main : theme.palette.grey[500],
        transition: theme.transitions.create(["left", "background-color"], {
            duration: theme.transitions.duration.standard,
        }),
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    },
}))

// Hidden input for accessibility
const HiddenInput = styled("input")({
    opacity: 0,
    width: 0,
    height: 0,
    position: "absolute",
})

export function Switch(
    { label = 'label', checked, handleClick , ...props}:
        { label?: string, checked: boolean, handleClick: () => any }
) {
    const [focused, setFocused] = useState(false)

    return (
        <Box sx={{ width: "100%" }}>
            <OutlinedSwitchContainer>
                <InputLabel
                    htmlFor="full-size-switch"
                    focused={focused}
                    shrink
                    className={focused ? "Mui-focused" : ""}
                    sx={{
                        position: 'relative'
                    }}
                >
                    {label}
                </InputLabel>
                {/* <Box> */}
                {/* <HiddenInput
                        type="checkbox"
                        id="full-size-switch"
                        checked={checked}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    /> */}
                <FullSizeSwitch
                    checked={checked}
                    focused={focused}
                    onClick={handleClick}
                    aria-hidden="true"
                    role="presentation"
                    {...props}
                />
                {/* </Box> */}
            </OutlinedSwitchContainer>
        </Box>
    )
}
