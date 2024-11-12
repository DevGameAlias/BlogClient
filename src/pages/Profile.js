import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import BlogForm from './BlogForm'; // Import the BlogForm component for submitting new blogs
import BlogListButton from '../components/BlogListButton'; // Adjust the path if necessary
import StorySubmit from "./SubmitStory";
import EventCreation from "../components/EventCreation.js";
import StoryCreation from "../components/StoryCreation.js";

// import StoryDelete from "./DeleteStory";
const Profile = () => {
  const [isVisible,setIsVisible]= useState(false)
  const [blogs, setBlogs] = useState([]);

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
  };

  return (
    <>
          <div className="profile-page">
              <div className="blog">
                  <BlogForm onAddBlog={addBlog} />
                  {/* List of submitted blogs */}
              </div>
              <div className="short-story">
              {/* <StoryCreation /> Add the StoryCreation component here */}
                  {/* Insert Short story CRUD here */}
              </div>
              <div className="blog-list">
                  <BlogListButton /> {/* Add the BlogListButton component here */}
              </div>
          </div>
  {/* // Short story component that needs to be moved into components and called into profile    */}
  
    <div className="blog">{/* Insertn Blog Crud here */}</div>
<button className='bg-blue-500 text-white p-2 rounded hover:animate-pulse '
onClick={()=>{
  setIsVisible(true)
}}>
            Create Story
          </button>
        { isVisible && 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative z-50 ">
            <StoryCreation setIsVisible={setIsVisible}/> Add the StoryCreation component here
            {/* Insert Short story CRUD here */}
          </div>
        </div>
        }

          {/* EventCreation component */}
        <div className="event-creation">
          <EventCreation />
        </div>
        <div className="blog-list">
          <BlogListButton /> {/* Add the BlogListButton component here */}
        </div>
      
      {/* // Short story component that needs to be moved into components and called into profile    */}
      
      <div className="blog">{/* Insertn Blog Crud here */}</div>
      
      
      </>
    );
  };

export default Profile;
