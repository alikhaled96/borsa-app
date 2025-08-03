import axios from 'axios';
import type { AxiosResponse,AxiosError } from 'axios';
import type { StocksResponse } from '../types/index.js';

const API_BASE_URL = 'https://api.polygon.io';
const API_KEY = import.meta.env.VITE_POLYGON_API_KEY;


const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add API key
api.interceptors.request.use((config) => {
  if (!API_KEY) {
    throw new Error('Polygon API key is required. Please set VITE_POLYGON_API_KEY in your .env file');
  }
  
  config.params = {
    ...config.params,
    apiKey: API_KEY,
  };
  
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your Polygon API key.');
    }
    
    if (error.response?.status && error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    const errorMessage = error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data 
      ? (error.response.data as { message: string }).message 
      : 'An error occurred while fetching data.';
    throw new Error(errorMessage);
  }
);


export const stocksApi = {
  // Get stocks from Nasdaq exchange
  getStocks: async (
    limit: number = 50,
    offset: number = 0,
    search?: string
  ): Promise<StocksResponse> => {
    const params: Record<string, string | number> = {
      market: 'stocks',
      exchange: 'XNAS',
      limit,
      offset,
    };
    
    if (search) {
      params.search = search;
    }
        
    try {
      console.log('API request params:', params);
      const response: AxiosResponse<StocksResponse> = await api.get('/v3/reference/tickers', { params });
      console.log('API response:', { 
        count: response.data.count, 
        resultsLength: response.data.results.length,
        nextUrl: response.data.next_url 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw error;
    }
  },
  
  // Search stocks
  searchStocks: async (query: string, limit: number = 50): Promise<StocksResponse> => {
    return stocksApi.getStocks(limit, 0, query);
  },
};

export default api; 