export const NOTIFICATION_TYPES = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'teacher_application', label: 'Teacher Applications' },
    { value: 'student_application', label: 'Student Applications' },
    { value: 'teacher_request', label: 'Teacher Requests' },
  ];
  
  export const SAMPLE_NOTIFICATIONS = [
    { id: 1, type: 'teacher_application', message: 'A New person applied to become a teacher.', read: false, time: '2 min ago' },
    { id: 2, type: 'student_application', message: 'A new student applied for admission.', read: false, time: '10 min ago' },
    { id: 3, type: 'teacher_request', message: 'Teacher John requested a schedule change.', read: true, time: '1 hour ago' },
    { id: 4, type: 'teacher_application', message: 'Another teacher application received.', read: false, time: 'Yesterday' },
    { id: 5, type: 'student_application', message: 'Student Jane Doe registered.', read: true, time: '2 days ago' },
    { id: 6, type: 'teacher_request', message: 'Teacher Sarah asked about syllabus.', read: false, time: '3 days ago' },
  ];