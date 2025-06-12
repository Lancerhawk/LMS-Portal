import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterStudents.css';
// import {CLASS_LIST} from '../../../SampleDatas/Sample_ClassData.jsx';

const CLASS_LIST = [
  { className: 'Class 1', subjects: ['Maths', 'Science', 'English'] },
  { className: 'Class 2', subjects: ['Maths', 'Science', 'English', 'Hindi'] },
  { className: 'Class 3', subjects: ['Maths', 'Science', 'English', 'Hindi', 'Social Studies'] },
  { className: 'Class 4', subjects: ['Maths', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'] },
];

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

function RegisterStudents() {
  // State for all classes, each with students and teachers
  const [classes, setClasses] = useState(
    CLASS_LIST.map(cls => ({
      ...cls,
      teachers: {}, 
      students: [] 
    }))
  );
  
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    showPassword: false,
    phone: '',
    gender: '',
    dob: '',
    parent: '',
    address: '',
    photo: null,
    photoURL: '',
    className: '',
    subjects: [],
    rollNumber: '',
    // grade: ''
  });
  // Password visibility and edit states for details modal
  const [showPassword, setShowPassword] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editPasswordValue, setEditPasswordValue] = useState('');
  const [rollNumberManuallyEdited, setRollNumberManuallyEdited] = useState(false);
  const navigate = useNavigate();
  // State for Assign Teacher modal
  const [showAssignTeacherModal, setShowAssignTeacherModal] = useState(false);
  const [assignTeacherClass, setAssignTeacherClass] = useState(null);

  useEffect(() => {
    if (formData.className && !rollNumberManuallyEdited) {
      const classNum = formData.className.match(/\d+/)?.[0] || '1';
      const cls = classes.find(c => c.className === formData.className);
      const nextRoll = (cls?.students.length || 0) + 1;
      const rollStr = `C${classNum}${nextRoll.toString().padStart(2, '0')}`;
      setFormData(prev => ({ ...prev, rollNumber: rollStr }));
    }
    if (!formData.className) {
      setFormData(prev => ({ ...prev, rollNumber: '' }));
    }
  }, [formData.className, classes, rollNumberManuallyEdited]);

  const handleInputChange = (e) => {
    const { name, value, type, options } = e.target;
    if (name === 'className') {
      setFormData(prev => ({
        ...prev,
        className: value,
        subjects: [],
        rollNumber: value ? `C${value.match(/\d+/)[0]}${(classes.find(c => c.className === value)?.students.length || 0) + 1}`.padStart(3, '0') : ''
      }));
      setRollNumberManuallyEdited(false);
    } else if (name === 'subjects') {
      const selected = Array.from(options).filter(opt => opt.selected).map(opt => opt.value);
      setFormData(prev => ({ ...prev, subjects: selected }));
    } else if (name === 'rollNumber') {
      setFormData(prev => ({ ...prev, rollNumber: value }));
      setRollNumberManuallyEdited(true);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
  // Helper to reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      showPassword: false,
      phone: '',
      gender: '',
      dob: '',
      parent: '',
      address: '',
      photo: null,
      photoURL: '',
      className: '',
      subjects: [],
      rollNumber: '',
      // grade: ''
    });
    setRollNumberManuallyEdited(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.className || formData.subjects.length === 0) {
      alert('Please select a class and at least one subject.');
      return;
    }
    setClasses(prevClasses => prevClasses.map(cls => {
      if (formData.className && cls.className === formData.className) {
        let enrolledSubjects = [];
        if (formData.subjects.includes('all')) {
          enrolledSubjects = [...cls.subjects];
        } else {
          enrolledSubjects = formData.subjects;
        }
        if (enrolledSubjects.length === 0) return cls;
        return {
          ...cls,
          students: [
            ...cls.students,
            {
              ...formData,
              enrolledSubjects,
              className: cls.className,
              id: Date.now() + Math.random()
            }
          ]
        };
      }
      return cls;
    }));
    setShowRegisterModal(false);
    resetForm();
  };

  // Student details modal password logic
  const handleEditPassword = () => {
    setEditPasswordValue(selectedStudent.password || '');
    setEditPassword(true);
  };
  const handleSavePassword = () => {
    setClasses(prevClasses => prevClasses.map(cls => ({
      ...cls,
      students: cls.students.map(stu => stu.id === selectedStudent.id ? { ...stu, password: editPasswordValue } : stu)
    })));
    setSelectedStudent(prev => ({ ...prev, password: editPasswordValue }));
    setEditPassword(false);
  };
  const handleCancelEditPassword = () => {
    setEditPassword(false);
    setEditPasswordValue('');
  };

  // Update filteredClasses logic to filter class cards based on student name or roll number
  const filteredClasses = classes
    .map(cls => ({
      ...cls,
      students: searchQuery
        ? cls.students.filter(stu =>
            stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stu.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : cls.students
    }))
    .filter(cls => cls.students.length > 0 || searchQuery === '');

  return (
    <div className='AdminPanel_Model_Registerstudent_container'>
      <div className='AdminPanel_Model_Registerstudent_header'>
        <button
          className='AdminPanel_Model_Registerstudent_add_btn'
          onClick={() => setShowRegisterModal(true)}
        >
          Register New Student
        </button>
        <input
          type="text"
          placeholder="Search students by name..."
          className='AdminPanel_Model_Registerstudent_search'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='AdminPanel_Model_Registerstudent_cards_container'>
        {filteredClasses.map(cls => (
          <div key={cls.className} className='AdminPanel_Model_Registerstudent_card'>
            <div className='AdminPanel_Model_Registerstudent_card_header'>
              <h2>{cls.className}</h2>
              <div className='AdminPanel_Model_Registerstudent_card_teachers'>
                {cls.subjects.map(subj => (
                  <div key={subj} className='AdminPanel_Model_Registerstudent_card_teacher'>
                    <span className='AdminPanel_Model_Registerstudent_card_teacher_subject'>{subj}:</span>
                    <span className='AdminPanel_Model_Registerstudent_card_teacher_name'>{cls.teachers[subj] || 'Not Assigned'}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='AdminPanel_Model_Registerstudent_card_table_container'>
              <table className='AdminPanel_Model_Registerstudent_card_table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="rollnumber-col">Roll No.</th>
                    {/* <th>Grade</th> */}
                    <th className="enrolled-subjects-col">Enrolled Subjects</th>
                    <th>View Details</th>
                  </tr>
                </thead>
                <tbody>
                  {cls.students.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>No students yet.</td></tr>
                  ) : (
                    cls.students.map(stu => (
                      <tr key={stu.id}>
                        <td>{stu.name}</td>
                        <td className="rollnumber-col">{stu.rollNumber}</td>
                        {/* <td>{stu.grade}</td> */}
                        <td className="enrolled-subjects-col">{stu.enrolledSubjects?.length === CLASS_LIST.find(c => c.className === stu.className)?.subjects.length ? 'All Subjects' : stu.enrolledSubjects?.join(', ')}</td>
                        <td>
                          <button
                            className='AdminPanel_Model_Registerstudent_viewdetails_btn'
                            onClick={() => {
                              setSelectedStudent(stu);
                              setShowDetailsModal(true);
                              setShowPassword(false);
                              setEditPassword(false);
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className='AdminPanel_Model_Registerstudent_card_footer'>
              <button className='AdminPanel_Model_Registerstudent_addteacher_btn' onClick={() => { setAssignTeacherClass(cls); setShowAssignTeacherModal(true); }}>Add Teacher</button>
              <button className='AdminPanel_Model_Registerstudent_viewscore_btn'>View Score</button>
            </div>
          </div>
        ))}
      </div>
      {/* Assign Teacher Modal */}
      {showAssignTeacherModal && assignTeacherClass && (
        <div className='AdminPanel_Model_Registerstudent_modal_overlay'>
          <div className='AdminPanel_Model_Registerstudent_modal'>
            <h2>Assign Teachers for {assignTeacherClass.className}</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              {assignTeacherClass.subjects.map(subj => (
                <div key={subj} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
                  <span style={{ fontWeight: 600 }}>{subj}</span>
                  <span style={{ color: assignTeacherClass.teachers[subj] ? 'green' : '#888' }}>
                    {assignTeacherClass.teachers[subj] || 'Not Assigned'}
                  </span>
                  <button style={{ padding: '0.4rem 1.1rem', borderRadius: 5, background: 'var(--primary-light)', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Add Teacher
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button style={{ flex: 1, padding: '0.8rem', borderRadius: 5, background: 'var(--primary-light)', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setShowAssignTeacherModal(false)}>Cancel</button>
              <button style={{ flex: 1, padding: '0.8rem', borderRadius: 5, background: 'var(--secondary-light)', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/dashboard/allteachers')}>Register New Teacher</button>
            </div>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className='AdminPanel_Model_Registerstudent_modal_overlay'>
          <div className='AdminPanel_Model_Registerstudent_modal'>
            <h2>Register New Student</h2>
            <form onSubmit={handleSubmit} className='AdminPanel_Model_Registerstudent_form'>
              <div className='AdminPanel_Model_Registerstudent_form_row'>
                <div className='AdminPanel_Model_Registerstudent_form_col'>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='AdminPanel_Model_Registerstudent_form_col'>
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
              <div className='AdminPanel_Model_Registerstudent_form_row'>
                <div className='AdminPanel_Model_Registerstudent_form_col'>
                  <label>Password</label>
                  <div className='AdminPanel_Model_Registerstudent_password_input'>
                    <input
                      type={formData.showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className='AdminPanel_Model_Registerstudent_password_toggle'
                      onClick={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                      tabIndex={-1}
                    >
                      {formData.showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className='AdminPanel_Model_Registerstudent_form_col'>
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className='AdminPanel_Model_Registerstudent_form_row'>
                <div className='AdminPanel_Model_Registerstudent_form_col'>
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className='AdminPanel_Model_Registerstudent_form_col'>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className='AdminPanel_Model_Registerstudent_form_row'>
                <div className='AdminPanel_Model_Registerstudent_form_col'>
                  <label>Class</label>
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Class</option>
                    {CLASS_LIST.map(cls => <option key={cls.className} value={cls.className}>{cls.className}</option>)}
                  </select>
                </div>
                <div className='AdminPanel_Model_Registerstudent_form_col'>
                  <label>Subjects</label>
                  <select
                    name="subjects"
                    multiple
                    value={formData.subjects}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.className}
                    style={{ minHeight: '80px' }}
                  >
                    {formData.className && (
                      <>
                        <option value="all">All Subjects</option>
                        {CLASS_LIST.find(cls => cls.className === formData.className)?.subjects.map(subj => (
                          <option key={subj} value={subj}>{subj}</option>
                        ))}
                      </>
                    )}
                  </select>
                  {formData.className && <div style={{ marginTop: '0.5rem', color: '#666' }}><small>Hold Ctrl/Cmd to select multiple subjects</small></div>}
                </div>
              </div>
              <div className='AdminPanel_Model_Registerstudent_form_row'>
                <div className='AdminPanel_Model_Registerstudent_form_col'>
                  <label>Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    placeholder="Auto-assigned or enter manually"
                    disabled={!formData.className}
                  />
                  <small style={{ color: '#888' }}>
                    {formData.className
                      ? 'Auto-assigned. You can change it if needed.'
                      : 'Select a class to auto-assign roll number.'}
                  </small>
                </div>
              </div>
              <div className='AdminPanel_Model_Registerstudent_form_row'>
                {/* <div className='AdminPanel_Model_Registerstudent_form_col'>
                  <label>Grade</label>
                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                  />
                </div> */}
                <div className='AdminPanel_Model_Registerstudent_form_col'>
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
                      className='AdminPanel_Model_Registerstudent_form_img_preview'
                    />
                  )}
                </div>
              </div>
              {/* Parent/Guardian Details Section */}
              <div className='AdminPanel_Model_Registerstudent_form_section'>
                <h3 className='AdminPanel_Model_Registerstudent_form_section_heading'>Parent/Guardian Details</h3>
                <div className='AdminPanel_Model_Registerstudent_form_row'>
                  <div className='AdminPanel_Model_Registerstudent_form_col'>
                    <label>Parent/Guardian Name</label>
                    <input
                      type="text"
                      name="parent"
                      value={formData.parent}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='AdminPanel_Model_Registerstudent_modal_buttons'>
                <button type="submit">Register Student</button>
                <button type="button" onClick={() => { setShowRegisterModal(false); resetForm(); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className='AdminPanel_Model_Registerstudent_modal_overlay'>
          <div className='AdminPanel_Model_Registerstudent_modal'>
            <h2>Student Details</h2>
            <div className='AdminPanel_Model_Registerstudent_details_row'>
              <div className='AdminPanel_Model_Registerstudent_details_text'>
                <p><strong>Name:</strong> {selectedStudent.name}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                <p><strong>Gender:</strong> {selectedStudent.gender}</p>
                <p><strong>Date of Birth:</strong> {selectedStudent.dob}</p>
                <p><strong>Parent/Guardian:</strong> {selectedStudent.parent}</p>
                {/* <p><strong>Address:</strong> {selectedStudent.address}</p> */}
                <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
                {/* <p><strong>Grade:</strong> {selectedStudent.grade}</p> */}
                <p><strong>Class:</strong> {selectedStudent.className || '-'}</p>
                <p><strong>Enrolled Subjects:</strong> {selectedStudent.enrolledSubjects?.length === CLASS_LIST.find(c => c.className === selectedStudent.className)?.subjects.length ? 'All Subjects' : (selectedStudent.enrolledSubjects?.join(', ') || '-')}</p>
                <div className='AdminPanel_Model_Registerstudent_password_row'>
                  <strong>Password:</strong>
                  {editPassword ? (
                    <>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={editPasswordValue}
                        onChange={e => setEditPasswordValue(e.target.value)}
                        className='AdminPanel_Model_Registerstudent_password_edit_input'
                      />
                      <button
                        type='button'
                        className='AdminPanel_Model_Registerstudent_password_toggle'
                        onClick={() => setShowPassword(s => !s)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                      <button
                        type='button'
                        className='AdminPanel_Model_Registerstudent_password_save_btn'
                        onClick={handleSavePassword}
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        className='AdminPanel_Model_Registerstudent_password_cancel_btn'
                        onClick={handleCancelEditPassword}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span className='AdminPanel_Model_Registerstudent_password_value'>
                        {showPassword ? selectedStudent.password : '•'.repeat(selectedStudent.password?.length || 8)}
                      </span>
                      <button
                        type='button'
                        className='AdminPanel_Model_Registerstudent_password_toggle'
                        onClick={() => setShowPassword(s => !s)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                      <button
                        type='button'
                        className='AdminPanel_Model_Registerstudent_password_edit_btn'
                        onClick={handleEditPassword}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
              {selectedStudent.photoURL && (
                <img
                  src={selectedStudent.photoURL}
                  alt={selectedStudent.name}
                  className='AdminPanel_Model_Registerstudent_details_img'
                />
              )}
            </div>
            <button
              className='AdminPanel_Model_Registerstudent_close_btn'
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

export default RegisterStudents;