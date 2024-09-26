import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import PodcastManagement from './pages/PodcastManagement';
import EpisodeDetails from './pages/EpisodeDetails';
import MarketingHub from './pages/MarketingHub';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import PrivateRoute from './components/common/PrivateRoute';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div className="main-content">
          {isAuthenticated && <Sidebar />}
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/podcasts"
                element={
                  <PrivateRoute>
                    <PodcastManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/episodes/:id"
                element={
                  <PrivateRoute>
                    <EpisodeDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/marketing"
                element={
                  <PrivateRoute>
                    <MarketingHub />
                  </PrivateRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <PrivateRoute>
                    <Analytics />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;