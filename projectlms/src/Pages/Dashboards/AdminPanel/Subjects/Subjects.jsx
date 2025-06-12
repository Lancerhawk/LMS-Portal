import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Subjects.css';
import { courses } from '../../../SampleDatas/Courses';

function Subjects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Full Package', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

  const filteredCourses = courses.filter(course => {
    const matchesCategory =
      selectedCategory.toLowerCase() === 'all' ||
      course.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className='admin_panel_classname_courses_container'>

<div className='AdminPanel_Model_Subjectregister_header'>
        <button
          className='AdminPanel_Model_Subjectregister_add_btn'
        >
          Register New Subject / Course
        </button>
        <div className="admin_panel_classname_search_bar">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
        
      <section className="admin_panel_classname_courses_header">
        <h1>All Subjects</h1>
      </section>

      <section className="admin_panel_classname_search_filter_section">
        
        <div className="admin_panel_classname_category_filters">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`admin_panel_classname_category_btn ${selectedCategory === category.toLowerCase() ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.toLowerCase())}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="admin_panel_classname_courses_grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="admin_panel_classname_course_card">
            <div className="admin_panel_classname_course_content">
              <h3>{course.title}</h3>
              <p className="admin_panel_classname_instructor">by {course.instructor}</p>
              <p className="admin_panel_classname_description">{course.description}</p>
              <div className="admin_panel_classname_course_meta">
                <span className="admin_panel_classname_rating">⭐ {course.rating}</span>
                <span className="admin_panel_classname_students">{course.students} students</span>
                <span className="admin_panel_classname_level">{course.level}</span>
              </div>
              <div className="admin_panel_classname_course_footer">
                <span className="admin_panel_classname_price">₹{course.price}</span>
                <Link to={`/contact`} className="admin_panel_classname_enroll_btn">Learn More</Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {filteredCourses.length === 0 && (
        <div className="admin_panel_classname_no_results">
          <h2>No courses found</h2>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default Subjects;
