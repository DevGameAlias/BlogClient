import React, { useState, useEffect } from 'react';
import AdminReviews from '../components/AdminReviews';  // Import the AdminReviews component
import AdminComments from '../components/AdminComments';  // Import the AdminComments component

const AdminReviewComment = () => {
  return (
    <div className="admin-dashboard p-6">
      <h1 className="text-3xl font-bold mb-6">All blog</h1>

      {/* Flexbox container to arrange Comments and Reviews side by side */}
      <div className="flex gap-8">
        {/* Left Section for Comments */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4"></h2>
          <AdminComments />
        </div>

        {/* Right Section for Reviews */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">All Reviews</h2>
          <AdminReviews />
        </div>
      </div>
    </div>
  );
};

export default AdminReviewComment;