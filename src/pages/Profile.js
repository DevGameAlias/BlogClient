import { NavLink } from "react-router-dom";
import BlogForm from './BlogForm'; // Import the BlogForm component for submitting new blogs
import { useState } from "react";

const Profile = () =>{
    const[blogs, setBlogs] = useState([]);

    const addBlog = (blog) => {
        setBlogs ([...blogs, blog]);
};
    return(
        <>
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

        </>
    );
}

export default Profile;