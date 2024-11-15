
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
          <BlogForm onAddBlog={addBlog} />
          <button 
            className="grid bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100"
            onClick={() => navigate('/bloglist')}
          >
            Go to BlogList
          </button>

          {/* Right Column - Story and Event Section */}
          <div className="grid bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100">

            <button 
              className="px-4 py-2 rounded transition-colors"
              onClick={() => setIsVisible(true)} 
            >
              Create Story
            </button>
            
            <div className="event-creation">
              <EventCreation />
            </div>

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