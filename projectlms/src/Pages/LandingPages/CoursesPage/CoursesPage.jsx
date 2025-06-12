import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CoursesPage.css';
import {courses} from '../../SampleDatas/Courses.jsx';

function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Full Package', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];


  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory.toLowerCase() === 'all' || 
      course.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className='courses-container'>
      <section className="courses-header">
        <h1>Our Courses</h1>
        <p>Explore our wide range of courses and start learning today</p>
      </section>

      <section className="search-filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="category-filters">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${selectedCategory === category.toLowerCase() ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.toLowerCase())}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="courses-grid-landingpage">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card-landingpage">
            <div className="course-content-landingpage">
              <h3>{course.title}</h3>
              <p className="instructor">by {course.instructor}</p>
              <p className="description">{course.description}</p>
              <div className="course-meta">
                <span className="rating">⭐ {course.rating}</span>
                <span className="students">{course.students} students</span>
                <span className="level">{course.level}</span>
              </div>
              <div className="course-footer">
                <span className="price">₹{course.price}</span>
                <Link to={`/contact`} className="enroll-btn-landingpage">Learn More</Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {filteredCourses.length === 0 && (
        <div className="no-results">
          <h2>No courses found</h2>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default CoursesPage;