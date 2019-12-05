import React, { useState, useEffect } from 'react';
import './index.scss';

let interval;
function debounce(fn, delay) {
  if (interval) {
    window.clearTimeout(interval);
  }
  interval = window.setTimeout(() => {
    fn();
  }, delay);
}

const Autocomplete = ({ onChange, onItemSelect, results, loading }) => {
  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(results && results.length > 0);
    return () => {
      window.clearTimeout(interval);
    };
  }, [results]);

  const handleInput = e => {
    const { value } = e.target;
    if (typeof onChange === 'function') {
      debounce(() => onChange(value), 400);
    }
    setInput(value);
  };

  const handleItemSelect = item => {
    setInput(item.symbol);
    setShow(false);
    if (typeof onItemSelect === 'function') {
      onItemSelect(item);
    }
  };

  return (
    <div className="autocomplete">
      <input
        type="search"
        placeholder="Type to search"
        value={input}
        onChange={handleInput}
      />
      {loading && (
        <div className="dropdown">
          <div className="item">Loading...</div>
        </div>
      )}
      {show && (
        <div className="dropdown">
          {results.map((part, idx) => (
            <div
              key={idx}
              className="item"
              onClick={() => handleItemSelect(part)}
              tabIndex="-1"
            >
              {part.symbol} | {part.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
