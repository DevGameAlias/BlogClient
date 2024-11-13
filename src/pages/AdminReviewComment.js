import React from 'react';
import AdminReviews from '../components/AdminReviews';  // Import the AdminReviews component
import AdminComments from '../components/AdminComments';  // Import the AdminComments component

const AdminReviewComment = () => {
  return (
    <div className="admin-dashboard p-6">
      <h1 className="text-3xl font-bold mb-6">ALL Blog Comments And Short Story Reviews</h1>

      {/* Flexbox container to arrange Comments and Reviews side by side */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section for Comments */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Comments Section</h2>
          <AdminComments /> {/* Render the AdminComments component */}
        </div>

        {/* Right Section for Reviews */}
        <div className="w-full lg:w-1/2  bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Reviews Section</h2>
          <AdminReviews /> {/* Render the AdminReviews component */}
        </div>
      </div>
    </div>
  );
};

export default AdminReviewComment;