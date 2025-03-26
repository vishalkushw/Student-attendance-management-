import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DisplayStudents = () => {
  const [students, setStudents] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState({});

  // Fetch students
  const fetchStudents = async () => {
    try {
      const { data } = await axios.get('https://student-attendance-management-1.onrender.com/student/all');
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Mark attendance
  const markAttendance = async (id, status) => {
    if (!attendanceDate) {
      toast.warning('Please select a date first.');
      return;
    }

    try {
      await axios.put(`https://student-attendance-management-1.onrender.com/student/attendance/${id}`, {
        status,
        date: attendanceDate,
      });

      // Update local attendance status state
      setAttendanceStatus(prev => ({
        ...prev,
        [id]: status
      }));

      toast.success(`Attendance marked as ${status} for ${attendanceDate}.`);
    } catch (error) {
      console.error('Failed to update attendance:', error);
      toast.error('Failed to update attendance.');
    }
  };

  return (
    <div id="page-container">
      <ToastContainer />
      {students.length === 0 ? (
        <div id="empty-state">
          <div id="empty-state-icon">📝</div>
          <h3>No Students Found</h3>
          <p>There are no students in the database. Add some students first.</p>
        </div>
      ) : (
        <div id="card">
          <div id="card-header">
            <h3>Mark Attendance</h3>
          </div>
          <div id="card-body">
            <div id="date-picker">
              <label htmlFor="attendance-date">Select Date for Attendance:</label>
              <input
                id="attendance-date"
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
              />
            </div>

            <div id="table-container">
              <table id="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.rollNo}</td>
                      <td>{student.name}</td>
                      <td>{student.className}</td>
                      <td>{student.email}</td>
                      <td id="action-buttons">
                        <button
                          onClick={() => markAttendance(student._id, 'Present')}
                          className={attendanceStatus[student._id] === 'Present' ? 'active' : ''}
                          disabled={!attendanceDate}
                          title={!attendanceDate ? "Select a date first" : ""}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => markAttendance(student._id, 'Absent')}
                          className={attendanceStatus[student._id] === 'Absent' ? 'active' : ''}
                          disabled={!attendanceDate}
                          title={!attendanceDate ? "Select a date first" : ""}
                        >
                          Absent
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayStudents;