import React, { useEffect, useState } from "react";

// User page to review stories created by admin
const StoryPage = () => {
  const [stories, setStories] = useState([]);
  const [expandedStoryId, setExpandedStoryId] = useState(null); // State for expanded story

  const fetchStories = async () => {
    try {
      const response = await fetch("http://localhost:3000/stories");
      const data = await response.json();
      console.log("logging stories", data);   
      // Sort stories by createdAt date in descending order
      const sortedStories = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setStories(sortedStories);
    } catch (error) {
      console.log("Failed to fetch stories", error);
    }
  };

  useEffect(() => {
    fetchStories(); // Fetch stories on component mount
  }, []); // Empty dependency array ensures this runs only once when component mounts

  // Handle expanding/collapsing story content
  const handleExpandStory = (storyId) => {
    console.log("Expanding story with ID:", storyId); // Debugging the button click
    setExpandedStoryId(expandedStoryId === storyId ? null : storyId); // Toggle expanded story
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 flex flex-col justify-center items-center pt-12 pb-12">
      <h1 className="text-3xl font-serif font-bold text-center mb-5">Welcome to my Short Story's</h1>
      <div className="w-full max-w-6xl px-4">
        {/* Display stories or a message if there are no stories */}
        {stories.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {/* Map through stories and render them in a card layout */}
            {stories.map((story) => (
              <div
                key={story._id} // Unique key for each story
                className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-sm flex flex-col justify-between h-full relative border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{story.title}</h2>
                <p className="text-sm text-gray-500 mb-3">
                  Created By: {story.author} @ {new Date(story.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-4">
                  {expandedStoryId === story._id
                    ? story.content // Show full content if story is expanded
                    : story.content.slice(0, 100) + "..."} {/* Truncate content initially */}
                </p>
                <button
                  onClick={() => handleExpandStory(story._id)} // Handle expand/collapse on click
                  className="text-teal-500 hover:text-teal-700 mt-2 transition-colors duration-300"
                >
                  {expandedStoryId === story._id ? "Read Less" : "Read More"} {/* Toggle button text */}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-500 text-center">No stories available.</p> // Message if no stories
        )}
      </div>
    </div>
  );
};

export default StoryPage;