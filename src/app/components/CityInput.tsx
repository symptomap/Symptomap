import React, { useState } from "react";
import { MapPin } from "lucide-react";

// Mock city data - in a real app, this would come from an API
const popularCities = [
  "London", "Manchester", "Birmingham", "Glasgow", "Liverpool",
  "Bristol", "Edinburgh", "Leeds", "Sheffield", "Cardiff",
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Paris", "Berlin", "Madrid", "Rome", "Amsterdam"
];

interface CityInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
}

export function CityInput({ value, onChange, label, required, error }: CityInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities = popularCities.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (city: string) => {
    setSearch(city);
    onChange(city);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      {label && (
        <label className="text-sm text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            className="flex h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for a city"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onChange(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        {isOpen && search && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredCities.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No cities found</div>
            ) : (
              filteredCities.map((city) => (
                <div
                  key={city}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50"
                  onClick={() => handleSelect(city)}
                >
                  {city}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}