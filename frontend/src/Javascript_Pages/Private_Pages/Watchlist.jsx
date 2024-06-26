import React, { useState, useEffect } from 'react';
import '../../Styling_Pages/Private_Pages/Watchlist.css';
import api from '../../api'; // Replace with the path to your API
import { Line } from 'react-chartjs-2';
import Stock_Line_Graph from '../Static_Elements/Stock_Line_Graph';

function Watchlist() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchSearchResults = async () => {
    try {
      const response = await api.get(`/stocks/search-keyword/${searchTerm}`);
      if (Array.isArray(response.data.bestMatches)) {
        setSearchResults(response.data.bestMatches);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (searchTerm) {
      const timeoutId = setTimeout(() => {
        fetchSearchResults();
      }, 500); // delay of 500ms

      setSearchTimeout(timeoutId);
    }
  }, [searchTerm]);

  return (
    <div className="watchlist-container">
    <div className="grid-container">
        <div className="search-bar">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            placeholder="Search for a stock..." 
          />
          {searchResults.length > 0 && (
            <select className="dropdown-menu">
              <option>Select a stock...</option>
              {searchResults.map(result => (
                <option key={result['1. symbol']} value={result['1. symbol']}>
                  {result['1. symbol']} - {result['2. name']}
                </option>
              ))}
            </select>
          )}
        </div>
      
      <div className="stock-and-widgets">
        <div className="stock-watchlist">
          {Stock_Line_Graph({ symbol: 'AAPL', time_period: 'WEEKLY' })}
        </div>
        <div className="analytics-widgets">
          {/* Your content here */}
        </div>
      </div>
      
      <div className="my-portfolio">
        {/* Your content here */}
      </div>
      <div className="inner-box2">
        {/* Your content here */}
      </div>
      <div className="inner-box3">
        {/* Your content here */}
      </div>
    </div>
    </div>
  );
}

export default Watchlist;