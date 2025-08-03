import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input with placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search stocks...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders custom placeholder when provided', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Custom placeholder" />);
    
    const searchInput = screen.getByPlaceholderText('Custom placeholder');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearch with debounced input', () => {
    vi.useFakeTimers();
    
    render(<SearchBar onSearch={mockOnSearch} />);
    
    // Clear any initial calls
    mockOnSearch.mockClear();
    
    const searchInput = screen.getByPlaceholderText('Search stocks...');
    fireEvent.change(searchInput, { target: { value: 'AAPL' } });
    
    // Should not call immediately
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    // Fast forward time to trigger debounced search
    vi.advanceTimersByTime(300);
    
    expect(mockOnSearch).toHaveBeenCalledWith('AAPL');
    
    vi.useRealTimers();
  });

  it('shows clear button when input has value', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search stocks...');
    fireEvent.change(searchInput, { target: { value: 'AAPL' } });
    
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search stocks...');
    fireEvent.change(searchInput, { target: { value: 'AAPL' } });
    
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);
    
    expect(searchInput).toHaveValue('');
  });

  it('calls onSearch with empty string when cleared', () => {
    vi.useFakeTimers();
    
    render(<SearchBar onSearch={mockOnSearch} />);
    
    // Clear any initial calls
    mockOnSearch.mockClear();
    
    const searchInput = screen.getByPlaceholderText('Search stocks...');
    fireEvent.change(searchInput, { target: { value: 'AAPL' } });
    
    vi.advanceTimersByTime(300);
    expect(mockOnSearch).toHaveBeenCalledWith('AAPL');
    
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('');
    
    vi.useRealTimers();
  });

  it('applies custom className when provided', () => {
    render(<SearchBar onSearch={mockOnSearch} className="custom-class" />);
    
    const container = screen.getByPlaceholderText('Search stocks...').closest('.search-bar-container');
    expect(container).toHaveClass('custom-class');
  });
}); 