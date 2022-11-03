import React, { useMemo } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'

import palette from './palette'
import typography from './typography'
import GlobalStyles from './globalStyles'
import ComponentsOverrides from './overrides'

interface IThemeProviderProps {
    children: any
}

const ThemeProvider: React.FC<IThemeProviderProps> = (props: IThemeProviderProps) => {
    const themeOptions: any = useMemo(
        () => ({
            palette,
            shape: { borderRadius: 6 },
            typography,
            spacing: 10
        }),
        []
    )

    const theme = createTheme(themeOptions)
    theme.components = ComponentsOverrides(theme)

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                {props.children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    )
}

export default ThemeProvider