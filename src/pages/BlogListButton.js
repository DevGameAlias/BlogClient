import React, { useState, useEffect } from 'react';

const BlogListButton = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFetchBlogs = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch('http://localhost:3000/blog/blogs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authentication headers if required
                    // 'Authorization': 'Bearer your-token'
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const fetchedBlogs = await response.json();
            setBlogs(fetchedBlogs);
        } catch (error) {
            setError(`Failed to fetch blogs: ${error.message}`);
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <button
                onClick={handleFetchBlogs}
                disabled={isLoading}
                className={`
                    bg-blue-600 text-white p-2 rounded-md
                    ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}
                    transition duration-200
                `}
            >
                {isLoading ? 'Loading...' : 'Show Blogs'}
            </button>
            
            {error && (
                <p className="text-red-500 mt-2 p-2 bg-red-50 rounded-md">
                    {error}
                </p>
            )}
            
            {blogs.length > 0 && (
                <ul className="mt-4 w-full max-w-2xl">
                    {blogs.map((blog) => (
                        <li key={blog.id} className="mb-4 p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold">{blog.title}</h3>
                            <p className="mt-2 text-gray-600">{blog.content}</p>
                        </li>
                    ))}
                </ul>
            )}
            
            {!error && blogs.length === 0 && !isLoading && (
                <p className="text-gray-500 mt-4">No blogs available</p>
            )}
        </div>
    );
};

export default BlogListButton;