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
    // we may change this form to include 
    return ( 
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 p-6 transition-all duration-1000">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-4xl font-serif font-thin text-center mb-6">Add a New Blog</h2> 
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
                    className="w-full bg-yellow-900 shadow-md text-orange-100 py-2 px-6 rounded-md hover:bg-orange-600 transition duration-500"
                >
                    Add Blog
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
