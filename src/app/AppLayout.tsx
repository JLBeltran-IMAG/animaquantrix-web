import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function AppLayout() {
  return (
    <div id="top" className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content / Ir al contenido</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
