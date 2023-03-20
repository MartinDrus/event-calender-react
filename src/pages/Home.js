import Calendar from "react-calendar";
import React, { useEffect, useState } from "react";
import DayView from "../components/DayView";
// import "react-calendar/dist/Calendar.css";
import { useContext } from "react";
import { UserContext } from "../App";

import * as eventProvider from "../service/eventProvider";
import { userStatus } from "../service/checkStatus.js";
// import { useLocation } from "react-router-dom";

const Home = () => {
  let status = useContext(UserContext);

  const [verifiedUser, setVerifiedUser] = useState(status.success);
  const [userEvents, setUserEvents] = useState([]);
  const [userEventDates, setUserEventsDates] = useState([])


  const [dateList, setDateList] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);

  const [value, onChange] = useState(new Date());
  const [showDay, setShowDay] = useState(false);

  useEffect(() => {
    //!Prüfe Role des Users
    const fetchStatus = async () => {
      let newStatus = await userStatus();
      setVerifiedUser(newStatus.success);
    };
    fetchStatus().catch(console.error);
    //!Hole Events des eingeloggten Users
    const fetchUserEvents = async () => {
      let userEvents = await eventProvider.getUserEventsByTokenId();
      setUserEvents(userEvents);

      let userEventDates = []
      if(userEvents.length > 0){
        userEventDates = userEvents.map((event) => {
          let day = event.beginning.split("T")[0];
          let date = new Date(day);
          date.setDate(date.getDate() - 1);
          return date;
        });
      }

      setUserEventsDates(userEventDates);
    };
    fetchUserEvents().catch(console.error);
    //!Hole Eventvorschau und extrahiere deren Datum/Start
    const fetchData = async () => {
      const data = await eventProvider.getEventPreview();
      setAllEvents(data);

      let eventDates = data.map((event) => {
        let day = event.beginning.split("T")[0];
        let date = new Date(day);
        date.setDate(date.getDate() - 1);
        return date;
      });
      setDateList(eventDates);
    };
    fetchData().catch(console.error);
    
  }, [status]);

  useEffect(() => {
    let dayEvents = allEvents.filter((event) => {
      return new Date(event.beginning).toDateString() === value.toDateString();
    });
    setDayEvents(dayEvents);
  }, [value]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const isMarked = dateList.find(
        (d) => d.toISOString().split("T")[0] === dateString
      );

      const isAttending = userEventDates.find(
        (d) => d.toISOString().split("T")[0] === dateString
      );

      if(isAttending) {
        return <div className="markAttending">{""}</div>
      }

      return isMarked ? <div className="marked">{""}</div> : null;
    }
    return null;
  };

  

  const popUpOpen = () => {
    setShowDay(true);
  };
  const popUpClose = () => {
    setShowDay(false);
  };

  return (
    <div className="home">
      <h2>Kalender</h2>
      <div className="kalender">
        <Calendar
          onClickDay={popUpOpen}
          tileContent={tileContent}
          onChange={onChange}
          value={value}
        />
      </div>
      {showDay && (
        <div className="day">
          {/* {dayView} */}
          <DayView events={dayEvents} userEvents={userEvents} verifiedUser={verifiedUser}/>
          <button onClick={popUpClose}>X</button>
        </div>
      )}
      <div className="kalender-infos">
        <p>
          <div className="punkt blau"></div>
          mindestens 1 Event findet an diesem Tag statt!
        </p>
        <p>
          <div className="punkt rot"></div>
          mindestens 1 Event, an dem du teilnimmst, findet an diesem Tag statt!
        </p>
      </div>
    </div>
  );
};

export default Home;
