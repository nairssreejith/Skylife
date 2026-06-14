import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ink text-bone">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          {/* Legacy multi-page routes now redirect into the single-page anchors */}
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          {/* Anything else → home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
