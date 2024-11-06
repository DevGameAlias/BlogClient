import React from 'react';

const Book = () => {
  const book = {
    title: "God, Country, Family: Three Short Stories", // Change this to your book title
    description: "Three Stories pulling you in with questions of belief, War, Tears and Laugher  ...", // Provide a short description of your book
    coverImageUrl: "https://m.media-amazon.com/images/I/714MiqrkPhL._SL1500_.jpg", // book cover image URL
    amazonLink: "https://a.co/d/8bZOQID"  // Link to Amazon book page
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">{book.title}</h1>
      
      {/* Book Cover Image */}
      <div className="flex justify-center mb-4">
        <img 
          src={book.coverImageUrl} 
          alt={book.title} 
          className="w-48 h-72 object-cover rounded-lg"
        />
      </div>

      {/* Book Description */}
      <p className="text-lg text-gray-700 mb-6">{book.description}</p>

      {/* Amazon Link */}
      <div className="flex justify-center">
        <a 
          href={book.amazonLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-6 py-2 bg-yellow-500 text-white text-lg rounded-md hover:bg-yellow-600 transition-all duration-200"
        >
          Buy on Amazon
        </a>
      </div>
    </div>
  );
}

export default Book;
