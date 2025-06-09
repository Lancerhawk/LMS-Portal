import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';

function StudentSignup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    grade: '',
    school: '',
    coursesInterestedIn: [],
    parentName: '',
    parentPhone: '',
    learningGoals: '',
    previousExperience: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);

  const courses = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Computer Science',
    'Social Studies',
    'Physical Education'
  ];

  const grades = [
    '6th Grade',
    '7th Grade',
    '8th Grade',
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade',
    'College Freshman',
    'College Sophomore',
    'College Junior',
    'College Senior'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedCourses = checked
        ? [...formData.coursesInterestedIn, value]
        : formData.coursesInterestedIn.filter(course => course !== value);
      setFormData(prev => ({
        ...prev,
        coursesInterestedIn: updatedCourses
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    switch (currentStep) {
      case 1:
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;
      case 2:
        if (!formData.age) newErrors.age = 'Age is required';
        else if (formData.age < 10 || formData.age > 25) newErrors.age = 'Age must be between 10 and 25';
        if (!formData.grade) newErrors.grade = 'Grade is required';
        if (!formData.school) newErrors.school = 'School name is required';
        if (formData.coursesInterestedIn.length === 0) newErrors.coursesInterestedIn = 'Please select at least one course';
        break;
      case 3:
        if (!formData.parentName) newErrors.parentName = 'Parent name is required';
        if (!formData.parentPhone) newErrors.parentPhone = 'Parent phone number is required';
        if (!formData.learningGoals) newErrors.learningGoals = 'Learning goals are required';
        break;
      default:
        break;
    }
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep(step);
    if (Object.keys(newErrors).length === 0) {
      setStep(prev => prev + 1);
    } else {
      setErrors(newErrors);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateStep(step);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      setShowThankYou(true);
    } else {
      setErrors(newErrors);
    }
  };

  if (showThankYou) {
    return (
      <div className="signup-container">
        <div className="thank-you-card">
          <h2>Thank You for Your Interest!</h2>
          <p>Our management team will contact you shortly regarding the next steps.</p>
          <Link to="/" className="home-button">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Student Registration</h1>
          <p>Step {step} of 3</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="10"
                  max="25"
                  value={formData.age}
                  onChange={handleChange}
                  className={errors.age ? 'error' : ''}
                />
                {errors.age && <span className="error-message">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="grade">Current Grade</label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={errors.grade ? 'error' : ''}
                >
                  <option value="">Select Grade</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                {errors.grade && <span className="error-message">{errors.grade}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="school">School Name</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className={errors.school ? 'error' : ''}
                />
                {errors.school && <span className="error-message">{errors.school}</span>}
              </div>

              <div className="form-group">
                <label>Courses Interested In</label>
                <div className="courses-form">
                  {courses.map(course => (
                    <label key={course} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="coursesInterestedIn"
                        value={course}
                        checked={formData.coursesInterestedIn.includes(course)}
                        onChange={handleChange}
                      />
                      {course}
                    </label>
                  ))}
                </div>
                {errors.coursesInterestedIn && <span className="error-message">{errors.coursesInterestedIn}</span>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="parentName">Parent/Guardian Name</label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className={errors.parentName ? 'error' : ''}
                />
                {errors.parentName && <span className="error-message">{errors.parentName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="parentPhone">Parent/Guardian Phone Number</label>
                <input
                  type="tel"
                  id="parentPhone"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  className={errors.parentPhone ? 'error' : ''}
                />
                {errors.parentPhone && <span className="error-message">{errors.parentPhone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="learningGoals">Learning Goals</label>
                <textarea
                  id="learningGoals"
                  name="learningGoals"
                  value={formData.learningGoals}
                  onChange={handleChange}
                  className={errors.learningGoals ? 'error' : ''}
                  placeholder="What do you hope to achieve through these courses?"
                />
                {errors.learningGoals && <span className="error-message">{errors.learningGoals}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="previousExperience">Previous Learning Experience (Optional)</label>
                <textarea
                  id="previousExperience"
                  name="previousExperience"
                  value={formData.previousExperience}
                  onChange={handleChange}
                  placeholder="Tell us about any relevant courses or subjects you've studied before"
                />
              </div>

              <div className="form-group">
                <label htmlFor="additionalInfo">Additional Information (Optional)</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any other information you'd like to share"
                />
              </div>
            </div>
          )}

          <div className="form-navigation">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="back-button">
                Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={handleNext} className="next-button">
                Next
              </button>
            ) : (
              <button type="submit" className="submit-button">
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentSignup;