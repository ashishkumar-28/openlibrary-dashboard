import React, { useState } from 'react';
import BookTable from './BookTable';
import './Dashboard.css';

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="dashboard">
      <div className="navbar">
        <h1>Welcome to Open Library</h1>
        <p>Your go-to source for book information.</p>
        <button className="logout-btn" onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }}>Logout</button>
      </div>
     
      <div className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <BookTable
        page={page}
        pageSize={pageSize}
        setPageSize={setPageSize}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default Dashboard;
