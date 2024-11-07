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
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Story List</h1>
      <div className="flex flex-wrap gap-5">
        {stories.map((story) => (
          <div key={story._id} className="bg-white border border-gray-300 rounded-lg p-5 shadow-md w-72">
            <h2 className="text-xl font-semibold">{story.title}</h2>
            <p className="text-gray-700">{story.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;