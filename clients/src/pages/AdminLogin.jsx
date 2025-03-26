import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://student-attendance-management-1.onrender.com/admin/login', input);
            if (response.status === 200) {
                toast.success('Login Successful!');
                localStorage.setItem('adminid', response.data.adminid);
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.response?.data?.msg || 'Something went wrong. Please try again.');
            toast.error(error.response?.data?.msg || 'Login Failed!');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Admin Login</h1>
                </div>
                <Form onSubmit={handleLogin} className="login-form">
                    <Form.Group className="mb-3 form-group">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder=" "
                            value={input.email}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Label>Email Address</Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3 form-group">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder=" "
                            value={input.password}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Label>Password</Form.Label>
                    </Form.Group>

                    {error && <div className="error-message">{error}</div>}
                    <Button variant="primary" type="submit" className="login-button">
                        Login
                    </Button>
                </Form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminLogin;