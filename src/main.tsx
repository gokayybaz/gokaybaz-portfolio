import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { ContentProvider } from './content/ContentContext'
import { LanguageProvider } from './i18n/LanguageContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
