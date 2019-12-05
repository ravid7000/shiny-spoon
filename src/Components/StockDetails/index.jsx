import React from 'react';
import StockGraph from '../StockGraph';
import './index.scss';

const StockDetails = ({ stock, loading }) => {
  if (!stock) {
    return (
      <div className="card text-center">
        Search any stock to see the details
      </div>
    );
  }

  return (
    <div className="stock-details">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {stock.meta && (
            <div className="card">
              {stock.meta.symbol} | {stock.meta.currency}
              <div className="name">
                {stock.meta.name} ({stock.meta.outputSize || stock.meta.region})
              </div>
              <div className="info">{stock.meta.information}</div>
            </div>
          )}
          {stock.timeSeries && (
            <div className="card">
              <div className="card-title">Stock Price Chart</div>
              <StockGraph timeSeries={stock.timeSeries} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StockDetails;
