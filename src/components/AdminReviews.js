import React, { useState, useEffect } from 'react';

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Comments from the API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3000/storyReview');
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data); // Set the fetched comments
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments, please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="bg-gray-50 p-4 rounded-lg mt-4">
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
  );
};

export default AdminComments;