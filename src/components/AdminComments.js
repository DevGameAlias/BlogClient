import React, { useState, useEffect } from 'react';

const AdminCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3000/comments/admin');
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data); // Update state with the fetched comments
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments, please try again later.');
      }
    };

    fetchComments(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="admin-comments-page p-6">
      <h1 className="text-3xl font-bold mb-4">Admin - All Comments</h1>

      {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-white p-4 rounded-lg shadow-sm mt-4">
              <p className="text-gray-800">{comment.body}</p>
              <p className="text-sm text-gray-500 mt-2">
                By: {comment.author} | {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              {/* Add any additional comment details here (e.g., approval toggle, delete button) */}
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCommentsPage;