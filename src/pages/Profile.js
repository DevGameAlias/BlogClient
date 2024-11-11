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
        <h1 className=""></h1>
        <div className="blog">
          <BlogForm onAddBlog={addBlog} />

          {/* List of submitted blogs */}
          <ul>
            {/* Map over the blogs array to create a list item for each blog */}
            {blogs.map((blog, index) => (
              <li key={index}>
                <h3>{blog.title}</h3> {/* Display the blog title */}
                <p>{blog.content}</p> {/* Display the blog content */}
              </li>
            ))}
          </ul>
        </div>
        <div>
            <div className="flex flex-col items-center bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 p-6 ">

          <button className='bg-blue-500 text-white p-2 rounded hover:animate-pulse '
          onClick={()=>{
            setIsVisible(true)
          }}>
            Create Story
          </button>
            </div>
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
      </div>
      {/* // Short story component that needs to be moved into components and called into profile    */}

      <div className="blog">{/* Insertn Blog Crud here */}</div>
      </div>
    </>
  );
};

export default Profile;
