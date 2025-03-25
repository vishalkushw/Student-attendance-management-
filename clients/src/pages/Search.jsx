import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Search by name or date
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!searchName && !searchDate) {
        setMessage('Please provide either a name or date to search');
        setLoading(false);
        return;
      }

      if (!searchName && searchDate) {
        
        const { data } = await axios.get(
          `http://localhost:8000/student/attendance?date=${searchDate}`
        );
        setSearchResults(data);
        if (data.length === 0) {
          setMessage('No attendance records found for this date');
        }
      } else {
      
        let url = `http://localhost:8000/student/search?name=${searchName}`;
        
      
        if (searchDate) {
          url += `&date=${searchDate}`;
        }
        
        const { data } = await axios.get(url);
        setSearchResults(data);
        if (data.length === 0) {
          setMessage('No students found with this name');
        }
      }
    } catch (error) {
      console.error('Search failed:', error);
      setMessage(error.response?.data?.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Students</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-inputs">
          <div className="form-group">
            <label>Search by Student Name:</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Enter student name"
              className="form-control"
            />
          </div>
          <br />
          
          <div className="form-group">
            <label>Search by Date:</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="search-button"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      {searchResults.length > 0 && (
        <div className="results-container">
          <h3>Search Results {searchDate && `(Date: ${searchDate})`}</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Class</th>
                <th>Email</th>
                <th>Attendance Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.rollNo}>
                  <td>{result.rollNo}</td>
                  <td>{result.name}</td>
                  <td>{result.className}</td>
                  <td>{result.email}</td>
                  <td>
                    <span className={`status-badge ${result.status?.toLowerCase() || 'not-marked'}`}>
                      {result.status || 'Not Marked'}
                    </span>
                  </td>
                  <td>{formatDate(result.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     
    </div>
  );
};

export default Search;