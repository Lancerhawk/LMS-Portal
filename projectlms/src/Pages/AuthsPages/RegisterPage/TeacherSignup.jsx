import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';

function TeacherSignup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    experience: '',
    education: '',
    specialization: '',
    coursesInterestedIn: [],
    resume: null,
    teachingPhilosophy: '',
    availability: '',
    references: '',
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      const updatedCourses = checked
        ? [...formData.coursesInterestedIn, value]
        : formData.coursesInterestedIn.filter(course => course !== value);
      setFormData(prev => ({
        ...prev,
        coursesInterestedIn: updatedCourses
      }));
    } else if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
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
        if (!formData.experience) newErrors.experience = 'Experience is required';
        if (!formData.education) newErrors.education = 'Education details are required';
        if (!formData.specialization) newErrors.specialization = 'Specialization is required';
        if (formData.coursesInterestedIn.length === 0) newErrors.coursesInterestedIn = 'Please select at least one course';
        break;
      case 3:
        if (!formData.resume) newErrors.resume = 'Resume is required';
        if (!formData.teachingPhilosophy) newErrors.teachingPhilosophy = 'Teaching philosophy is required';
        if (!formData.availability) newErrors.availability = 'Availability information is required';
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
          <h1>Teacher Registration</h1>
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
                <label htmlFor="experience">Teaching Experience (in years)</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={errors.experience ? 'error' : ''}
                />
                {errors.experience && <span className="error-message">{errors.experience}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="education">Educational Background</label>
                <textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className={errors.education ? 'error' : ''}
                  placeholder="Please list your degrees and certifications"
                />
                {errors.education && <span className="error-message">{errors.education}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="specialization">Area of Specialization</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className={errors.specialization ? 'error' : ''}
                />
                {errors.specialization && <span className="error-message">{errors.specialization}</span>}
              </div>

              <div className="form-group">
                <label>Courses Interested in Teaching</label>
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
                <label htmlFor="resume">Upload Resume (PDF)</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf"
                  onChange={handleChange}
                  className={errors.resume ? 'error' : ''}
                />
                {errors.resume && <span className="error-message">{errors.resume}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="teachingPhilosophy">Teaching Philosophy</label>
                <textarea
                  id="teachingPhilosophy"
                  name="teachingPhilosophy"
                  value={formData.teachingPhilosophy}
                  onChange={handleChange}
                  className={errors.teachingPhilosophy ? 'error' : ''}
                  placeholder="Share your approach to teaching and what makes you unique"
                />
                {errors.teachingPhilosophy && <span className="error-message">{errors.teachingPhilosophy}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="availability">Availability</label>
                <textarea
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className={errors.availability ? 'error' : ''}
                  placeholder="Please specify your preferred teaching hours and days"
                />
                {errors.availability && <span className="error-message">{errors.availability}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="references">References (Optional)</label>
                <textarea
                  id="references"
                  name="references"
                  value={formData.references}
                  onChange={handleChange}
                  placeholder="List any professional references"
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

export default TeacherSignup;