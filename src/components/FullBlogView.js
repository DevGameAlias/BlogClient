import React from 'react';
import CommentSection from './Comments';

const FullBlogView = ({ selectedBlog, comments, isClosing, closeFullView, onCommentSubmit }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-orange-50 z-50 flex flex-col justify-start items-center p-8 overflow-auto shadow-2xl rounded-lg transition-all duration-500 ease-in-out transform scale-100 ${
        isClosing ? 'scale-90 opacity-0' : ''
      }`}
    >
      <button
        onClick={closeFullView}
        className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-md"
      >
        Close
      </button>
      <h2 className="text-4xl font-bold text-yellow-950 mb-4">{selectedBlog.title}</h2>
      <div className="w-full border-t-4 border-orange-950 mb-6"></div>
      <p className="text-lg text-gray-500 mb-6">By: {selectedBlog.author} | {new Date(selectedBlog.created).toLocaleDateString()}</p>
      <div className="prose prose-xl max-w-3xl text-gray-800 mb-6">
        <p>{selectedBlog.content}</p>
      </div>

      {/* Comment Section */}
      <CommentSection 
        blogId={selectedBlog._id}
        existingComments={comments}
        onCommentSubmit={onCommentSubmit}
      />
    </div>
  );
};

export default FullBlogView;
