import React, { useEffect, useState } from "react";
// user page to review story created by admin
const StoryPage = () => {

  const [stories, setStories] = useState([]);
// story fetch
  const fetchStories = async () => {
    try {
      const response = await fetch("http://localhost:3000/stories");
      const data = await response.json();
      console.log("logging", data);

      setStories(data);
    } catch (error) {
      console.log("failed to fetch stories", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    //Container for page
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 flex flex-col justify-center items-center pt-12 pb-12">
        <h1 className="text-3xl font-bold mb-5" >Story List</h1>
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-wrap justify-center gap-8">
            {/* Story mapping to set stories in a card */}
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-sm flex flex-col justify-between h-full relative border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{story.title}</h2>
              <p className="text-sm text-gray-500 mb-3">
                Created By: {story.author} @ {new Date(story.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">{story.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;