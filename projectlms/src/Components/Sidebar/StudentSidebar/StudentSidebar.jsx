import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import {
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX
} from 'react-icons/fi';
import {
    MdDashboard,
    MdNotes,
    MdAssignment,
    MdLeaderboard,
    MdNotifications
} from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import '../Sidebar.css';

function StudentSidebar() {
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
                    <Link to="/dashboard/student" className={`sb-nav-link ${location.pathname === '/dashboard/student' ? 'active' : ''}`}>
                        <MdDashboard className="sb-nav-icon" />
                        {!isCollapsed && <span>Student Dashboard</span>}
                    </Link>
                    <Link to="/dashboard/classnotes" className={`sb-nav-link ${location.pathname === '/dashboard/classnotes' ? 'active' : ''}`}>
                        <MdNotes className="sb-nav-icon" />
                        {!isCollapsed && <span>Class Notes</span>}
                    </Link>
                    <Link to="/dashboard/assignments" className={`sb-nav-link ${location.pathname === '/dashboard/assignments' ? 'active' : ''}`}>
                        <MdAssignment className="sb-nav-icon" />
                        {!isCollapsed && <span>Assignments</span>}
                    </Link>
                    <Link to="/dashboard/leaderboard" className={`sb-nav-link ${location.pathname === '/dashboard/leaderboard' ? 'active' : ''}`}>
                        <MdLeaderboard className="sb-nav-icon" />
                        {!isCollapsed && <span>Leaderboard</span>}
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

export default StudentSidebar;
