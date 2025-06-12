import { useState } from 'react';
import './RegisterTeachers.css';

const SUBJECT_OPTIONS = [
  'Maths', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Economics', 'Physical Education', 'Art', 'Music'
];

function getAllClasses(teachers) {
  // Get all unique classes from teachers
  const classSet = new Set();
  teachers.forEach(t => t.classes.forEach(cls => classSet.add(cls)));
  return Array.from(classSet).sort();
}

function RegisterTeachers() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    subject: SUBJECT_OPTIONS[0],
    classes: [],
    salary: '',
    qualification: '',
    experience: '',
    address: '',
    joiningDate: '',
    photo: null,
    photoURL: ''
  });

  // Filter states
  const [filterSubject, setFilterSubject] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterSalaryMin, setFilterSalaryMin] = useState('');
  const [filterSalaryMax, setFilterSalaryMax] = useState('');

  // Password visibility and edit states for details modal
  const [showPassword, setShowPassword] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editPasswordValue, setEditPasswordValue] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: file, photoURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTeachers(prev => [...prev, { ...formData, id: Date.now() }]);
    setShowRegisterModal(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      subject: SUBJECT_OPTIONS[0],
      classes: [],
      salary: '',
      qualification: '',
      experience: '',
      address: '',
      joiningDate: '',
      photo: null,
      photoURL: ''
    });
  };

  // Filtering logic
  const filteredTeachers = teachers.filter(teacher => {
    // Search
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.classes.some(cls => cls.toLowerCase().includes(searchQuery.toLowerCase()));
    // Subject filter
    const matchesSubject = filterSubject ? teacher.subject === filterSubject : true;
    // Class filter
    const matchesClass = filterClass ? teacher.classes.includes(filterClass) : true;
    // Salary filter
    const salary = parseFloat(teacher.salary);
    const matchesSalaryMin = filterSalaryMin ? salary >= parseFloat(filterSalaryMin) : true;
    const matchesSalaryMax = filterSalaryMax ? salary <= parseFloat(filterSalaryMax) : true;
    return matchesSearch && matchesSubject && matchesClass && matchesSalaryMin && matchesSalaryMax;
  });

  // For class filter dropdown
  const allClasses = getAllClasses(teachers);

  // Handle password edit in details modal
  const handleEditPassword = () => {
    setEditPasswordValue(selectedTeacher.password || '');
    setEditPassword(true);
  };
  const handleSavePassword = () => {
    setTeachers(prev => prev.map(t => t.id === selectedTeacher.id ? { ...t, password: editPasswordValue } : t));
    setSelectedTeacher(prev => ({ ...prev, password: editPasswordValue }));
    setEditPassword(false);
  };
  const handleCancelEditPassword = () => {
    setEditPassword(false);
    setEditPasswordValue('');
  };

  return (
    <div className='AdminPanel_Model_Registerteacher_container'>
      <div className='AdminPanel_Model_Registerteacher_header'>
        <div className='AdminPanel_Model_Registerteacher_header_left'>
          <button 
            className='AdminPanel_Model_Registerteacher_add_btn'
            onClick={() => setShowRegisterModal(true)}
          >
            Register New Teacher
          </button>
          <div className='AdminPanel_Model_Registerteacher_filters'><span>Filters</span>
            <select
              className='AdminPanel_Model_Registerteacher_filter_select'
              value={filterSubject}
              onChange={e => setFilterSubject(e.target.value)}
            >
              <option value=''>All Subjects</option>
              {SUBJECT_OPTIONS.map(subj => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
            <select
              className='AdminPanel_Model_Registerteacher_filter_select'
              value={filterClass}
              onChange={e => setFilterClass(e.target.value)}
            >
              <option value=''>All Classes</option>
              {allClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <input
              className='AdminPanel_Model_Registerteacher_filter_input'
              type='number'
              placeholder='Min Salary'
              value={filterSalaryMin}
              onChange={e => setFilterSalaryMin(e.target.value)}
              min='0'
            />
            <input
              className='AdminPanel_Model_Registerteacher_filter_input'
              type='number'
              placeholder='Max Salary'
              value={filterSalaryMax}
              onChange={e => setFilterSalaryMax(e.target.value)}
              min='0'
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="Search teachers by name, subject, or class..."
          className='AdminPanel_Model_Registerteacher_search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='AdminPanel_Model_Registerteacher_cards_container'>
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className='AdminPanel_Model_Registerteacher_card'>
            <div className='AdminPanel_Model_Registerteacher_card_content'>
              <div className='AdminPanel_Model_Registerteacher_card_text'>
                <h3>{teacher.name}</h3>
                <p>Subject: {teacher.subject}</p>
                <p>Classes: {teacher.classes.join(', ')}</p>
                <p>Salary: ${teacher.salary}</p>
                <p>Joining: {teacher.joiningDate}</p>
                <button 
                  className='AdminPanel_Model_Registerteacher_details_btn'
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    setShowDetailsModal(true);
                    setShowPassword(false);
                    setEditPassword(false);
                  }}
                >
                  Show Details
                </button>
              </div>
              {teacher.photoURL && (
                <img 
                  src={teacher.photoURL} 
                  alt={teacher.name} 
                  className='AdminPanel_Model_Registerteacher_card_img' 
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className='AdminPanel_Model_Registerteacher_modal_overlay'>
          <div className='AdminPanel_Model_Registerteacher_modal'>
            <h2>Register New Teacher</h2>
            <form onSubmit={handleSubmit} className='AdminPanel_Model_Registerteacher_form'>
              <div className='AdminPanel_Model_Registerteacher_form_row'>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className='AdminPanel_Model_Registerteacher_form_row'>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Password</label>
                  <div className='AdminPanel_Model_Registerteacher_password_input'>
                    <input
                      type={formData.showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className='AdminPanel_Model_Registerteacher_password_toggle'
                      onClick={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                      tabIndex={-1}
                    >
                      {formData.showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className='AdminPanel_Model_Registerteacher_form_row'>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Subject Mastery</label>
                  <select
                  className='AdminPanel_Model_Registerteacher_form_subjectselect'
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    {SUBJECT_OPTIONS.map(subj => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>
                
              </div>
              <div className='AdminPanel_Model_Registerteacher_form_row'>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className='AdminPanel_Model_Registerteacher_form_row'>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Experience (years)</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className='AdminPanel_Model_Registerteacher_form_row'>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  {formData.photoURL && (
                    <img 
                      src={formData.photoURL} 
                      alt="Preview" 
                      className='AdminPanel_Model_Registerteacher_form_img_preview' 
                    />
                  )}
                </div>
                <div className='AdminPanel_Model_Registerteacher_form_col'>
                  <label>Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className='AdminPanel_Model_Registerteacher_modal_buttons'>
                <button type="submit">Register Teacher</button>
                <button type="button" onClick={() => setShowRegisterModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedTeacher && (
        <div className='AdminPanel_Model_Registerteacher_modal_overlay'>
          <div className='AdminPanel_Model_Registerteacher_modal'>
            <h2>Teacher Details</h2>
            <div className='AdminPanel_Model_Registerteacher_details_row'>
              <div className='AdminPanel_Model_Registerteacher_details_text'>
                <p><strong>Name:</strong> {selectedTeacher.name}</p>
                <p><strong>Email:</strong> {selectedTeacher.email}</p>
                <p><strong>Phone:</strong> {selectedTeacher.phone}</p>
                <p><strong>Subject:</strong> {selectedTeacher.subject}</p>
                <p><strong>Classes:</strong> {selectedTeacher.classes.join(', ')}</p>
                <p><strong>Salary:</strong> ${selectedTeacher.salary}</p>
                <p><strong>Qualification:</strong> {selectedTeacher.qualification}</p>
                <p><strong>Experience:</strong> {selectedTeacher.experience} years</p>
                <p><strong>Address:</strong> {selectedTeacher.address}</p>
                <p><strong>Joining Date:</strong> {selectedTeacher.joiningDate}</p>
                <div className='AdminPanel_Model_Registerteacher_password_row'>
                  <strong>Password:</strong>
                  {editPassword ? (
                    <>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={editPasswordValue}
                        onChange={e => setEditPasswordValue(e.target.value)}
                        className='AdminPanel_Model_Registerteacher_password_edit_input'
                      />
                      <button
                        type='button'
                        className='AdminPanel_Model_Registerteacher_password_toggle'
                        onClick={() => setShowPassword(s => !s)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                      <button
                        type='button'
                        className='AdminPanel_Model_Registerteacher_password_save_btn'
                        onClick={handleSavePassword}
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        className='AdminPanel_Model_Registerteacher_password_cancel_btn'
                        onClick={handleCancelEditPassword}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span className='AdminPanel_Model_Registerteacher_password_value'>
                        {showPassword ? selectedTeacher.password : '•'.repeat(selectedTeacher.password?.length || 8)}
                      </span>
                      <button
                        type='button'
                        className='AdminPanel_Model_Registerteacher_password_toggle'
                        onClick={() => setShowPassword(s => !s)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                      <button
                        type='button'
                        className='AdminPanel_Model_Registerteacher_password_edit_btn'
                        onClick={handleEditPassword}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {selectedTeacher.photoURL && (
                <img 
                  src={selectedTeacher.photoURL} 
                  alt={selectedTeacher.name} 
                  className='AdminPanel_Model_Registerteacher_details_img' 
                />
              )}
            </div>
            <button 
              className='AdminPanel_Model_Registerteacher_close_btn'
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterTeachers;