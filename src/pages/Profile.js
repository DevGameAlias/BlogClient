
import React, {  useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import BlogForm from './BlogForm';
import BlogList from "./BlogList.js";

import StorySubmit from "./SubmitStory";
import EventCreation from "../components/EventCreation.js";
import StoryCreation from "../components/StoryCreation.js";

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
  };

  return (

    <div className="grid">
      <div className="grid">
        {/* Left Column - Blog Section */}
        <div className="grid bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100">
          <BlogForm onAddBlog={addBlog} />\
          <div className="flex justify-center my-4">
          <button 
            className="bg-yellow-900 text-orange-100 py-2 px-6 rounded-md hover:bg-orange-950 transition duration-500 mb-4" 
            onClick={() => navigate('/bloglist')}
          >
            Go to BlogList
          </button>
          </div>
          <div className="flex justify-center my-4">
          <button 
            className="bg-yellow-900 text-orange-100 py-2 px-6 rounded-md hover:bg-orange-950 transition duration-500 mb-4" 
            onClick={() => navigate('/adminReviewComment')}
          >
            Review Comments
          </button>
          </div>
          {/* Right Column - Story and Event Section */}
          <div className="grid bg-brown from-orange-100 via-orange-200 to-orange-100">
          <div className="flex justify-center my-4">
            <button 
              className="bg-yellow-900 text-orange-100 py-2 px-6 rounded-md hover:bg-orange-950 transition duration-500 mb-4"
              onClick={() => setIsVisible(true)} 
            >
              Create Story
            </button>
            </div>

            <div className="grid bg-brown from-orange-100 via-orange-200 to-orange-100">
          <div className="flex justify-center my-4">
            <button 
              className="bg-yellow-900 text-orange-100 py-2 px-6 rounded-md hover:bg-orange-950 transition duration-500 mb-4"
              onClick={() => navigate('/storylist')} 
            >
              Story List
            </button>
            </div>
            
            <div className="event-creation">
              <EventCreation />
            </div>

          </div>

        </div>
      </div>

      {/* Story Creation Modal */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-amber-800 hover:bg-amber-900 text-black px-4 py-2 rounded transition-colors duration-200">
            <StoryCreation setIsVisible={setIsVisible} />
          </div>
        </div>
      )}
      </div>
      </div>

  );
};

export default Profile;