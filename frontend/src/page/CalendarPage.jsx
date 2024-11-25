import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (info) => {
    const title = prompt('Enter Event Title:');
    if (title) {
      setEvents([...events, { id: Date.now(), title, date: info.dateStr }]);
    }
  };

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === parseInt(info.event.id));
    if (event) setSelectedEvent(event);
  };

  const handleEditEvent = () => {
    if (!selectedEvent) return;
    const newTitle = prompt('Edit Event Title:', selectedEvent.title);
    if (newTitle) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? { ...event, title: newTitle } : event
        )
      );
      setSelectedEvent(null);
    }
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    setSelectedEvent(null);
  };

  const styles = {
    content: {
      display: 'flex',
      flex: 1,
      padding: '1rem',
      marginTop: '3rem',
      position: 'relative',
    },
    half: {
      flex: 1,
      padding: '1rem',
    },
    calendarHalf: {
      borderRight: '1px solid #dddddd',
      display: 'flex',
      flexDirection: 'column',
    },
    eventsHalf: {
      overflowY: 'auto',
      paddingLeft: '1rem',
    },
    borderBlocker: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '1px',
      height: '30rem',
      backgroundColor: '#ffffff', // Same as the background color to block the border
      zIndex: 1,
    },
  };

  return (
    <div className='flex h-screen w-full overflow-hidden bg-white'>
      <Sidebar />
      <div className='flex-1 overflow-auto bg-white font-poppins relative z-40 w-full'>
        <Header title="Overview" />
        <div style={styles.content}>
          {/* Border Blocker */}
          <div style={styles.borderBlocker}></div>
          <div style={{ ...styles.half, ...styles.calendarHalf }}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              height="auto" // Ensure the calendar adjusts dynamically to content
            />
          </div>
          <div style={{ ...styles.half, ...styles.eventsHalf }}>
            <h2>Events for the Day</h2>
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <strong>{event.date}</strong>: {event.title}
                </li>
              ))}
            </ul>
            {selectedEvent && (
              <div>
                <p>Selected Event: {selectedEvent.title}</p>
                <button onClick={handleEditEvent}>Edit Event</button>
                <button onClick={handleDeleteEvent}>Delete Event</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
