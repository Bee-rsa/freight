import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar"; // Import the Sidebar component

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

  const handleCreateEvent = () => {
    const title = prompt('Enter Event Title:');
    const date = prompt('Enter Event Date (YYYY-MM-DD):');
    if (title && date) {
      setEvents([...events, { id: Date.now(), title, date }]);
    }
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

  const renderEventContent = (eventInfo) => {
    // Filter events for the current day
    const dayEvents = events.filter((event) => event.date === eventInfo.dateStr);

    // Render the circle only if there are 2 or more events for the day
    if (dayEvents.length > 1) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20px',
            width: '20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            borderRadius: '50%',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {dayEvents.length} {/* Display the number of events */}
        </div>
      );
    }

    return null; // No circle if there's 0 or 1 event
  };

  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#ffffff',
    },
    content: {
      display: 'flex',
      flex: 1,
      padding: '1rem',
      marginTop: '3rem', // Adds margin at the top of the calendar content
    },
    half: {
      flex: 1,
      padding: '1rem',
    },
    calendarHalf: {
      borderRight: '1px solid #ddd',
      display: 'flex',
      flexDirection: 'column',
    },
    eventsHalf: {
      overflowY: 'auto',
      paddingLeft: '1rem',
    },
    header: {
      marginBottom: '1rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      borderLeft: '2px solid #ddd',
      paddingLeft: '1rem',
    },
    listItem: {
      marginBottom: '0.5rem',
      fontSize: '1rem',
      lineHeight: '1.5',
    },
    actions: {
      marginTop: '1rem',
    },
    button: {
      marginRight: '0.5rem',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#007BFF',
      color: '#fff',
      borderRadius: '5px',
    },
    buttonDelete: {
      backgroundColor: '#DC3545',
    },
    createButton: {
      marginTop: '1rem',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#28A745',
      color: '#fff',
      borderRadius: '5px',
      alignSelf: 'center',
    },
  };

  return (
    <div className='flex flex-row h-screen w-full'>
      {/* Sidebar */}
      <Sidebar /> {/* Render the Sidebar on the left */}

      {/* Main content */}
      <div className='flex-1 overflow-auto bg-white font-poppins relative z-40 w-full'>
        <Header title='Overview' />
        <div style={styles.content}>
          <div style={{ ...styles.half, ...styles.calendarHalf }}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              eventContent={renderEventContent} // Attach the custom rendering function
            />
            <button style={styles.createButton} onClick={handleCreateEvent}>
              Create Event
            </button>
          </div>
          <div style={{ ...styles.half, ...styles.eventsHalf }}>
            <h2 style={styles.header}>Events for the Day</h2>
            <ul style={styles.list}>
              {events.map((event) => (
                <li key={event.id} style={styles.listItem}>
                  <strong>{event.date}</strong>: {event.title}
                </li>
              ))}
            </ul>
            {selectedEvent && (
              <div style={styles.actions}>
                <p>Selected Event: {selectedEvent.title}</p>
                <button style={styles.button} onClick={handleEditEvent}>
                  Edit Event
                </button>
                <button
                  style={{ ...styles.button, ...styles.buttonDelete }}
                  onClick={handleDeleteEvent}
                >
                  Delete Event
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
