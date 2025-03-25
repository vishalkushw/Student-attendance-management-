import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    Students Attendance 
                </div>

                <ul className="navbar-menu">
                    <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                    <li><Link to="insert" className="nav-link">Add Student</Link></li>
                    <li><Link to="display" className="nav-link">All Student</Link></li>
                    <li><Link to="attendance" className="nav-link">Attendence</Link></li>
                    <li><Link to="/" className="nav-link logout" onClick={logout}>Logout</Link></li>
                </ul>
            </nav>


           

            <div className="main-content">
                
                <Outlet />
            </div>



        </>
    );
};

export default Dashboard;