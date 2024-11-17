import React, { useState, useEffect } from 'react';
import { Trash2 } from 'react-feather';  // Importing Trash2 icon

const AdminCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch all comments when the component is mounted
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/comments/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);  // Set the comments state
      } catch (error) {
        console.log(error)
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
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-serif text-yellow-800">Blog Comments</h2>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Comments List */}
      <div className="flex flex-wrap gap-4">
        <div className="w-full">
          {loadingComments ? (
            <p className="text-yellow-800">Loading comments...</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg shadow-md mb-4 transition hover:shadow-lg"
              >
                <p className="text-gray-800">{comment.body}</p>
                <p className="text-sm text-gray-500 mt-2">
                  By: {comment.author} | {new Date(comment.createdAt).toLocaleDateString()}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => deleteComment(comment._id)}
                    className=" text-red-600 hover:text-red-800 flex items-top gap-2 px-4 py-1 rounded hover:bg-red-200"
                  >
                    <Trash2 size={20}  /> {/* Trash Icon */}
                    
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-yellow-800">No comments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default AdminCommentsPage;