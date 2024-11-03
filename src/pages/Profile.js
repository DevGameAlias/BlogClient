import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import BlogForm from './BlogForm'; // Import the BlogForm component for submitting new blogs
import BlogListButton from '../pages/BlogListButton'; // Adjust the path if necessary

const Profile = () => {
    const [blogs, setBlogs] = useState([]);

    const addBlog = (blog) => {
        setBlogs([...blogs, blog]);
    };

    return (
        <>
            <div className="profile-page">
                <h1>Author Profile</h1>
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
                <div className="short-story">
                    {/* Insert Short story CRUD here */}
                </div>
                <div className="blog-list">
                    <BlogListButton /> {/* Add the BlogListButton component here */}
                </div>
            </div>
        </>
    );
};

export default Profile;
