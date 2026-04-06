import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './AppLayout'
import ScrollManager from './ScrollManager'
import { getRoutedSectionDefinitions } from './sections'
import HomePage from '../pages/HomePage'
import SectionPage from '../pages/SectionPage'

function AppRouter() {
  const routedSections = getRoutedSectionDefinitions()

  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          {routedSections.map((section) => {
            return (
              <Route
                key={section.key}
                path={section.path}
                element={
                  <SectionPage sectionKey={section.key as 'research' | 'software'} />
                }
              />
            )
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
