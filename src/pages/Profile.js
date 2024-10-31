import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";



const Profile = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('') // handle error
  const [success, setSuccess] = useState('') //handle success feedback

  const StorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);// start loading state
    setError(""); //reset previous errors
    setSuccess(""); //Reset previous success messages

    try {
        //created const for fetch and await
     const response = await fetch("http://localhost:3000/stories", {
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
      // conditional for error checking on creation of story
      if(!response.ok){
        throw new Error("failed to create story")
      }
      const result = await response.json();
      setSuccess("Story Created")
      console.log(result);
      //Clearing input fields after submission
      setTitle("")
      setContent("")
      setDescription("")

    } catch (err) {
      console.error(err);
      setError("Unable to create story. Please try again")//setting error message
    }
    finally{
        setLoading(false)
    }
  };

  
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
        
      </div>
    </>
  );
};

export default Profile;
