import React, { useState, useEffect } from 'react';

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);  // Initialize as an empty array
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");

  // Fetch comments when blogId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/comments/blog/${blogId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        // Fetch the comments data and check if it's an array
        const commentsData = await response.json();
        
        // Make sure commentsData is an array
        if (Array.isArray(commentsData)) {
          setComments(commentsData);
        } else {
          console.error('Expected an array of comments, but got:', commentsData);
          setComments([]);  // Default to an empty array if data isn't an array
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]);  // Reset to empty array in case of an error
      }
    };

    if (blogId) {
      fetchComments(); // Fetch comments if blogId is available
    }
  }, [blogId]); // Depend on blogId, so fetch again if it changes

  // Handle new comment input change
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const [error, setError] = useState(null);

  // Handle new comment submission
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() === ""|| author.trim() === "") return;

    const newCommentData = {
      body: newComment,
      author: author,
      blogId: blogId,
    };
   
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

      // Only add the comment to the list once it has been successfully saved to the server
      const savedComment = await response.json();

      setComments((prevComments) => [...prevComments, savedComment]);
      setNewComment("") // reset the comment input
      setAuthor(""); // reset the comment input
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError("Failed to post comment, please try again.");
    }
  };

  return (
    <div>
      <div className="comments-section mt-6">
        <h3 className="text-2xl font-bold">Comments</h3>

        {/* Render Comments */}
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-white p-4 rounded-lg shadow-sm mt-4">
              <p className="text-gray-800">{comment.body}</p>
              <p className="text-sm text-gray-500 mt-2">
                By: {comment.author} | {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}

        {/* Comment Input Form */}
        <div className="mt-6">
          <h4 className="text-lg">Add a comment</h4>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write your comment..."
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
            />
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
            />
            <button
              type="submit"
              className="mt-2 text-white bg-teal-500 hover:bg-teal-700 py-2 px-4 rounded-md"
            >
              Submit Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
