import { NavLink } from "react-router-dom";
import BlogForm from './BlogForm';
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
                <ul>
                    {blogs.map((blog, index) => (
                        <li key={index}>
                            <h3>{blog.title}</h3>
                            <p>{blog.content}</p>
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