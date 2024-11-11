// creating blog with this form
import React, { useState } from 'react';

const BlogForm = ({ onAddBlog }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);  // Controls visibility of the form

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && content && author) {
            const newBlog = {
                title,
                content,
                author,
                created: new Date(),
                updatedAt: new Date(),
                tags: tags.split(',').map(tag => tag.trim()),
            };

            try {
                const response = await fetch('http://localhost:3000/blog/blogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newBlog),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Call the onAddBlog callback to update the parent component
                onAddBlog(newBlog);

                // Reset form fields and hide the form
                setTitle('');
                setContent('');
                setAuthor('');
                setTags('');
                setIsFormVisible(false);  // Hide the form after submission
            } catch (error) {
                console.error('Error adding blog:', error);
            }
        }
    };

    // Toggle the visibility of the form
    const toggleFormVisibility = () => {
        setIsFormVisible(prevState => !prevState);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 p-6 transition-all duration-1000">
            {/* Button to toggle the form */}
            {!isFormVisible && (
                <button
                    onClick={toggleFormVisibility}
                    className="bg-yellow-900 text-orange-100 py-2 px-6 rounded-md hover:bg-orange-950 transition duration-500 mb-4"
                >
                    Add a New Blog
                </button>
            )}

            {/* Conditionally render the form based on isFormVisible state */}
            {isFormVisible && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-4xl font-serif font-thin text-center mb-6">Add a New Blog</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Content:</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Author:</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tags (comma-separated):</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-900 shadow-md text-orange-100 py-2 px-6 rounded-md hover:bg-orange-950 transition duration-500"
                    >
                        Add Blog
                    </button>
                </form>
            )}
        </div>
    );
};

export default BlogForm;

