import React, { useState } from 'react';

const BlogListButton = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    const handleFetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:3000/blog/blogs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const fetchedBlogs = await response.json();
            setBlogs(fetchedBlogs);
        } catch (error) {
            setError('Failed to fetch blogs');
            console.error('Error fetching blogs:', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleFetchBlogs}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Show Blogs
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <ul className="mt-4">
                {blogs.map((blog) => (
                    <li key={blog.id} className="mb-2">
                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                        <p>{blog.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogListButton;



