import React, { useState } from "react";

// event creation component with useStates
const EventCreation = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle submit for event
  const handleEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, location, description }),
      });
      if (!response.ok) {
        throw new Error("failed to create event");
      }
      const result = await response.json();
      setSuccess("Event Created");
      setDate("");
      setLocation("");
      setDescription("");
    } catch (error) {
      setError("unable to create event. Please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="event-creation-card">
      <h2>Create Event</h2>
      <button
        onClick={() =>
          document.getElementById("event-form").classList.toggle("hidden")
        }
      >
        <div id="event-form" className="hidden">
          <form onSubmit={handleEvent}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Event'}
            </button>
          </form>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </div>
      </button>
    </div>
  );
};

export default EventCreation;
