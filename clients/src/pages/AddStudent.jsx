import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
  const [input, setInput] = useState({
    rollNo: '',
    name: '',
    className: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('https://student-attendance-management-1.onrender.com/student/add', input);
      setInput({
        rollNo: '',
        name: '',
        className: '',
        email: '',
      });
      toast.success('Student added successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add student');
    }
  };

  return (
    <div id="student-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} id="student-form">
        <input
          type="text"
          name="rollNo"
          placeholder="Roll No"
          value={input.rollNo}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={input.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="className"
          placeholder="Class"
          value={input.className}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={input.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddStudent;