import React, { useState, useEffect } from 'react';
import { Trash2 } from 'react-feather';

const AdminReviews = ({ storyId }) => { // Accept storyId as a prop
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/storyReview`);
        
        // Check if response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        setReviews(data); // Set the reviews data
      } catch (error) {
        setError(error.message || 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [storyId]); // Re-run when storyId changes

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/storyReview/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete review');
        }

        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== id)
        );
      } catch (error) {
        setError('Failed to delete review');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-serif text-yellow-800">Short Story Reviews</h2>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Reviews List */}
      <div className="flex flex-wrap gap-4">
        <div className="w-full">
          {loading ? (
            <p className="text-yellow-800">Loading reviews...</p>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg shadow-md mb-6 transition hover:shadow-lg"
              >
                <p className="text-gray-800">{review.body}</p>
                <p className="text-sm text-gray-500 mt-2">
                  By: {review.author} | {new Date(review.createdAt).toLocaleDateString()}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => deleteReview(review._id)}
                    className=" text-red-600 hover:text-red-800 flex items-top gap-2 px-4 py-1 rounded hover:bg-red-200"
                  >
                    <Trash2 size={20}  /> {/* Trash Icon */}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-yellow-800">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;