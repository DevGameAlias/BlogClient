import React, { useEffect, useState} from 'react';


const StoryList = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try{
                const response = await fetch('http://localhost:3000/stories')
                const data = await response.json();
                console.log("logging",data);
                
                setStories(data)
            } catch (error){
                console.log('failed to fetch stories', error);
                
            }
        
        }
        fetchStories();
    } ,[])
    


    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100">
        {/* Container for the story list */}
        <h1 className="text-3xl font-bold mb-5">Story List</h1>
        {/* Title for the story list */}
        <div className="flex flex-col items-center gap-5 w-full max-w-4xl">
          {/* Container for the stories, arranged in a column and centered */}
          {stories.map((story) => (
            <div key={story._id} className="bg-white border border-gray-300 rounded-lg p-5 shadow-md w-full max-w-4xl">
              {/* Individual story card */}
              <h2 className="text-xl font-semibold">{story.title}</h2>
              {/* Story title */}
              <p className="text-gray-700">{story.content}</p>
              {/* Story content */}
            </div>
          ))}
        </div>
      </div>
    );
};

export default StoryList;