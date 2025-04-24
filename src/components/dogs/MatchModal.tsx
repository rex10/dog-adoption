import { useEffect, useRef } from 'react';
import { useDogsStore } from '../../stores/dog.store';
import Button from '../ui/Button';
import { useTheme } from '../../contexts/useTheme';


export default function MatchModal() {
  const { matchedDog, setMatchedDog } = useDogsStore();
  const modalRef = useRef<HTMLDivElement>(null);  // Reference for the modal
  const { darkMode } = useTheme();

  // Close the modal if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setMatchedDog(null); // Close modal when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setMatchedDog]);

  if (!matchedDog) return null;
  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-500/50'} flex items-center justify-center p-4`}>
      <div
        ref={modalRef}
        className={`rounded-lg p-6 max-w-md w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}
      >
        <h2 className="text-2xl font-bold mb-4">Your Perfect Match!</h2>
        <img
          src={matchedDog.img}
          alt={matchedDog.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> {matchedDog.name}</p>
          <p><span className="font-semibold">Breed:</span> {matchedDog.breed}</p>
          <p><span className="font-semibold">Age:</span> {matchedDog.age} years</p>
          <p><span className="font-semibold">Zip Code:</span> {matchedDog.zip_code}</p>
        </div>
        <Button
          onClick={() => setMatchedDog(null)}
          variant='secondary'
          className="mt-6 w-full"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
