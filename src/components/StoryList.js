import React, { useEffect, useState } from "react";
import DeleteStory from "../pages/DeleteStory2";
//this is what im testing the delete in

const StoryList = () => {

  const [stories, setStories] = useState([]);
  //setting which post is being deleted
  const [postIdDelete, setDeletedpost] = useState(null);//set to null to indicate empty
  //This allows us to keep track of whether a post is selected for deletion or not.
  const fetchStories = async () => {
    try {
      const response = await fetch("http://localhost:3000/stories");
      const data = await response.json();
      console.log("logging", data);

      setStories(data);
    } catch (error) {
      console.log("failed to fetch stories", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  //HandleDelete function is for interaction with the database
  const handleStoryDelete = (deletedId)=>{
    //needs to get the ID thats being deleted throough the params
    setStories(stories.filter(s=>s.id !== deletedId))
    setDeletedpost(null) // Close the popup after deletion
    
  }

  //handlecancel and oncancel need to be separTELY defined
  //Handlecancel function for deleteStory 
  //and the actual onCancel function in the StoryList 
  //onCancel is just a property too be passed untill created

  const onCancel = async () =>{
    setDeletedpost(null) // Close the popup
  }
  
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Story List</h1>
      <div className="flex flex-wrap gap-5">
        {/* .MAP() creates a new array by transforming the elements of an existing array */}
        {stories.map((story) => (

          <div
            key={story._id}
            className="bg-white border border-gray-300 rounded-lg p-5 shadow-md w-72"
          >
            <h2 className="text-xl font-semibold">{story.title}</h2>
            <p className="text-gray-700">{story.content}</p>
            {/* adds button on each story that is array casted */}
            
            <button onClick={()=>setDeletedpost(story._id)} className="bg-amber-400 rounded-md shadow-lg p-1 text-sm inset-y-0.5 hover:animate-pulse">{/*Set the story ID for deletion */}
              <div className=""> DELETE </div>
            </button>


            {/* pass through props POSTID & onDelete */} 
            <div className="bg-stone-950 text-white rounded-md p-2p ">
            {postIdDelete === story._id && <DeleteStory fetchStories={fetchStories} postId={postIdDelete} onDelete={handleStoryDelete} onCancel={onCancel}/>}
            </div>
          </div>
        ))}
        </div>
        </div>

    );
};

export default StoryList;
