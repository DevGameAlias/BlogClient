import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null); // state to track selected blog
  const [isClosing, setIsClosing] = useState(false); // state to track closing effect
  const [newComment, setNewComment] = useState(""); // state to track new comment input
  const [comments, setComments] = useState([]); // state to track comments for selected blog

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3000/blog/blogs'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const blogsData = await response.json();
      // Sort the blogs by creation date (descending)
      const sortedBlogs = blogsData.sort((a, b) => new Date(b.created) - new Date(a.created));
      setBlogs(sortedBlogs);
    } catch (error) {
      setError('Failed to fetch blogs');
      console.error(error);
    }
  };

  const fetchComments = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:3000/blog/comments/${blogId}`); // API to fetch comments for the blog
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const commentsData = await response.json();  // Correct variable name
      setComments(commentsData);  // Set the comments data
    } catch (error) {
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

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    fetchComments(blog.id); // Fetch comments when a blog is selected
  };

  const closeFullView = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedBlog(null);
      setIsClosing(false);
      setComments([]); // Clear comments when closing
    }, 300);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() === "") return; // Don't submit if the comment is empty

    try {
      const response = await fetch(`http://localhost:3000/blog/comments/${selectedBlog.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      // After successful comment submission, fetch the updated list of comments
      const updatedComments = await response.json();
      setComments(updatedComments);
      setNewComment(""); // Clear the comment input field
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 flex flex-col justify-center items-center pt-12 pb-12">
      <div className="w-full max-w-6xl px-4">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* If there's a selected blog, show it in full-screen mode */}
        {selectedBlog ? (
          <div
            className={`fixed top-0 left-0 w-full h-full bg-orange-50 z-50 flex flex-col justify-start items-center p-8 overflow-auto shadow-2xl rounded-lg transition-all duration-500 ease-in-out transform scale-100 ${
              isClosing ? 'scale-90 opacity-0' : ''
            }`}
          >
            <button
              onClick={closeFullView}
              className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-md"
            >
              Close
            </button>
            <h2 className="text-4xl font-bold text-yellow-950 mb-4">{selectedBlog.title}</h2>
            <div className="w-full border-t-4 border-orange-950 mb-6"></div>
            <p className="text-lg text-gray-500 mb-6">By: {selectedBlog.author} | {new Date(selectedBlog.created).toLocaleDateString()}</p>
            <div className="prose prose-xl max-w-3xl text-gray-800 mb-6">
              <p>{selectedBlog.content}</p>
            </div>

            {/* Comment Section */}
            <div className="mt-8 w-full max-w-3xl">
              <h3 className="text-2xl font-semibold mb-4">Comments</h3>

              {/* Display existing comments */}
              <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-800">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-2">By: {comment.author} | {new Date(comment.created).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4">
                <textarea
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Write your comment..."
                  rows="4"
                  className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors duration-300"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-sm flex flex-col justify-between h-full relative border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-3">
                  By: {blog.author} | {new Date(blog.created).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-4">{truncateContent(blog.content)}</p>
                <button
                  onClick={() => handleReadMore(blog)}
                  className="text-teal-500 hover:text-teal-700 mt-2 transition-colors duration-300"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
