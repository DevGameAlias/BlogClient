import React, { useState, useEffect } from 'react';
import AdminReviews from './AdminReviews'; // Adjust the path if needed

const AdminCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch Comments for the Admin page
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3000/comments'); // API endpoint for comments
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data); // Update state with the fetched comments
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments, please try again later.');
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, []); // Fetch comments when component mounts

  return (
    <div className="admin-dashboard p-6">
      <h1 className="text-3xl font-bold mb-6"></h1>

      {/* Error handling */}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-8">
        {/* Left Section for Comments */}
        <div className="comments-section w-full lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">All Comments</h2>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="bg-white p-4 rounded-lg shadow-sm mt-4">
                <p className="text-gray-800">{comment.body}</p>
                <p className="text-sm text-gray-500 mt-2">
                  By: {comment.author} | {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </div>

        {/* Right Section for Reviews */}
        <div className="reviews-section w-full lg:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">All Reviews</h2>
          <AdminReviews /> {/* Component to show all reviews */}
        </div>
      </div>
    </div>
  );
};

// Export should be at the bottom, outside of any function or block
export default AdminCommentsPage;