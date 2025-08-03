import { useState, useCallback } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { stocksApi } from '../services/api';
import type { StocksResponse } from '../types/index.js';

export const useStocks = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Infinite query for pagination
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['stocks', searchQuery],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      stocksApi.getStocks(50, pageParam, searchQuery || undefined),
    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more results to fetch
      if (lastPage.next_url && lastPage.results.length > 0) {
        // Calculate the next offset based on the current page parameter
        const currentOffset = allPages.length * 50;
        console.log('Next page param:', { 
          currentOffset, 
          resultsLength: lastPage.results.length, 
          hasNextUrl: !!lastPage.next_url,
          totalPages: allPages.length 
        });
        return currentOffset;
      }
      return undefined;
    },
    enabled: !searchQuery, // Only use infinite query when not searching
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  // Search query
  const {
    data: searchData,
    isLoading: isSearching,
    isError: isSearchError,
    error: searchError,
  } = useQuery({
    queryKey: ['stocks-search', searchQuery],
    queryFn: () => stocksApi.searchStocks(searchQuery),
    enabled: !!searchQuery,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });

  // Get all stocks from infinite query
  const allStocks = data?.pages.flatMap((page: StocksResponse) => page.results) || [];
  
  // Get stocks from search or infinite query
  const stocks = searchQuery ? (searchData?.results || []) : allStocks;
  
  // Loading state
  const loading = isLoading || isSearching;
  
  // Error state
  const hasError = isError || isSearchError;
  const errorMessage = error?.message || searchError?.message;

  // Load more stocks
  const loadMore = useCallback(() => {
    if (!searchQuery && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [searchQuery, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Update search query
  const updateSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    stocks,
    loading,
    hasError,
    errorMessage,
    searchQuery,
    hasNextPage: !searchQuery && hasNextPage,
    isFetchingNextPage,
    loadMore,
    updateSearch,
    clearSearch,
    refetch,
  };
}; 