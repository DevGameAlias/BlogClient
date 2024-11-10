import React, { useState, useEffect } from 'react';

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
      const sortedBlogs = blogsData.sort((a, b) => new Date(b.created) - new Date(a.created));
      setBlogs(sortedBlogs);
    } catch (error) {
      setError('Failed to fetch blogs');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const truncateContent = (content, wordLimit = 30) => {
    const words = content.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : content;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-orange-50">
      <div className='w-full max-w-4xl p-4'>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-yellow-50 p-6 rounded-lg shadow-lg border border-yellow-200">
              <h2 className="text-xl font-bold text-brown-800 mb-2">{blog.title}</h2>
              <p className="text-xs text-gray-500 mb-2">By: {blog.author} | {new Date(blog.created).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-4">{truncateContent(blog.content)}</p>
              <FullContentToggle content={blog.content} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FullContentToggle = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {!isExpanded && (
        <button onClick={handleToggle} className="text-blue-500 hover:text-blue-700">
          Read More
        </button>
      )}
      {isExpanded && (
        <div>
          <p className="text-gray-700 mt-2">{content}</p>
          <button onClick={handleToggle} className="text-blue-500 hover:text-blue-700 mt-2">
            Read Less
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
