//Profiile
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import StorySubmit from "./SubmitStory";
// import StoryDelete from "./DeleteStory";

const Profile = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // handles loading so no additional submits happen during fetch
  const [error, setError] = useState(""); // handle error
  const [success, setSuccess] = useState(""); //handle success feedback

  return (
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
  );
};

export default Profile;
