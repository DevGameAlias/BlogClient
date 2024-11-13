import React, { useState, useEffect } from 'react';

const AdminCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3000/comments');
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError('Failed to load comments');
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, []);

  const deleteComment = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/comments/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete comment');
        }

        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== id)
        );
      } catch (error) {
        setError('Failed to delete comment');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800">Comments Section</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-8">
        <div className="comments-section w-full lg:w-1/3">
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="bg-white-50 p-4 rounded-lg shadow-sm mt-4">
                <p className="text-gray-800">{comment.body}</p>
                <p className="text-sm text-gray-500 mt-2">
                  By: {comment.author} | {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => deleteComment(comment._id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCommentsPage;