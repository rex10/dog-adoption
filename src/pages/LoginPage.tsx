import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth.store';
import LoginForm from '../components/auth/LoginForm';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import { useTheme } from '../contexts/useTheme';

export default function LoginPage() {
  const { isAuthenticated, login, error } = useAuthStore();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    if (isAuthenticated) navigate('/search');
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <div className={`min-h-screen min-w-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
        <ErrorMessage message={error} />
        <LoginForm onSubmit={login} />
      </div>
    </>
  );
}