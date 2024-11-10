import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import BlogForm from './BlogForm'; // Import the BlogForm component for submitting new blogs
import BlogListButton from '../components/BlogListButton'; // Adjust the path if necessary
import StorySubmit from "./SubmitStory";
import EventCreation from "../components/EventCreation.js";
import StoryCreation from "../components/StoryCreation.js";

// import StoryDelete from "./DeleteStory";
const Profile = () => {
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
        <div className="short-story">
          <StoryCreation /> Add the StoryCreation component here
          {/* Insert Short story CRUD here */}
        </div>
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
