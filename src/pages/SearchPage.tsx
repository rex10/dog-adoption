import { useEffect, useState } from 'react';
import BreedFilter from '../components/dogs/BreedFilter';
import SortSelect from '../components/dogs/SortSelect';
import DogsGrid from '../components/dogs/DogsGrid';
import Pagination from '../components/dogs/Pagination';
import MatchModal from '../components/dogs/MatchModal';
import { useDogsStore, } from '../stores/dog.store';
import { Dog, Location, LocationSearchParams, SearchParams } from '../types/dog.types';
import { getBreeds, getDogs, matchDog, searchDogs } from '../services/dog';
import { getLocations, searchLocations } from '../services/location';
import LocationFilter from '../components/dogs/LocationFilter';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import { useTheme } from '../contexts/useTheme';

const DEFAULT_SEARCH_PARAMS: SearchParams = {
  sort: 'breed:asc',
  from: 0,
  size: 25,
};

export default function SearchPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useState<SearchParams>(DEFAULT_SEARCH_PARAMS);
  const [loading, setLoading] = useState(false);
  const { favorites, setMatchedDog } = useDogsStore();
  const [locations, setLocations] = useState<Location[]>([]);
  const { darkMode } = useTheme();


  useEffect(() => {
    const fetchBreeds = async () => {
      const breeds = await getBreeds();
      setBreeds(breeds);
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      try {
        const { resultIds, total } = await searchDogs(searchParams);
        const dogs = await getDogs(resultIds);
        const zipCodes = dogs.map(dog => dog.zip_code)
        setDogs(dogs);
        const allLocations = await getLocations(zipCodes);
        setLocations(allLocations)
        setTotal(total);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, [searchParams]);


  const handlePageChange = (newPage: number) => {

    setSearchParams(prev => ({
      ...prev,
      from: newPage * (prev?.size || DEFAULT_SEARCH_PARAMS.size)
    }));
  };

  const handleMatch = async () => {
    if (favorites.length === 0) return;
    const matchId = await matchDog(favorites);
    const [matchedDog] = await getDogs([matchId]);
    setMatchedDog(matchedDog);
  };

  const handleLocationSearch = async (locationFilter: LocationSearchParams) => {
    try {
      setLoading(true)
      if (Object.keys(locationFilter).length > 0) {
        const { results } = await searchLocations(locationFilter);
        
        if(results.length === 0){
          throw new Error("No locations found matching your criteria");
        }

        setLocations(results);
        
        setSearchParams(prev => ({
          ...prev,
          zipCodes: results.map(l => l.zip_code),
          from: 0
        }));
      } else {
        setSearchParams(DEFAULT_SEARCH_PARAMS);
      }
    } catch (error) {
      console.error('Location search failed:', error);
      setLocations([]);
      setSearchParams(DEFAULT_SEARCH_PARAMS);
    } finally {
      setLoading(false)
    }
  };


  return (
    <div className={`min-h-screen w-full ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50'}`}>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <BreedFilter
              breeds={breeds}
              onChange={(selectedBreeds) => setSearchParams(prev => ({ ...prev, breeds: selectedBreeds }))}
            />
            <SortSelect
              sort={searchParams?.sort}
              onChange={(sort) => setSearchParams({ ...searchParams, sort })}
            />
            <LocationFilter
              onSearch={handleLocationSearch}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <DogsGrid dogs={dogs} loading={loading} locations={locations} />

            <Pagination
              currentPage={Math.floor(searchParams?.from / searchParams?.size)}
              totalItems={total}
              pageSize={searchParams?.size}
              onPageChange={handlePageChange}
            />

            <div className="mt-6 text-center">
              <Button
                variant='secondary'
                onClick={handleMatch}
                disabled={favorites.length === 0}
              >
                Find Your Match ({favorites.length})
              </Button>
            </div>
          </div>
        </div>

        <MatchModal />
      </div>
    </div>
  );
}