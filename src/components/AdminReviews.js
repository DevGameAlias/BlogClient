import React, { useState, useEffect } from 'react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3000/storyReview');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data); 
      } catch (error) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/storyReview/${id}`, {
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
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="bg-gray-50 p-4 rounded-lg mt-4">
            <p className="text-gray-800">{review.body}</p>
            <p className="text-sm text-gray-500 mt-2">
              By: {review.author} | {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={() => deleteReview(review._id)}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default AdminReviews;