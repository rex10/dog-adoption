import { useState } from 'react';
import { LocationSearchParams } from '../../types/dog.types';
import Button from '../ui/Button';

interface LocationFilterProps {
  onSearch: (params: LocationSearchParams) => Promise<void>;
}

export default function LocationFilter({ onSearch }: LocationFilterProps) {
  const [city, setCity] = useState('');
  const [states, setStates] = useState('');
  const [bbox, setBbox] = useState({
    top: '',
    left: '',
    bottom: '',
    right: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hasValues = Object.values(bbox).some(value => value == "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const searchParams: LocationSearchParams = {};

      if (city) searchParams.city = city;
      if (states) searchParams.states = states.split(',').map(s => s.trim());

      if (bbox.top && bbox.left && bbox.bottom && bbox.right) {
        searchParams.geoBoundingBox = {
          top: parseFloat(bbox.top),
          left: parseFloat(bbox.left),
          bottom: parseFloat(bbox.bottom),
          right: parseFloat(bbox.right)
        };
      }

      await onSearch(searchParams);
    } catch (err) {
      setError(`Failed to search locations. Please check your inputs. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Location Filters</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* City Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border text-gray-900 rounded-lg "
            placeholder="Enter city name"
          />
        </div>

        {/* States Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            States (comma-separated)
          </label>
          <input
            type="text"
            value={states}
            onChange={(e) => setStates(e.target.value)}
            className="w-full px-3 py-2 border text-gray-900 rounded-lg"
            placeholder="e.g., CA, NY, TX"
          />
        </div>

        {/* Bounding Box */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Geographic Bounding Box
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              step="any"
              placeholder="Top latitude"
              value={bbox.top}
              onChange={(e) => setBbox({ ...bbox, top: e.target.value })}
              className="px-3 py-2 border text-gray-900 rounded-lg"
            />
            <input
              type="number"
              step="any"
              placeholder="Left longitude"
              value={bbox.left}
              onChange={(e) => setBbox({ ...bbox, left: e.target.value })}
              className="px-3 py-2 border text-gray-900 rounded-lg"
            />
            <input
              type="number"
              step="any"
              placeholder="Bottom latitude"
              value={bbox.bottom}
              onChange={(e) => setBbox({ ...bbox, bottom: e.target.value })}
              className="px-3 py-2 border text-gray-900 rounded-lg"
            />
            <input
              type="number"
              step="any"
              placeholder="Right longitude"
              value={bbox.right}
              onChange={(e) => setBbox({ ...bbox, right: e.target.value })}
              className="px-3 py-2 border text-gray-900 rounded-lg"
            />
          </div>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <Button
          variant='secondary'
          type="submit"
          disabled={loading || city === '' && states === '' && hasValues}
          className={`w-full py-2 px-4 rounded-lg transition-colors ${loading && 'bg-indigo-400 cursor-not-allowed'
            } text-white font-medium`}
        >
          {loading ? 'Searching...' : 'Search Locations'}
        </Button>
      </form>
    </div>
  );
}