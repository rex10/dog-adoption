
import { useEffect, useRef, useState } from 'react'

interface BreedFilterProps {
  breeds: string[];
  onChange: (breeds: string[]) => void;
}

export default function BreedFilter({ breeds, onChange }: BreedFilterProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTempSelected(selected)
    }
  }, [isOpen, selected])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef?.current && !wrapperRef?.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (breed: string) => {
    const newSelected = tempSelected?.includes(breed)
      ? tempSelected?.filter(b => b !== breed)
      : [...tempSelected, breed];
    setTempSelected(newSelected)
  };

  const handleSearch = () => {
    setSelected(tempSelected);
    onChange(tempSelected);
    setIsOpen(false);
  }
  return (
    <div className="space-y-2 bg-white p-4 rounded-lg shadow-lg border border-gray-100" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700">Filter by Breed</label>

      <div className="relative">
        <div
          className="w-full text-left pl-3 pr-8 py-2 border border-gray-300 rounded-md cursor-pointer 
                           hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          onClick={toggleDropdown}
        >
          <div className="flex flex-wrap gap-1">
            {tempSelected?.length === 0 ? (
              <span className="text-gray-400">Select breeds...</span>
            ) : (
              tempSelected?.map(breed => (
                <span
                  key={breed}
                  className="bg-indigo-100 h-5 text-indigo-800 text-sm px-2 py-2 rounded-full flex items-center"
                >
                  {breed}
                  <button
                    type="button"
                    className="ml-1 p-0! border-none! focus:outline-none! bg-transparent! text-indigo-400 hover:text-indigo-900 "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(breed);
                    }}
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>


          <div className="absolute inset-y-0 right-0 flex items-center">
            {isOpen ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearch();
                }}
                className="hover:text-indigo-600 text-indigo-300 !bg-transparent 
                            !border-0 !outline-none
                            focus:!outline-none focus:!ring-0
                            hover:!outline-none hover:!ring-0"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            ) : (
              <svg
                className={`h-5 w-5 text-gray-900 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white shadow-lg border border-gray-200">
            <div className="p-2 space-y-1">
              {breeds.map(breed => (
                <label
                  key={breed}
                  className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={tempSelected?.includes(breed)}
                    onChange={() => setTempSelected(prev => 
                      prev.includes(breed)
                      ? prev.filter(b => b !== breed)
                      : [...prev, breed]
                    )}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">{breed}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div >
  );
}