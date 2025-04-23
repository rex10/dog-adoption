// components/auth/LoginForm.tsx
import { useState } from 'react';
import { useAuthStore } from '../../stores/auth.store';
import Button from '../ui/Button';

interface LoginFormProps {
  onSubmit: (name: string, email: string) => Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {

  const { isLoading } = useAuthStore()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(name, email);
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow-lg rounded-xl sm:px-10 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-lg border-gray-300 shadow-sm text-gray-900
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                         transition-all duration-200 px-4 py-3"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border-gray-300 shadow-sm text-gray-900
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                         transition-all duration-200 px-4 py-3 "
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 
                      rounded-lg 
                      ${isLoading && 'bg-indigo-200! cursor-not-allowed'}
                      focus:outline-none! `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}