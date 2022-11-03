import { alpha } from '@mui/material/styles'

const Input = (theme: any): any => {
    return {
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: '14px'
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        '& svg': { color: theme.palette.text.disabled },
                    },
                    fontSize: '14px'
                },
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: theme.palette.text.disabled,
                    },
                    padding: '15px'
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                underline: {
                    '&:before': {
                        borderBottomColor: alpha(theme.palette.grey[500], 0.56),
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha(theme.palette.grey[500], 0.12),
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.grey[500], 0.16),
                    },
                    '&.Mui-focused': {
                        backgroundColor: theme.palette.action.focus,
                    },
                    '&.Mui-disabled': {
                        backgroundColor: theme.palette.action.disabledBackground,
                    },
                },
                underline: {
                    '&:before': {
                        borderBottomColor: alpha(theme.palette.grey[500], 0.56),
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha(theme.palette.grey[500], 0.32),
                    },
                    '&.Mui-disabled': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.action.disabledBackground,
                        },
                    },
                },
                input: {
                    padding: '15px'
                },
            },
        },
    }
}

export default Input