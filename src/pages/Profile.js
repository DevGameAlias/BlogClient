import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import BlogForm from './BlogForm';
import BlogList from '../components/BlogListButton.js'
import StorySubmit from "./SubmitStory";
import EventCreation from "../components/EventCreation.js";
import StoryCreation from "../components/StoryCreation.js";

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
  };

  return (
    <div className="mx-auto bg-amber-800 text-white transition-colors">
      <div className="grid">
        {/* Left Column - Blog Section */}
        <div className="">
          <BlogForm onAddBlog={addBlog} />
        

          {/* Right Column - Story and Event Section */}
        
          <button 
            className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded transition-colors duration-200"
            onClick={() => setIsVisible(true)}
          >
            Create Story
          </button>
          
          <div className="event-creation">
            <EventCreation />
          </div>
        </div>
      </div>

      {/* Story Creation Modal */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded transition-colors duration-200">
            <StoryCreation setIsVisible={setIsVisible} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;