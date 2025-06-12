import { useState } from 'react';
import './Fees.css';

// Sample data - replace with your actual data
const sampleTeachers = [
  {
    id: 1,
    name: 'John Smith',
    subject: 'Mathematics',
    salary: 50000,
    dueDate: '2024-03-25',
    status: 'Pending',
    lastPaid: '2024-02-25',
    details: {
      bankAccount: 'XXXX1234',
      paymentMethod: 'Bank Transfer',
      joiningDate: '2023-01-15',
      contractType: 'Full-time'
    }
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    subject: 'English',
    salary: 45000,
    dueDate: '2024-03-25',
    status: 'Paid',
    lastPaid: '2024-03-01',
    details: {
      bankAccount: 'XXXX5678',
      paymentMethod: 'Bank Transfer',
      joiningDate: '2023-03-01',
      contractType: 'Full-time'
    }
  }
];

const sampleStudents = [
  {
    id: 1,
    name: 'Emma Wilson',
    class: 'Class 10',
    totalFee: 25000,
    paidAmount: 15000,
    dueAmount: 10000,
    dueDate: '2024-03-20',
    status: 'Partial',
    lastPaid: '2024-02-15',
    details: {
      admissionNumber: 'STU2024001',
      parentName: 'Michael Wilson',
      contactNumber: '+91 98765 43210',
      paymentHistory: [
        { date: '2024-02-15', amount: 15000, method: 'Online Transfer' }
      ]
    }
  },
  {
    id: 2,
    name: 'James Davis',
    class: 'Class 11',
    totalFee: 30000,
    paidAmount: 30000,
    dueAmount: 0,
    dueDate: '2024-03-20',
    status: 'Paid',
    lastPaid: '2024-03-01',
    details: {
      admissionNumber: 'STU2024002',
      parentName: 'Robert Davis',
      contactNumber: '+91 98765 43211',
      paymentHistory: [
        { date: '2024-03-01', amount: 30000, method: 'Cash' }
      ]
    }
  }
];

function Fees() {
  const [teachers, setTeachers] = useState(sampleTeachers);
  const [students, setStudents] = useState(sampleStudents);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const handleTeacherStatusChange = (teacherId, newStatus) => {
    setTeachers(prev => prev.map(teacher => 
      teacher.id === teacherId 
        ? { ...teacher, status: newStatus, lastPaid: newStatus === 'Paid' ? new Date().toISOString().split('T')[0] : teacher.lastPaid }
        : teacher
    ));
  };

  const handleStudentPayment = (studentId, amount) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const newPaidAmount = student.paidAmount + Number(amount);
        const newDueAmount = student.totalFee - newPaidAmount;
        return {
          ...student,
          paidAmount: newPaidAmount,
          dueAmount: newDueAmount,
          status: newDueAmount === 0 ? 'Paid' : 'Partial',
          lastPaid: new Date().toISOString().split('T')[0],
          details: {
            ...student.details,
            paymentHistory: [
              ...student.details.paymentHistory,
              { date: new Date().toISOString().split('T')[0], amount: Number(amount), method: 'Cash' }
            ]
          }
        };
      }
      return student;
    }));
  };

  const handleShowDetails = (type, id) => {
    if (type === 'teacher') {
      setSelectedTeacher(teachers.find(t => t.id === id));
      setShowTeacherModal(true);
    } else {
      setSelectedStudent(students.find(s => s.id === id));
      setShowStudentModal(true);
    }
  };

  return (
    <div className="AdminPanel_Model_Fees_container">
      <div className="AdminPanel_Model_Fees_header">
        <h1>Fee Management</h1>
      </div>

      <div className="AdminPanel_Model_Fees_content">
        {/* Teachers Section */}
        <div className="AdminPanel_Model_Fees_section">
          <h2>Teacher Salary Management</h2>
          <div className="AdminPanel_Model_Fees_table_container">
            <table className="AdminPanel_Model_Fees_table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(teacher => (
                  <tr key={teacher.id}>
                    <td>{teacher.name}</td>
                    <td>
                      <select
                        value={teacher.status}
                        onChange={(e) => handleTeacherStatusChange(teacher.id, e.target.value)}
                        className={`AdminPanel_Model_Fees_status ${teacher.status.toLowerCase()}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="AdminPanel_Model_Fees_details_btn"
                        onClick={() => handleShowDetails('teacher', teacher.id)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Students Section */}
        <div className="AdminPanel_Model_Fees_section">
          <h2>Student Fee Management</h2>
          <div className="AdminPanel_Model_Fees_table_container">
            <table className="AdminPanel_Model_Fees_table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Due</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      <span className={`AdminPanel_Model_Fees_status ${student.status.toLowerCase()}`}>
                        ₹{student.dueAmount}
                      </span>
                    </td>
                    <td>
                      <button
                        className="AdminPanel_Model_Fees_details_btn"
                        onClick={() => handleShowDetails('student', student.id)}
                      >
                        Details
                      </button>
                      {student.dueAmount > 0 && (
                        <button
                          className="AdminPanel_Model_Fees_pay_btn"
                          onClick={() => {
                            const amount = prompt('Enter payment amount:');
                            if (amount) handleStudentPayment(student.id, amount);
                          }}
                        >
                          Pay
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Teacher Details Modal */}
      {showTeacherModal && selectedTeacher && (
        <div className="AdminPanel_Model_Fees_modal_overlay">
          <div className="AdminPanel_Model_Fees_modal">
            <h3>Teacher Details - {selectedTeacher.name}</h3>
            <div className="AdminPanel_Model_Fees_details_content">
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Subject:</span>
                <span>{selectedTeacher.subject}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Salary:</span>
                <span>₹{selectedTeacher.salary}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Due Date:</span>
                <span>{selectedTeacher.dueDate}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Last Paid:</span>
                <span>{selectedTeacher.lastPaid}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Bank Account:</span>
                <span>{selectedTeacher.details.bankAccount}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Payment Method:</span>
                <span>{selectedTeacher.details.paymentMethod}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Joining Date:</span>
                <span>{selectedTeacher.details.joiningDate}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Contract Type:</span>
                <span>{selectedTeacher.details.contractType}</span>
              </div>
            </div>
            <div className="AdminPanel_Model_Fees_modal_buttons">
              <button onClick={() => setShowTeacherModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {showStudentModal && selectedStudent && (
        <div className="AdminPanel_Model_Fees_modal_overlay">
          <div className="AdminPanel_Model_Fees_modal">
            <h3>Student Details - {selectedStudent.name}</h3>
            <div className="AdminPanel_Model_Fees_details_content">
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Admission Number:</span>
                <span>{selectedStudent.details.admissionNumber}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Class:</span>
                <span>{selectedStudent.class}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Total Fee:</span>
                <span>₹{selectedStudent.totalFee}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Paid Amount:</span>
                <span>₹{selectedStudent.paidAmount}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Due Amount:</span>
                <span>₹{selectedStudent.dueAmount}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Due Date:</span>
                <span>{selectedStudent.dueDate}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Parent Name:</span>
                <span>{selectedStudent.details.parentName}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_row">
                <span>Contact Number:</span>
                <span>{selectedStudent.details.contactNumber}</span>
              </div>
              <div className="AdminPanel_Model_Fees_details_section">
                <h4>Payment History</h4>
                {selectedStudent.details.paymentHistory.map((payment, index) => (
                  <div key={index} className="AdminPanel_Model_Fees_details_row">
                    <span>{payment.date}</span>
                    <span>₹{payment.amount}</span>
                    <span>{payment.method}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="AdminPanel_Model_Fees_modal_buttons">
              <button onClick={() => setShowStudentModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fees;