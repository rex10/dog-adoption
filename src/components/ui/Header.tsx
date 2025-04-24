import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from '../../stores/auth.store';
import Button from './Button';
import { useTheme } from '../../contexts/useTheme';

const Header = () => {
    const { isAuthenticated, logout } = useAuthStore()
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <header className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-300'} text-white shadow-lg`}>
            <div className="max-w-8xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-5xl max-sm:text-3xl font-bold">Fetch Dog Adoption</h1>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className="rounded-lg hover:opacity-20 !bg-transparent mr-6 transition-colors !p-0 !border-0
              hover:!outline-none focus:!outline-none"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <SunIcon className="h-6 w-6" />
                        ) : (
                            <MoonIcon className="h-6 w-6" />
                        )}
                    </button>

                    {isAuthenticated &&
                        <Button
                            variant='secondary'
                            onClick={logout}
                            className="mr-3"
                        >
                            Logout
                        </Button>}
                </div>
            </div>
        </header>
    );
};

export default Header;