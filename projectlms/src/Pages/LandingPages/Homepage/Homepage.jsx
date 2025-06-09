import { Link } from 'react-router-dom';
import './Homepage.css';
import logo from '../../../assets/logo.png';

function Homepage() {
  const featuredCourses = [
    {
      id: 1,
      title: 'Primary Education Excellence (Class 1-5)',
      description: 'Comprehensive foundation in Mathematics, English, and all subjects for primary students.',
      duration: 'Full Academic Year',
      level: 'Primary'
    },
    {
      id: 2,
      title: 'Secondary Education Package (Class 6-10)',
      description: 'Expert guidance in Mathematics, Science, English, and Computer Science.',
      duration: 'Full Academic Year',
      level: 'Secondary'
    },
    {
      id: 3,
      title: 'PCM Excellence Program (Class 11-12)',
      description: 'Intensive coaching in Physics, Chemistry, and Mathematics for senior secondary students.',
      duration: 'Full Academic Year',
      level: 'Senior Secondary'
    }
  ];

  return (
    <div className='homepage-container'>
      <section className="hero-section">
        <div className="hero-content">
          <div className='logo'>
            <img src={logo} alt="Logo"/>
          </div>
          <h1>Excellence in Education from Class 1 to 12</h1>
          <p>Join Lakshay Academy for comprehensive academic coaching with experienced teachers and proven results.</p>
          <Link to="/courses" className="explore-btn">Explore Courses</Link>
        </div>
      </section>

      <section className="featured-courses">
        <h2>Featured Courses</h2>
        <div className="courses-grid">
          {featuredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span className="duration">{course.duration}</span>
                  <span className="level">{course.level}</span>
                </div>
                <Link to={`/courses`} className="enroll-btn">Learn More</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Secure Your Child's Academic Future</h2>
          <p>Join hundreds of successful students who have achieved academic excellence with our guidance.</p>
          <Link to="/login" className="cta-btn">Get Started</Link>
        </div>
      </section>
    </div>
  );
}

export default Homepage;