import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('student');
  const [isAdminView, setIsAdminView] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const { setUserRole } = useUser();


  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const finalRole = isAdminView ? 'admin' : selectedRole;
  
      console.log('Form submitted:', { ...formData, role: finalRole });
  
      setUserRole(finalRole);
      localStorage.setItem('userRole', finalRole);
  
      if (finalRole) {
        navigate('/dashboard');
      }
    } else {
      setErrors(newErrors);
    }
  };
  

  return (
    <div className='login-container'>
      <div className='login-card'>
        <div className='login-header'>
          <h1>Welcome Back!</h1>
          <p>{isAdminView ? 'Admin Login' : 'Please select your role and sign in to continue'}</p>
          <button 
            onClick={() => setIsAdminView(!isAdminView)} 
            className='admin-toggle'
          >
            {isAdminView ? 'Switch to User Login' : 'Switch to Admin Login'}
          </button>
        </div>

        {!isAdminView && (
          <div className='role-selector'>
            <button
              className={`role-btn ${selectedRole === 'student' ? 'active' : ''}`}
              onClick={() => setSelectedRole('student')}
            >
              <span className='role-icon'>👨‍🎓</span>
              Student Login
            </button>
            <button
              className={`role-btn ${selectedRole === 'teacher' ? 'active' : ''}`}
              onClick={() => setSelectedRole('teacher')}
            >
              <span className='role-icon'>👨‍🏫</span>
              Teacher Login
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className='login-form'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder={`Enter your ${isAdminView ? 'admin' : selectedRole} email`}
            />
            {errors.email && <span className='error-message'>{errors.email}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder='Enter your password'
            />
            {errors.password && <span className='error-message'>{errors.password}</span>}
          </div>

          <div className='form-group checkbox-group'>
            <label className='checkbox-label'>
              <input
                type='checkbox'
                name='rememberMe'
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
            <Link to='/forgot-password' className='forgot-password'>Forgot Password?</Link>
          </div>

          <button type='submit' className='login-button'>Sign In</button>

          {!isAdminView && (
            <div className='signup-prompt'>
              {selectedRole === 'student' ? (
                <>Don't have an account? <Link to='/student-signup'>Sign up as Student</Link></>
              ) : (
                <>Are you a new teacher? <Link to='/teacher-signup'>Join Our Faculty</Link></>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;