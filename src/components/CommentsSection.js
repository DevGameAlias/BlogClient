import React from 'react';

const CommentSection = ({ comments, newComment, handleCommentChange, handleCommentSubmit, author, handleAuthorChange }) => {
  return (
    <div className="mt-8 w-full max-w-3xl">
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>

{/* Display existing comments */}
<div className="space-y-4 mb-6">
        {/* Only attempt to map if comments is an array */}
        {Array.isArray(comments) && comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-800">{comment.body}</p>
            <p className="text-sm text-gray-500 mt-2">
              By: {comment.author} | {new Date(comment.created).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      
      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4">
        {/* Author Input */}
        <input
          type="text"
          value={author}
          onChange={handleAuthorChange}
          placeholder="Enter your name"
          className="p-4 border border-gray-300 rounded-md"
          required
        />

        {/* Comment Textarea */}
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write your comment..."
          rows="4"
          className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors duration-300"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
