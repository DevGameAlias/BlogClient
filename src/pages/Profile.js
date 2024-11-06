import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import BlogForm from './BlogForm'; // Import the BlogForm component for submitting new blogs
import BlogListButton from '../pages/BlogListButton'; // Adjust the path if necessary
import StorySubmit from "./SubmitStory";
// import StoryDelete from "./DeleteStory";

const Profile = () => {
    const [blogs, setBlogs] = useState([]);

    const addBlog = (blog) => {
        setBlogs([...blogs, blog]);
    };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // handles loading so no additional submits happen during fetch
  const [error, setError] = useState(""); // handle error
  const [success, setSuccess] = useState(""); //handle success feedback


  const StorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading state
    setError(""); //reset previous errors
    setSuccess(""); //Reset previous success messages

    try {
      console.log("Submitting story:", { title, content, description });
      //created const for fetch and await
      const token = document.cookie.split(';').find(row => row.startsWith('token=')).split('=')[1];
      const response = await fetch("http://localhost:3000/stories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: title,
          content: content,
          description: description,
        }),
      });
      // conditional for error checking on creation of story
      if (!response.ok) {
        throw new Error("failed to create story");
      }
      const result = await response.json();
      setSuccess("Story Created");
      console.log(result);
      //Clearing input fields after submission
      setTitle("");
      setContent("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError("Unable to create story. Please try again"); //setting error message
    } finally {
      setLoading(false);
    }
  };

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
// Short story component that needs to be moved into components and called into profile   
<>
      <div className="blog">{/* Insertn Blog Crud here */}</div>
      <div className="short-story">
        <div
          className={`fixed inset-0 flex items-center justify-center z-50  bg-opacity-50`}
        >
          {
            <div
              className={`bg-white p-6 rounded border shadow-md transition-transform duration-2000`}
            >
              <h2 className="text-lg font-bold mb-4">test</h2>

              <form
                onSubmit={(e)=>StorySubmit(
                  e,
                  title,
                  content,
                  description,
                  setTitle,
                  setContent,
                  setDescription,
                  setLoading,
                  setError,
                  setSuccess
                )}
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 p-2 mb-4 w-full"
                  required
                />

                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="border border-gray-300 p-2 mb-4 w-full"
                />
                <textarea
                  type="text"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="border border-gray-300 p-2 mb-4 w-full"
                />
                {/* Button text changes based on loading state to inform progress of submission. Disabled while loading to prevent mulitple submissions */}
                <button
                  type="submit"
                  className={`bg-blue-500 text-white p-2 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </form>
              <div className="p-1">
                <button className="mt-1  text-green-800">Close</button>
              </div>
            </div>
          }
        </div>
      </div>
    </>
        </>
    );
};


export default Profile;
