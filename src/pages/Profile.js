import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";



const Profile = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  const StorySubmit = (e) => {

    e.preventDefault();

    try {
      fetch("http://localhost:3000/stories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          title: title,
          content: content,
          description: description,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <>
      <div className="blog">{/* Insertn Blog Crud here */}</div>
      <div className="short-story">
        return (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50  bg-opacity-50`}
        >
          {
            <div
              className={`bg-white p-6 rounded border shadow-md transition-transform duration-2000`}
            >
              <h2 className="text-lg font-bold mb-4">test</h2>

              <form onSubmit={StorySubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 p-2 mb-4 w-full"
                  required
                />

                <input
                  type="description"
                  placeholder="Description"
                  value={description}
                  required
                />

                <input type="text" placeholder="Content" value={content} required />

                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Post
                </button>
              </form>
              <div className="p-1">
                <button className="mt-1  text-green-800">Close</button>
              </div>
            </div>
          }
        </div>
        );
      </div>
    </>
  );
};

export default Profile;
