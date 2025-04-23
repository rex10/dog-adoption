import DogCard from './DogCard';
import Loader from '../ui/Loader';
import { Dog, Location } from '../../types/dog.types';

interface DogsGridProps {
  dogs: Dog[];
  loading: boolean;
  locations: Location[];
}

export default function DogsGrid({ dogs, loading, locations }: DogsGridProps) {
  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dogs.map((dog) => {
        const location = locations.find(loc => loc?.zip_code === dog?.zip_code);

        return (
          <DogCard
            key={dog.id}
            dog={dog}
            location={location!}
          />
        );
      })}
      {dogs.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
          No dogs found matching your criteria
        </div>
      )}
    </div>
  );
}