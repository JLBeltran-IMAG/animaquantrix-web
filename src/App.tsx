import AppRouter from './app/AppRouter'
import { LanguageProvider } from './app/LanguageContext'
import './styles/App.css'

function App() {
  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  )
}

export default App
