import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { MdNotifications, MdAttachMoney, MdMenuBook } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';
import { PiChalkboardTeacherFill } from 'react-icons/pi';
import '../Sidebar.css';

function AdminSidebar() {
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
                    <Link to="/dashboard/allstudents" className={`sb-nav-link ${location.pathname === '/dashboard/allstudents' ? 'active' : ''}`}>
                        <HiUserGroup className="sb-nav-icon" />
                        {!isCollapsed && <span>Students & Classes</span>}
                    </Link>
                    <Link to="/dashboard/allteachers" className={`sb-nav-link ${location.pathname === '/dashboard/allteachers' ? 'active' : ''}`}>
                        <PiChalkboardTeacherFill className="sb-nav-icon" />
                        {!isCollapsed && <span>Teachers Management</span>}
                    </Link>
                    <Link to="/dashboard/allsubjects" className={`sb-nav-link ${location.pathname === '/dashboard/allsubjects' ? 'active' : ''}`}>
                        <MdMenuBook className="sb-nav-icon" />
                        {!isCollapsed && <span>Subjects Management</span>}
                    </Link>
                    <Link to="/dashboard/fees-structure" className={`sb-nav-link ${location.pathname === '/dashboard/fees-structure' ? 'active' : ''}`}>
                        <MdAttachMoney className="sb-nav-icon" />
                        {!isCollapsed && <span>Fees Management</span>}
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

export default AdminSidebar;
