import React from 'react';

const Dash = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome to Student Dashboard</h1>
        <p className="welcome-text">
          Manage student attendance and records with our comprehensive system.
        </p>
        
        <div className="feature-cards">
          <div className="feature-card">
            <h3>📊 Student Management</h3>
            <p>Add, view and manage all student records</p>
          </div>
          <div className="feature-card">
            <h3>📅 Attendance Tracking</h3>
            <p>Mark and analyze daily attendance</p>
          </div>
          <div className="feature-card">
            <h3>🔍 Advanced Search</h3>
            <p>Find students by name or date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;