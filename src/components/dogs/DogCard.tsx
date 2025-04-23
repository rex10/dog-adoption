import { useDogsStore } from "../../stores/dog.store";
import { Dog, Location } from "../../types/dog.types";


interface DogCardProps {
  dog: Dog;
  location:Location;
}

export default function DogCard({ dog, location }: DogCardProps) {
  const { favorites, addFavorite, removeFavorite } = useDogsStore();
  const isFavorite = favorites.includes(dog.id);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={dog.img}
        alt={dog.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{dog.name}</h3>
          <button
            onClick={() => isFavorite ? removeFavorite(dog.id) : addFavorite(dog.id)}
            className={`rounded-full !p-0 !border-0 !bg-transparent
                        focus:!outline-none focus:!ring-0 
                        hover:!outline-none hover-!ring-0
                        ${isFavorite 
                          ? 'text-red-500' 
                          : 'text-gray-400'}`}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p>Breed: {dog?.breed}</p>
          <p>Age: {dog?.age} years</p>
          <p>County: {location?.county}</p>
          <p>State: {location?.state}</p>
          <p>City: {location?.city}</p>
          <p>Zip Code: {dog?.zip_code}</p>
        </div>
      </div>
    </div>
  );
}