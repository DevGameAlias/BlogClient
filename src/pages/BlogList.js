import React, { useState } from 'react';
import { Pencil, Trash2, X, Check, Plus } from 'lucide-react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedBlog, setEditedBlog] = useState({ title: '', content: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });

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
      console.error('Error fetching blogs:', error);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setEditedBlog({ title: blog.title, content: blog.content });
  };

  const handleSave = () => {
    if (editedBlog.title && editedBlog.content) {
      setBlogs(blogs.map(blog => 
        blog.id === editingId 
          ? { ...blog, title: editedBlog.title, content: editedBlog.content }
          : blog
      ));
      setEditingId(null);
    } else {
      alert('Title and content cannot be empty.');
    }
  };

  // Updated handleDelete function with a DELETE fetch call
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/blog/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleAdd = () => {
    if (newBlog.title && newBlog.content) {
      const newId = Math.max(...blogs.map(blog => blog.id)) + 1;
      setBlogs([...blogs, { id: newId, ...newBlog }]);
      setNewBlog({ title: '', content: '' });
      setIsAddingNew(false);
    } else {
      alert('Title and content cannot be empty.');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-yellow-800">Blog Posts</h1>
        <button
          onClick={handleFetchBlogs}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Show Blogs
        </button>
        {!isAddingNew && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <Plus size={16} /> Add New Post
          </button>
        )}
      </div>

      {isAddingNew && (
        <div className="border-2 rounded-lg p-4 bg-yellow-50 border-yellow-200 shadow-md mb-4">
          <input
            type="text"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            placeholder="Enter title"
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            placeholder="Enter content"
            className="w-full mb-2 p-2 border rounded"
            rows="3"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAddingNew(false)}
              className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              <X size={16} /> Cancel
            </button>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              <Check size={16} /> Save
            </button>
          </div>
        </div>
      )}

      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="border-2 rounded-lg p-4 bg-yellow-50 border-yellow-200 shadow-md transition hover:shadow-lg"
        >
          {editingId === blog.id ? (
            <>
              <input
                type="text"
                value={editedBlog.title}
                onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
                className="w-full mb-2 p-2 border rounded text-xl font-semibold"
              />
              <textarea
                value={editedBlog.content}
                onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
                rows="3"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingId(null)}
                  className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  <X size={16} /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  <Check size={16} /> Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-yellow-800 mb-2">{blog.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-yellow-700">{blog.content}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
