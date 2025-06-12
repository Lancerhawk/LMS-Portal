import { useState } from 'react';
import './Notifications.css';
import { NOTIFICATION_TYPES } from '../../SampleDatas/SAMPLE_NOTIFICATIONS';
import { SAMPLE_NOTIFICATIONS } from '../../SampleDatas/SAMPLE_NOTIFICATIONS';


function Notifications() {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  const clearAll = () => {
    setNotifications([]);
  };
  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  const toggleRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  // Icon for each notification type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'teacher_application': return '👩‍🏫';
      case 'student_application': return '🧑‍🎓';
      case 'teacher_request': return '📧';
      default: return '🔔';
    }
  };

  return (
    <div className='notifications_container'>
      <div className='notifications_header'>
        <h1>Notifications</h1>
        <div className='notifications_actions'>
          <select value={filter} onChange={e => setFilter(e.target.value)} className='notifications_filter' aria-label="Filter notifications">
            {NOTIFICATION_TYPES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
          <button className='notifications_btn' onClick={markAllAsRead} aria-label="Mark all as read">Mark all as read</button>
          <button className='notifications_btn notifications_btn_clear' onClick={clearAll} aria-label="Clear all notifications">Clear all</button>
        </div>
      </div>
      <div className='notifications_list'>
        {filteredNotifications.length === 0 ? (
          <div className='notifications_empty'>No notifications.</div>
        ) : filteredNotifications.map(n => (
          <section key={n.id} className={`notification_item notification_${n.type} ${n.read ? 'notification_read' : ''}`}> 
            <div className='notification_icon' aria-label={n.type} title={n.type}>
              {getTypeIcon(n.type)}
            </div>
            <div className='notification_content'>
              <div className='notification_message'>{n.message}</div>
              <div className='notification_time'>{n.time}</div>
            </div>
            <div className='notification_actions'>
              <button className='notification_action_btn' aria-label={n.read ? 'Mark as unread' : 'Mark as read'} title={n.read ? 'Mark as unread' : 'Mark as read'} onClick={() => toggleRead(n.id)}>
                {n.read ? '📩' : '📬'}
              </button>
              <button className='notification_action_btn notification_action_close' aria-label='Remove notification' title='Remove' onClick={() => removeNotification(n.id)}>
                ×
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Notifications;