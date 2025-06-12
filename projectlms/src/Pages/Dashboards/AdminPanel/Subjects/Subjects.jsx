import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Subjects.css';
import { courses } from '../../../SampleDatas/Courses';

function Subjects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    instructor: '',
    description: '',
    category: '',
    rating: '',
    students: '',
    level: '',
    price: '',
    image: null,
    imageURL: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse(prev => ({
          ...prev,
          image: file,
          imageURL: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically add the new course to your courses array
    // For now, we'll just close the modal
    setShowRegisterModal(false);
    setNewCourse({
      title: '',
      instructor: '',
      description: '',
      category: '',
      rating: '',
      students: '',
      level: '',
      price: '',
      image: null,
      imageURL: ''
    });
  };

  return (
    <div className='admin_panel_classname_courses_container'>
      <div className='AdminPanel_Model_Subjectregister_header'>
        <button
          className='AdminPanel_Model_Subjectregister_add_btn'
          onClick={() => setShowRegisterModal(true)}
        >
          Register New Subject / Course
        </button>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='admin_panel_classname_search_bar'
        />
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
                <button 
                  className="admin_panel_classname_enroll_btn"
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowDetailsModal(true);
                  }}
                >
                  Learn More
                </button>
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

      {/* Course Details Modal */}
      {showDetailsModal && selectedCourse && (
        <div className="admin_panel_classname_modal_overlay">
          <div className="admin_panel_classname_modal">
            <h2>{selectedCourse.title}</h2>
            <div className="admin_panel_classname_modal_details">
              <div className="admin_panel_classname_modal_details_text">
                <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
                <p><strong>Description:</strong> {selectedCourse.description}</p>
                <p><strong>Category:</strong> {selectedCourse.category}</p>
                <p><strong>Rating:</strong> ⭐ {selectedCourse.rating}</p>
                <p><strong>Students:</strong> {selectedCourse.students}</p>
                <p><strong>Level:</strong> {selectedCourse.level}</p>
                <p><strong>Price:</strong> ₹{selectedCourse.price}</p>
              </div>
              {selectedCourse.image && (
                <img 
                  src={selectedCourse.image} 
                  alt={selectedCourse.title} 
                  className="admin_panel_classname_modal_details_img"
                />
              )}
            </div>
            <button 
              className="admin_panel_classname_modal_close_btn"
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Register New Course Modal */}
      {showRegisterModal && (
        <div className="admin_panel_classname_modal_overlay">
          <div className="admin_panel_classname_modal">
            <h2>Register New Course</h2>
            <form onSubmit={handleSubmit} className="admin_panel_classname_modal_form">
              <div className="admin_panel_classname_modal_form_row">
                <div className="admin_panel_classname_modal_form_col">
                  <label>Course Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newCourse.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="admin_panel_classname_modal_form_col">
                  <label>Instructor</label>
                  <input
                    type="text"
                    name="instructor"
                    value={newCourse.instructor}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="admin_panel_classname_modal_form_row">
                <div className="admin_panel_classname_modal_form_col">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={newCourse.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="admin_panel_classname_modal_form_row">
                <div className="admin_panel_classname_modal_form_col">
                  <label>Category</label>
                  <select
                    name="category"
                    value={newCourse.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.filter(cat => cat !== 'All').map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="admin_panel_classname_modal_form_col">
                  <label>Level</label>
                  <select
                    name="level"
                    value={newCourse.level}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="admin_panel_classname_modal_form_row">
                <div className="admin_panel_classname_modal_form_col">
                  <label>Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={newCourse.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    required
                  />
                </div>
                <div className="admin_panel_classname_modal_form_col">
                  <label>Number of Students</label>
                  <input
                    type="number"
                    name="students"
                    value={newCourse.students}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="admin_panel_classname_modal_form_row">
                <div className="admin_panel_classname_modal_form_col">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={newCourse.price}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="admin_panel_classname_modal_form_col">
                  <label>Course Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {newCourse.imageURL && (
                    <img 
                      src={newCourse.imageURL} 
                      alt="Preview" 
                      className="admin_panel_classname_modal_form_img_preview"
                    />
                  )}
                </div>
              </div>

              <div className="admin_panel_classname_modal_buttons">
                <button type="submit">Register Course</button>
                <button type="button" onClick={() => setShowRegisterModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subjects;
