import React, { useEffect, useState } from "react";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching events...");
        const response = await fetch("http://localhost:3000/events");
        if (!response.ok) {
          throw new Error("failed to fetch events");
        }
        const result = await response.json();
        console.log("Fetched events:", result);
        setEvents(result);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("unable to fetch events. Please try again");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  const handleEventSignup = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${eventId}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to sign up for event");
      }
      setSignupSuccess("Succesfully signed up for the event");
      setEmail("");
      setSelectedEvent(null);
    } catch (error) {
      setError("Unable to sign up for event, please try again.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100">
      <h2 className="text-3xl font-bold font-serif mb-6">Events</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {signupSuccess && <p className="text-green-500">{signupSuccess}</p>}
      <div className="grid grid-cols-1 gap-6 w-full max-w-4xl">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-6 rounded-lg shadow-lg">
            <p className="font-bold font-serif">
            <span className="font-bold font-serif">Date:</span> {new Date(event.Date).toLocaleDateString()}
            </p>
            <span className="font-bold font-serif">Location:</span> {event.Location}
            <p className="text-lg font-serif">
            <span className="font-bold font-serif">Description:</span> {event.Description}
            </p>
            <button
              onClick={() => setSelectedEvent(event._id)}
              className="mt-4 py-2 px-4 rounded-lg text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Signup
            </button>
          </div>
        ))}
      </div>
   
    {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold mb-4">Sign up for an event</h3>
        <form onSubmit={(e) => {
            e.preventDefault(); 
            handleEventSignup(selectedEvent)
    }}

        >
        <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"/>
        <button type="submit" className="w-full py-2 px-4 rounded-lg text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Sign Up</button>
        </form>
        <button onClick={() => setSelectedEvent(null)} className="mt-4 py-2 px-4 rounded-lg text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" >
        Cancel
        </button>
        </div>
        </div>
    )}
     </div>
);
};

export default EventList
