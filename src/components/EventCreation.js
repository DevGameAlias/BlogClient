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
      const token = document.cookie
        .split(";")
        .find((row) => row.startsWith("token="))
        .split("=")[1];

      const response = await fetch("http://localhost:3000/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    // Event Creation Cardo
    <div className="flex flex-col  min-h-screen  items-center bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 p-6 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>
        <form onSubmit={handleEvent}>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-900 shadow-md text-orange-100 py-2 px-6 rounded-md hover:bg-orange-950 transition duration-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default EventCreation;
