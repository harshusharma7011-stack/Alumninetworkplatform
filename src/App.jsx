import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Directory from './pages/Directory';
import Jobs from './pages/Jobs';
import Mentorship from './pages/Mentorship';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Announcements from './pages/Announcements';
import Achievements from './pages/Achievements';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/login.html" element={<Navigate to="/login" replace />} />
            <Route path="/register.html" element={<Navigate to="/register" replace />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
            <Route path="/directory" element={<ProtectedRoute><Layout><Directory /></Layout></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Layout><Jobs /></Layout></ProtectedRoute>} />
            <Route path="/mentorship" element={<ProtectedRoute><Layout><Mentorship /></Layout></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><Layout><Events /></Layout></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Layout><Contact /></Layout></ProtectedRoute>} />
            <Route path="/announcements" element={<ProtectedRoute><Layout><Announcements /></Layout></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><Layout><Achievements /></Layout></ProtectedRoute>} />
            <Route path="/dashboard.html" element={<Navigate to="/dashboard" replace />} />
            <Route path="/profile.html" element={<Navigate to="/profile" replace />} />
            <Route path="/directory.html" element={<Navigate to="/directory" replace />} />
            <Route path="/jobs.html" element={<Navigate to="/jobs" replace />} />
            <Route path="/mentorship.html" element={<Navigate to="/mentorship" replace />} />
            <Route path="/events.html" element={<Navigate to="/events" replace />} />
            <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
            <Route path="/announcements.html" element={<Navigate to="/announcements" replace />} />
            <Route path="/achievements.html" element={<Navigate to="/achievements" replace />} />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
