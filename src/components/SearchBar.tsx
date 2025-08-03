import React, { useState, useEffect, useCallback } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search stocks...", 
  className = "" 
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return (searchQuery: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onSearch(searchQuery);
          setIsSearching(false);
        }, 300);
      };
    })(),
    [onSearch]
  );

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      debouncedSearch(query);
    } else if (query === '') {
      onSearch('');
    }
  }, [query, debouncedSearch, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative flex items-center bg-white rounded-xl shadow-lg transition-all duration-300 focus-within:shadow-xl focus-within:-translate-y-0.5">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="flex-1 border-none outline-none px-3 py-4 text-gray-900 bg-transparent placeholder-gray-500"
        />
        
        {query && (
          <button
            onClick={handleClear}
            className="p-2 mr-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="m15 9-6 6" strokeWidth="2"/>
              <path d="m9 9 6 6" strokeWidth="2"/>
            </svg>
          </button>
        )}
        
        {isSearching && (
          <div className="mr-4">
            <div className="w-4 h-4 border-2 border-gray-200 border-t-primary-500 rounded-full animate-spin-slow"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 