import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth.store';
import Loader from './components/ui/Loader';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {

    return (
      <div className='min-w-screen min-h-screen'>
        <Loader />;
      </div>)
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ErrorBoundary
          fallback={
            <div className="p-4 bg-blue-50 text-blue-400">
              Custom Error Message - Please refresh the page
            </div>
          }
        >
          <Routes>
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/search" /> : <LoginPage />
            } />
            <Route path="/search" element={
              isAuthenticated ? <SearchPage /> : <Navigate to="/" />
            } />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}