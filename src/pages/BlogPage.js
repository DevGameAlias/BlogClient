import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommentSection from '../components/CommentsSection';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null); // state to track selected blog
  const [isClosing, setIsClosing] = useState(false); // state to track closing effect
  const [newComment, setNewComment] = useState(""); // state to track new comment input
  const [comments, setComments] = useState([]); // state to track comments for selected blog
  const [author, setAuthor] = useState("");  // State for storing the author's name
 

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
      const response = await fetch(`http://localhost:3000/comments/blog/${blogId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const commentsData = await response.json();
      console.log(commentsData); // Check what the backend returns
      
      if (Array.isArray(commentsData)) {
        setComments(commentsData);  // Set comments only if it's an array
      } else {
        setComments([]);  // Reset to an empty array if it's not an array
      }
    } catch (error) {
      setComments([]);  // Reset to an empty array in case of error
      console.error('Error fetching comments:', error);
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
    console.log('Selected Blog:', blog);  // Log the entire blog object to check the structure
    if (!blog._id) {
      console.error('Blog _id is missing!');
      return;  // Prevent fetch if _id is missing
    }
    setSelectedBlog(blog);
    fetchComments(blog._id); // Use _id instead of id
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

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value); // This will update the author state as the user types
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() === "") return; // Don't submit if the comment is empty
    if (!selectedBlog || !selectedBlog._id) {
      console.error("No blog selected or blog ID is missing");
      return;
    }

    
   
  
  
  const newCommentData = {
    body: newComment,
    author: author,
    blogId: selectedBlog._id, // Add the blogId to tie the comment to the selected blog
  };

  // Optimistically add the new comment to the list
  setComments([...comments,newCommentData]); // Temporary ID
  setNewComment(""); // Clear the comment input field

    try {
      const response = await fetch(`http://localhost:3000/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCommentData),
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

            
            {/* Pass props to the CommentSection */}
            <CommentSection 
              comments={comments}
              newComment={newComment}
              handleCommentChange={handleCommentChange}
              handleCommentSubmit={handleCommentSubmit}
              author={author}  // Pass author state as a prop
              handleAuthorChange={handleAuthorChange}  // Pass handler for author input
            />
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
