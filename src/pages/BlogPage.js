import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/blog/blogs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const fetchedBlogs = await response.json();
        setBlogs(fetchedBlogs); // Set the fetched blogs to the state
      } catch (error) {
        setError(error.message); // Set the error message if fetch fails
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs(); // Call the fetch function
  }, []); // Empty dependency array to fetch only once when the component mounts

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

      {/* Display error message if fetch fails */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display the list of blogs */}
      <div>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="text-gray-700">{blog.content.slice(0, 100)}...</p>
              <Link
                to={`/blog/${blog.id}`} // Link to the detailed blog page
                className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
              >
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
