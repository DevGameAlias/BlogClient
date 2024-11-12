import React, { useState, useEffect } from 'react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3000/storyReview'); // Fetch all reviews
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data); // Update state with the fetched reviews
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews, please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []); // Fetch reviews once when the component mounts

  return (
    <div>
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
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default AdminReviews;