import React from 'react';
import type { Stock } from '../types/index.js';

interface StockCardProps {
  stock: Stock;
  onClick?: (stock: Stock) => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(stock);
    }
  };

  const formatMarketCap = (marketCap?: number) => {
    if (!marketCap) return 'N/A';
    
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  const getStatusColor = (active: boolean) => {
    return active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div 
      className={`bg-white h-full rounded-xl shadow-lg border border-gray-100 hover:shadow-xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2">
          <span className="text-2xl md:text-xl font-bold text-gray-900 tracking-wide">
            {stock.ticker}
          </span>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(stock.active)}`}>
            {stock.active ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="flex-shrink-0">
          <span className="bg-gradient-to-r from-gradient-start to-gradient-end text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {stock.primary_exchange}
          </span>
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg md:text-base font-semibold text-gray-800 mb-4 line-clamp-2" title={stock.name}>
          {stock.name}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600 font-medium">Market Cap:</span>
            <span className="text-sm text-gray-900 font-semibold">{formatMarketCap(stock.market_cap)}</span>
          </div>
          
          {stock.currency_name && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600 font-medium">Currency:</span>
              <span className="text-sm text-gray-900 font-semibold">{stock.currency_name}</span>
            </div>
          )}
          
          {stock.type && (
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600 font-medium">Type:</span>
              <span className="text-sm text-gray-900 font-semibold">{stock.type}</span>
            </div>
          )}
        </div>
        
        {stock.description && (
          <p className="text-sm text-gray-600 line-clamp-3" title={stock.description}>
            {stock.description.length > 100 
              ? `${stock.description.substring(0, 100)}...` 
              : stock.description
            }
          </p>
        )}
      </div>
      
      {stock.branding?.logo_url && (
        <div className="absolute top-4 right-4 w-10 h-10 md:w-8 md:h-8 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
          <img 
            src={stock.branding.logo_url} 
            alt={`${stock.name} logo`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StockCard; 