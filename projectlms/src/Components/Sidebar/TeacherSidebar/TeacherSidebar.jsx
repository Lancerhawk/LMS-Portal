import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import {
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
} from 'react-icons/fi';
import {
    MdDashboard,
    MdClass,
    MdNoteAdd,
    MdAssignment,
    MdNotifications
} from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import '../Sidebar.css';

function TeacherSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <button className="sb-toggle-btn" onClick={toggleSidebar}>
                {isCollapsed ? <FiMenu /> : <FiX />}
            </button>

            <div className={`sb-sidebar ${isCollapsed ? 'sb-collapsed' : ''}`}>
                <nav className="sb-nav-links">
                    <Link to="/dashboard/teacher" className={`sb-nav-link ${location.pathname === '/dashboard/teacher' ? 'active' : ''}`}>
                        <MdDashboard className="sb-nav-icon" />
                        {!isCollapsed && <span>Teacher Dashboard</span>}
                    </Link>
                    <Link to="/dashboard/classes" className={`sb-nav-link ${location.pathname === '/dashboard/classes' ? 'active' : ''}`}>
                        <MdClass className="sb-nav-icon" />
                        {!isCollapsed && <span>Your Classes</span>}
                    </Link>
                    <Link to="/dashboard/addnotes" className={`sb-nav-link ${location.pathname === '/dashboard/addnotes' ? 'active' : ''}`}>
                        <MdNoteAdd className="sb-nav-icon" />
                        {!isCollapsed && <span>Add Notes</span>}
                    </Link>
                    <Link to="/dashboard/createassginments" className={`sb-nav-link ${location.pathname === '/dashboard/createassginments' ? 'active' : ''}`}>
                        <MdAssignment className="sb-nav-icon" />
                        {!isCollapsed && <span>Create Assignments</span>}
                    </Link>
                    <Link to="/dashboard/notifications" className={`sb-nav-link ${location.pathname === '/dashboard/notifications' ? 'active' : ''}`}>
                        <MdNotifications className="sb-nav-icon" />
                        {!isCollapsed && <span>Notifications</span>}
                    </Link>
                </nav>

                <div className="sb-user-section">
                    <div className="sb-user-profile">
                        <FaUser size={24} />
                        {!isCollapsed && <span className="sb-username">Arin Jain</span>}
                    </div>
                    <div className="sb-user-actions">
                        <Link to="/dashboard/settings" className="sb-action-btn">
                            <FiSettings />
                            {!isCollapsed && <span>Settings</span>}
                        </Link>
                        <button className="sb-action-btn sb-logout-btn" onClick={handleLogout}>
                            <FiLogOut />
                            {!isCollapsed && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherSidebar;
