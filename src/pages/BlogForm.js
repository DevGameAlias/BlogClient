// BlogForm.js
import React, { useState } from 'react';

// onAddBlog is the prop that will be called on when new blog is submitted
const BlogForm = ({ onAddBlog }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');

    //handleSubmit is called when the form is submitted, if title, content, and author are not empty it pass validation
    //(e.preventDefault() prevents the default behavior of the form ,(which would reload the page).)
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
                // sending a POST request to backend
                const response = await fetch('http://localhost:3000/blog/blogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newBlog),
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const updateBlog = async (blogId, updatedBlog) => {
                    try {
                        //sending PUT request to update blog
                        const response = await fetch(`http://localhost:3000/blog/blogs/${blogId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedBlog),
                        });
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const data = await response.json();
                        console.log('Blog updated successfully:', data);
                    } catch (error) {
                        console.error('Error updating blog:', error);
                    } finally {

                    }
                };     
                const fetchBlogs = async () => {
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
                        const blogs = await response.json();
                        console.log('Fetched blogs:', blogs);
                        return blogs;
                    } catch (error) {
                        console.error('Error fetching blogs:', error);
                    }
                };                           
                 // this is the new object called newBlog, as long as the validation passes
                onAddBlog(newBlog);
                setTitle('');
                setContent('');
                setAuthor('');
                setTags('');
            } catch (error) {
                console.error('Error adding blog:', error);
            }
        }
    };
    // component returns JSX layout for form (form is styled with tailwind)
    return ( 
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-xl font-semibold mb-4 text-center bg-blue-100">Add a New Blog</h2> 
                <div className="mb-4"> {/*all the code from here down is the input feilds */}
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
                {/* Submit button styled with tailwind */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Add Blog
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
