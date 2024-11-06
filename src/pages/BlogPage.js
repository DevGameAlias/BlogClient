import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);


      const fetchBlogs = async () => {
        try {
          const response = await fetch('http://localhost:3000/blog/blogs');
          if (!response.ok) {
            throw new Error('Failed to fetch blogs');
          }
          const blogsData = await response.json();
          
          // sort blogs by creation date in decending order
          const sortedBlogs = blogsData.sort((a, b) => new Date(b.created) - new Date(a.created));
          setBlogs(blogsData);
        } catch (error) {
          setError('Failed to fetch blogs');
          console.error(error);
        }
      };
      useEffect(() => {
        fetchBlogs();
      }, []);

  // Function to limit the content to the first 30 words
  const truncateContent = (content, wordLimit = 30) => {
    const words = content.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : content;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100">
      <div className='w-full max-w-4xl px-4'>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-6">
        {blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-2">By: {blog.author} | {new Date(blog.created).toLocaleDateString()}</p>
              {/* Display a truncated preview of the blog content */}
              <p className="text-gray-700">{truncateContent(blog.content)}</p>

              {/* Toggle button to reveal full content */}
              <FullContentToggle content={blog.content} />
      </div>
        ))}
     </div>
    </div>
   </div>
  );
};

// Component to handle toggling of full content
const FullContentToggle = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {!isExpanded && (
        <button
          onClick={handleToggle}
          className="text-blue-500 hover:text-blue-700 mt-2"
        >
          Read More
        </button>
      )}
      
      {isExpanded && (
        <div>
          <p className="text-gray-700 mt-2">{content}</p>
          <button
            onClick={handleToggle}
            className="text-blue-500 hover:text-blue-700 mt-2"
          >
            Read Less
          </button>
        </div>
      )}
    </div>
  );
};


export default BlogPage;
