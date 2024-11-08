import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, X, Check, Plus } from 'lucide-react';
function BlogList() {
    const [blogs, setBlogs] = useState([
        { title: 'My First Blog', content: 'This is my first post.' },
        { title: 'My First Blog Post', content: 'This is the content of my first blog post.' },
        { title: 'My First Blog Post', content: 'This is the content of my first blog post.' },
        { title: 'Space', content: 'In this blog post, we will dive into the wonders of the universe, exploring galaxies, stars, and the mysteries of black holes.' },
        { title: 'First Blog from Fetch', content: 'First time fetch from backend from form.' },
    ]);

    return (
        <div className="p-4 space-y-4">
            {blogs.map((blog, index) => (
                <div
                    key={index}
                    className="border-2 rounded-lg p-4 bg-brown-50 border-brown-200 shadow-md transition hover:shadow-lg"
                >
                    <h2 className="text-xl font-semibold text-brown-800 mb-2">{blog.title}</h2>
                    <p className="text-brown-700">{blog.content}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
