import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function AppLayout() {
  return (
    <main id="top" className="app-shell">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default AppLayout
