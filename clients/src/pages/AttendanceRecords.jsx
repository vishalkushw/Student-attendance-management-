import React, { useState } from 'react';
import axios from 'axios';

const AttendanceRecords = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchName, setSearchName] = useState(''); // State for search by name
  const [allRecords, setAllRecords] = useState([]); // Store all records fetched from the API

  // Fetch all attendance records
  const fetchAllAttendance = async () => {
    try {
      const { data } = await axios.get('https://student-attendance-management-1.onrender.com/student/attendance/all');
      setAllRecords(data); // Store all records
      setAttendanceRecords(data); // Set initial records to display
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
      alert('Failed to fetch attendance.');
    }
  };

  // Fetch attendance by date
  const fetchAttendanceByDate = async () => {
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }

    try {
      const { data } = await axios.get(
        `https://student-attendance-management-1.onrender.com/student/attendance?date=${selectedDate}`
      );
      setAttendanceRecords(data); // Set records for the selected date
      setAllRecords(data); // Update all records
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
      alert('Failed to fetch attendance.');
    }
  };

  // Filter records by name
  const filteredRecords = allRecords.filter((record) =>
    record.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div id="page-container">
      <div id="card">
        <div id="card-header">
          <h3>View Attendance Records</h3>
        </div>
        <div id="card-body">
          <div id="search-attendance">
            <div id="date-picker">
              <label>Select Date to View:</label>
              <input
                id="view-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <button onClick={fetchAttendanceByDate} id="view-records-btn" disabled={!selectedDate}>
              View Records
            </button>
          </div>

          {/* Search by Name Input */}
          <div id="search-by-name">
            <label >Search by Name:</label> 
            <input
            
              type="text"
              placeholder="Enter student name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          {filteredRecords.length > 0 ? (
            <div id="table-container">
              <table id="data-table">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.rollNo}>
                      <td>{record.rollNo}</td>
                      <td>{record.name}</td>
                      <td>{record.className}</td>
                      <td>
                        <span id={`status-badge-${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="empty-state">
              <p>No attendance records found for this date or name.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecords;