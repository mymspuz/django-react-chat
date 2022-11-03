import React from 'react'
import ReactDOM from 'react-dom/client'

import ThemeProvider from './presentation/theme'
import MainRouter from './main/routes'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
      <ThemeProvider>
          <MainRouter />
      </ThemeProvider>
  </React.StrictMode>
)