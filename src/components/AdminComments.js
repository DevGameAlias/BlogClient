import React, { useState, useEffect } from 'react';
import AdminReviews from './AdminReviews'; // Assuming you have an AdminReviews component

const AdminCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStoryId, setSelectedStoryId] = useState(null); // Store selected storyId for reviews

  // Fetch all comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3000/comments');
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

  // Function to group comments by month and year
  const groupCommentsByDate = (comments) => {
    return comments.reduce((acc, comment) => {
      const date = new Date(comment.createdAt);
      const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`; // Year-Month format (e.g., "2024-11")

      // Group by year and month
      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(comment);

      return acc;
    }, {});
  };

  const groupedComments = groupCommentsByDate(comments);

  return (
    <div className="admin-comments-page p-6">
      <h1 className="text-3xl font-bold mb-4">Admin - All Comments</h1>

      {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

      <div className="flex flex-col lg:flex-row space-x-8">
        {/* Left side - Comments Section */}
        <div className="comments-section w-full lg:w-1/2 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="comments-list">
            {Object.keys(groupedComments).length > 0 ? (
              Object.keys(groupedComments).map((yearMonth) => {
                const [year, month] = yearMonth.split('-');
                const commentsForMonth = groupedComments[yearMonth];

                return (
                  <div
                    key={yearMonth}
                    className="month-card bg-white p-6 rounded-lg shadow-md mt-6"
                  >
                    {/* Display month and year as a card header */}
                    <h3 className="text-2xl font-semibold text-center mb-4">
                      {`${month}/${year}`}
                    </h3>

                    {/* Render comments for the current month inside the card */}
                    <div className="comments-for-month">
                      {commentsForMonth.map((comment) => (
                        <div
                          key={comment._id}
                          className="bg-gray-50 p-4 rounded-lg shadow-sm mt-4"
                        >
                          <p className="text-gray-800">{comment.body}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            By: {comment.author} | {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                          <button
                            onClick={() => setSelectedStoryId(comment.storyId)} // Set storyId for reviews
                            className="text-blue-500 mt-2"
                          >
                            View Reviews
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No comments available.</p>
            )}
          </div>
        </div>

        {/* Right side - Reviews Section */}
        {selectedStoryId && (
          <div className="reviews-section w-full lg:w-1/2 bg-gray-100 p-4 rounded-lg mt-6 lg:mt-0">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <AdminReviews storyId={selectedStoryId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCommentsPage;