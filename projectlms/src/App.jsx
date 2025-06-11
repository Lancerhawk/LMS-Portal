import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import CoursesPage from './Pages/LandingPages/CoursesPage/CoursesPage'
import AboutPage from './Pages/LandingPages/AboutPage/AboutPage'
import Homepage from './Pages/LandingPages/Homepage/Homepage'
import Navbar from './Components/Navbar/Navbar'
import Login from './Pages/AuthsPages/LoginPage/Login'
import ContactUsPage from './Pages/LandingPages/ContactUs/ContactUsPage'
import StudentSignup from './Pages/AuthsPages/RegisterPage/StudentSignup.jsx'
import TeacherSignup from './Pages/AuthsPages/RegisterPage/TeacherSignup.jsx'
import DashboardLayout from './Pages/Dashboards/DashboardLayout'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar/>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/teacher-signup" element={<TeacherSignup />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
          </Routes>
    </Router>
  )
};

export default App;
