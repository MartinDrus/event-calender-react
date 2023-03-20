import axios from "axios";
import { useState } from "react";

const EventErstellen = () => {

    const [title, setTitle] = useState("");
    const [beginning, setBeginning] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
 
    const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
      e.preventDefault();

    let jetzt = new Date(`1995-12-17T${start}:00`).getTime()
    let später = new Date(`1995-12-17T${end}:00`).getTime()

    let dauer = später-jetzt

    let newEvent = {
      title: title,
      beginning: beginning,
      start: start,
      end: end,
      duration: new Date(dauer).getHours(),
      location: location,
      description: description
    }
    try {

      let response = await axios.post('http://localhost:8080/protected/events', newEvent, {
        withCredentials: true
      })
      setMessage('Event erfolgreich erstellt!')
      console.log(response);
      
    } catch (error) {
      console.log("🚀 ~ file: EventErstellen.js:43 ~ handleSubmit ~ error:", error)
      setMessage('Eventerstellung nicht erfolgreich - Bitte Eingabe prüfen!')

    }

    setTitle("");
    setBeginning("");
    setStart("");
    setEnd("");
    setLocation("");
    setDescription("");
  };


  return (
    <div className="event-erstellen">
      <h2>Event Erstellen</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="eventname"
          placeholder="Event Name"
          onChange={(e) => setTitle( e.target.value )}
          value={title}
        />
        <label>Datum</label>
        <input
          type="date"
          name="date"
          onChange={(e) => setBeginning( e.target.value )}
          value={beginning}
        />
        <label>von</label>
        <input
          type="time"
          name="start"
          onChange={(e) => setStart( e.target.value )}
          value={start}

        />
        <label>bis</label>
        <input
          type="time"
          name="end"
          onChange={(e) => setEnd( e.target.value )}
          value={end}

        />
        <label>Veranstaltungsort</label>
        <input
          type="text"
          name="ort"
          placeholder="Adresse"
          onChange={(e) => setLocation( e.target.value )}
          value={location}
        />
        <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Event Beschreibung" value={description}/>
        <button className="register-button" type="submit" >Erstellen</button>
        <p>{message}</p>
      </form>
    </div>
  );
}
 
export default EventErstellen;