import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminPanel } from './components/admin/AdminPanel';
import { usePhotos } from './hooks/usePhotos';
import About  from './components/pages/About';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

function App() {
  const { photos, fetchPhotos } = usePhotos();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home photos={photos} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminPanel photos={photos} onPhotoChange={fetchPhotos} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;