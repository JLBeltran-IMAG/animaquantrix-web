import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './AppLayout'
import ScrollManager from './ScrollManager'
import { getRoutedSectionDefinitions } from './sections'
import HomePage from '../pages/HomePage'
import ResearchPage from '../pages/ResearchPage'
import SoftwarePage from '../pages/SoftwarePage'

function AppRouter() {
  const routedSections = getRoutedSectionDefinitions()

  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          {routedSections.map((section) => {
            const element =
              section.key === 'research' ? <ResearchPage /> : <SoftwarePage />

            return (
              <Route key={section.key}>
                <Route path={section.path} element={element} />
                <Route path={`${section.path}/:slug`} element={element} />
              </Route>
            )
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
