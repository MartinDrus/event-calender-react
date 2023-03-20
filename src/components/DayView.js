import { useNavigate } from "react-router-dom";

function DayView({ events, userEvents, verifiedUser }) {
  const navigate = useNavigate();

  const handleClick = (id, isAttending) => {
    navigate(`/events/${id}`, {state: {isAttending: isAttending}});
  };

  let eventDay = events.map((event) => {

    let styleClass = 'event-title';
    let isAttending = false;

    if(userEvents.length > 0) {
      userEvents.forEach(userEvents => {
        if(userEvents._id === event._id) {
          styleClass += ' userAttends';
          isAttending = true;
        }
      });
    }


    if (verifiedUser) {
      return (
        <a key={event._id} onClick={() => handleClick(event._id, isAttending)}>
          <h3 className={styleClass}>{event.title} {event.start}</h3>
        </a>
      );
    } else {
      return <h3 key={event._id} className={styleClass}>{event.title} {event.start}</h3>
    }


  });

  let eventOccurs = eventDay.length === 0 ? <p>keine Termine</p> : eventDay

  return <>{eventOccurs}</>;
}

export default DayView;
