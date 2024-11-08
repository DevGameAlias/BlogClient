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

    // JSX outside return statement
    const errorMessage = error && <div>{error}</div>;
    const blogsList = blogs.map((blog) => (
        <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
        </div>
    ));

    return (
        <div>
            <button onClick={handleFetchBlogs}>Show Blogs</button>
            {errorMessage}
            {blogsList}
        </div>
    );
};

export default BlogListButton;
