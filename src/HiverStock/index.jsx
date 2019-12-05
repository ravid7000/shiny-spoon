import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from '../Components/Autocomplete';
import StockDetails from '../Components/StockDetails';

const HiverStock = ({ dispatch, loading, search, series }) => {
  const handleSearch = e =>
    dispatch({
      type: 'search',
      args: e
    });

  const handleSelect = item =>
    dispatch({
      type: 'series',
      args: item
    });

  return (
    <div className="container">
      <Autocomplete
        loading={loading}
        results={search}
        onChange={handleSearch}
        onItemSelect={handleSelect}
      />

      <StockDetails loading={loading} stock={series} />
    </div>
  );
};

export default connect(s => s)(HiverStock);
