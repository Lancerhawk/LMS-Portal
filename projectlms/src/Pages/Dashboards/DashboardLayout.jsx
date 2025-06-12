import './DashboardLayout.css';
import { useUser } from '../../context/UserContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../../Components/Sidebar/AdminSidebar/AdminSidebar';
import TeacherSidebar from '../../Components/Sidebar/TeacherSidebar/TeacherSidebar';
import StudentSidebar from '../../Components/Sidebar/StudentSidebar/StudentSidebar';
import HomeSection from './HomeSection/HomeSection';
// import AdminsPanel from './AdminPanel/AdminsDashboard/AdminsPanel';
import StudentDashboard from './StudentDashboard/StudentDashboard/StudentDashboard';
import RegisterTeachers from './AdminPanel/Teachers/RegisterTeachers';
import RegisterStudents from './AdminPanel/RegisterStudents/RegisterStudents';
import Notifications from './Notifications/Notifications';
import Notes from './StudentDashboard/Notes/Notes';
import Leaderboard from './StudentDashboard/Leaderboard/Leaderboard';
import Assignments from './StudentDashboard/Assignments/Assignments';
import TeachersDashboard from './TeacherDashboard/TeachersDashboard/TeachersDashboard';
import CreateAssginments from './TeacherDashboard/CreateAssignments/CreateAssginments';
import Classes from './TeacherDashboard/Classes/Classes';
import AddNotes from './TeacherDashboard/AddNotes/AddNotes';
import Subjects from './AdminPanel/Subjects/Subjects';
import Fees from './AdminPanel/Fees/Fees';

function DashboardLayout() {
    const { userRole } = useUser();

    const getSidebar = () => {
        switch(userRole) {
            case 'admin':
                return <AdminSidebar />;
            case 'teacher':
                return <TeacherSidebar />;
            case 'student':
                return <StudentSidebar />;
            default:
                return null;
        }
    };

    return(
        <>
            {getSidebar()}
            <div className="Dashboard-Container">
                <Routes>
                    <Route index element={<Navigate to="home" replace />} />
                    <Route path="home" element={<HomeSection />} />
                    {/* <Route path="admin" element={<AdminsPanel />} /> */}
                    <Route path="student" element={<StudentDashboard />} />
                    <Route path="allteachers" element={<RegisterTeachers />} />
                    <Route path="allstudents" element={<RegisterStudents />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="classnotes" element={<Notes />} />
                    <Route path="assignments" element={<Assignments />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="teacher" element={<TeachersDashboard />} />
                    <Route path="createassginments" element={<CreateAssginments />} />
                    <Route path="classes" element={<Classes />} />
                    <Route path="addnotes" element={<AddNotes />} />
                    


                    <Route path="allsubjects" element={<Subjects />} />
                    <Route path="fees-structure" element={<Fees />} />
                    {/* <Route path="addnotes" element={<AddNotes />} /> */}
                </Routes>
            </div>
        </>
    )
}

export default DashboardLayout;