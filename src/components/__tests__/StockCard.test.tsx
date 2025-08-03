import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StockCard from '../StockCard';
import type { Stock } from '../../types/index.js';

const mockStock: Stock = {
  ticker: 'AAPL',
  name: 'Apple Inc.',
  market: 'stocks',
  locale: 'us',
  primary_exchange: 'NASDAQ',
  type: 'CS',
  active: true,
  currency_name: 'usd',
  cik: '0000320193',
  composite_figi: 'BBG000B9XRY4',
  share_class_figi: 'BBG001SCTQY4',
  market_cap: 3000000000000,
  phone_number: '1-408-996-1010',
  address: {
    address1: 'ONE APPLE PARK WAY',
    city: 'CUPERTINO',
    state: 'CA',
    postal_code: '95014',
    country: 'US',
  },
  description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables and accessories worldwide.',
  sic_code: '3571',
  sic_description: 'ELECTRONIC COMPUTERS',
  ticker_root: 'AAPL',
  homepage_url: 'https://www.apple.com',
  total_employees: 164000,
  list_date: '1980-12-12',
  branding: {
    logo_url: 'https://api.polygon.io/v1/reference/tickers/AAPL/logo',
    icon_url: 'https://api.polygon.io/v1/reference/tickers/AAPL/icon',
  },
  share_class_shares_outstanding: 15728701500,
  weighted_shares_outstanding: 15728701500,
};

describe('StockCard', () => {
  it('renders stock information correctly', () => {
    render(<StockCard stock={mockStock} />);
    
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('NASDAQ')).toBeInTheDocument();
    expect(screen.getByText('$3.00T')).toBeInTheDocument();
    expect(screen.getByText('usd')).toBeInTheDocument();
    expect(screen.getByText('CS')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const mockOnClick = vi.fn();
    render(<StockCard stock={mockStock} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockStock);
  });

  it('renders inactive status correctly', () => {
    const inactiveStock = { ...mockStock, active: false };
    render(<StockCard stock={inactiveStock} />);
    
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('handles missing optional fields gracefully', () => {
    const minimalStock: Stock = {
      ticker: 'TEST',
      name: 'Test Company',
      market: 'stocks',
      locale: 'us',
      primary_exchange: 'NASDAQ',
      type: 'CS',
      active: true,
      currency_name: 'usd',
    };
    
    render(<StockCard stock={minimalStock} />);
    
    expect(screen.getByText('TEST')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument(); // Market cap
  });

  it('formats market cap correctly for different values', () => {
    const billionStock = { ...mockStock, market_cap: 1500000000 };
    const millionStock = { ...mockStock, market_cap: 50000000 };
    const smallStock = { ...mockStock, market_cap: 1000000 };
    
    const { rerender } = render(<StockCard stock={billionStock} />);
    expect(screen.getByText('$1.50B')).toBeInTheDocument();
    
    rerender(<StockCard stock={millionStock} />);
    expect(screen.getByText('$50.00M')).toBeInTheDocument();
    
    rerender(<StockCard stock={smallStock} />);
    expect(screen.getByText('$1.00M')).toBeInTheDocument();
  });

  it('truncates long descriptions', () => {
    const longDescriptionStock = {
      ...mockStock,
      description: 'A'.repeat(150),
    };
    
    render(<StockCard stock={longDescriptionStock} />);
    
    const description = screen.getByText(/A{100}\.\.\./);
    expect(description).toBeInTheDocument();
  });

  it('renders company logo when available', () => {
    render(<StockCard stock={mockStock} />);
    
    const logo = screen.getByAltText('Apple Inc. logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', mockStock.branding?.logo_url);
  });

  it('hides logo on error', () => {
    render(<StockCard stock={mockStock} />);
    
    const logo = screen.getByAltText('Apple Inc. logo');
    fireEvent.error(logo);
    
    expect(logo).toHaveStyle({ display: 'none' });
  });

  it('is not clickable when no onClick is provided', () => {
    render(<StockCard stock={mockStock} />);
    
    const card = screen.getByText('AAPL').closest('.stock-card');
    expect(card).not.toHaveAttribute('role', 'button');
    expect(card).not.toHaveClass('clickable');
  });

  it('is clickable when onClick is provided', () => {
    const mockOnClick = vi.fn();
    render(<StockCard stock={mockStock} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveClass('clickable');
  });
}); 