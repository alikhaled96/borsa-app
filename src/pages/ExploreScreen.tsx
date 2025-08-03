import React, { useCallback, useRef } from 'react';
import { useStocks } from '../hooks/useStocks';
import SearchBar from '../components/SearchBar';
import StockCard from '../components/StockCard';
import type { Stock } from '../types/index.js';

const ExploreScreen: React.FC = () => {
  const {
    stocks,
    loading,
    hasError,
    errorMessage,
    searchQuery,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
    updateSearch,
    clearSearch,
    refetch,
  } = useStocks();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastStockRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || isFetchingNextPage) return;
      
      if (observerRef.current) observerRef.current.disconnect();
      
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          loadMore();
        }
      });
      
      if (node) observerRef.current.observe(node);
    },
    [loading, isFetchingNextPage, hasNextPage, loadMore]
  );

  const handleStockClick = (stock: Stock) => {
    console.log('Stock clicked:', stock);
    // TODO: Navigate to stock detail page or show modal
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fcfc9a] to-[#8cfc8c] p-5 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-5xl font-bold md:text-4xl lg:text-6xl text-gradient">
            BORSA
          </h1>
        </div>

        <div className="mb-10">
          <SearchBar 
            onSearch={updateSearch}
            placeholder="Search stocks by ticker or company name..."
          />
          
          {searchQuery && (
            <div className="flex justify-between items-center p-4 mt-4 bg-white rounded-xl shadow-sm">
              <span className="text-sm font-medium text-gray-600">
                {stocks.length} result{stocks.length !== 1 ? 's' : ''} for "{searchQuery}"
              </span>
              <button 
                onClick={clearSearch} 
                className="px-3 py-1 text-sm font-semibold rounded-lg transition-colors text-primary-600 hover:text-primary-700 hover:bg-primary-50"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        <div className="mx-auto max-w-7xl">
          {hasError ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="p-8 max-w-md text-center bg-white rounded-2xl shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">Something went wrong</h3>
                <p className="mb-6 text-gray-600">{errorMessage}</p>
                <button onClick={handleRetry} className="btn-primary">
                  Try Again
                </button>
              </div>
            </div>
          ) : loading && stocks.length === 0 ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="text-center">
                <div className="mx-auto mb-4 w-10 h-10 rounded-full border-4 border-gray-200 border-t-primary-500 animate-spin-slow"></div>
                <p className="text-gray-600">Loading stocks...</p>
              </div>
            </div>
          ) : stocks.length === 0 ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="p-8 max-w-md text-center bg-white rounded-2xl shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">No stocks found</h3>
                <p className="mb-6 text-gray-600">
                  {searchQuery 
                    ? `No stocks match your search for "${searchQuery}"`
                    : 'No stocks available at the moment'
                  }
                </p>
                {searchQuery && (
                  <button onClick={clearSearch} className="btn-primary">
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {stocks.map((stock, index) => (
                <div
                  key={`${stock.ticker}-${index}`}
                  ref={index === stocks.length - 1 ? lastStockRef : undefined}
                >
                  <StockCard 
                    stock={stock} 
                    onClick={handleStockClick}
                  />
                </div>
              ))}
            </div>
          )}

          {isFetchingNextPage && (
            <div className="flex gap-3 justify-center items-center py-8 text-gray-600">
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 border-t-primary-500 animate-spin-slow"></div>
              <p className="text-sm">Loading more stocks...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreScreen; 