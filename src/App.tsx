import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ExpertisePage from './pages/ExpertisePage'
import ArticlesPage from './pages/ArticlesPage'
import ArticlePage from './pages/ArticlePage'
import StaticProfilePage from './pages/StaticProfilePage'
import ProjectsPage from './pages/ProjectsPage'
import { AdminApp } from './admin/AdminApp'
import { ScrollToTop } from './components/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/en" element={<HomePage />} />
        <Route path="/hakkimda" element={<StaticProfilePage section="about" />} />
        <Route path="/en/hakkimda" element={<StaticProfilePage section="about" />} />
        <Route path="/deneyim" element={<StaticProfilePage section="experience" />} />
        <Route path="/en/deneyim" element={<StaticProfilePage section="experience" />} />
        <Route path="/iletisim" element={<StaticProfilePage section="contact" />} />
        <Route path="/en/iletisim" element={<StaticProfilePage section="contact" />} />
        <Route path="/projeler" element={<ProjectsPage />} />
        <Route path="/en/projeler" element={<ProjectsPage />} />
        <Route path="/yazilar" element={<ArticlesPage />} />
        <Route path="/en/yazilar" element={<ArticlesPage />} />
        <Route path="/uzmanlik/:slug" element={<ExpertisePage />} />
        <Route path="/en/uzmanlik/:slug" element={<ExpertisePage />} />
        <Route path="/yazilar/:slug" element={<ArticlePage />} />
        <Route path="/en/yazilar/:slug" element={<ArticlePage />} />
        <Route path="/projeler/:slug" element={<ProjectDetailPage />} />
        <Route path="/en/projeler/:slug" element={<ProjectDetailPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/en/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </>
  )
}
