import React from 'react';

const BlogCard = ({ blog, onReadMore }) => {
  return (
    <div
      key={blog._id}
      className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-sm flex flex-col justify-between h-full relative border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{blog.title}</h2>
      <p className="text-sm text-gray-500 mb-3">
        By: {blog.author} | {new Date(blog.created).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-4">{truncateContent(blog.content)}</p>
      <button
        onClick={() => onReadMore(blog)}
        className="text-teal-500 hover:text-teal-700 mt-2 transition-colors duration-300"
      >
        Read More
      </button>
    </div>
  );
};

const truncateContent = (content, wordLimit = 30) => {
  if (typeof content !== 'string') return '';
  const words = content.split(' ');
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : content;
};

export default BlogCard;
