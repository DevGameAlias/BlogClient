import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import clientImage from '../assets/MikeN.png'; 


const HomePage = () => {
  const book = {
    title: "God, Country, Family: Three Short Stories", // book title
    description: "Three Stories pulling you in with questions of belief, War, Tears and Laugher  ...", // short description of book
    coverImageUrl: "https://m.media-amazon.com/images/I/714MiqrkPhL._SL1500_.jpg", // book cover image URL
    amazonLink: "https://a.co/d/8bZOQID"  // Link to Amazon book page
  };

  return (
    <div className="flex flex-col items-center min-h-screen  bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 p-6 transition-all duration-1000">
        {/* Book Section*/}
        <section className='"bm-8'>
      <h1 className="text-3xl p-9 font-bold text-center mb-4">{book.title}</h1>
      
      {/* Book Cover Image */}
      <div className="flex justify-center p-6 mb-4">
        <img 
          src={book.coverImageUrl || '/path/to/placeholder.jpg'} // Fallback image in case the URL is broken} 
          alt={book.title} 
          className="w-48 h-72 object-cover rounded-lg"
        />
      </div>

      {/* Book Description */}
      <p className="text-lg text-gray-700 p-6 mb-6">{book.description}</p>

      {/* Buy on AmazonLink button */}
      <div className="flex justify-center p-6">
        <a 
          href={book.amazonLink} 
          target="_blank" // opens the link in a new tab
          rel="noopener noreferrer" // this ensures that the new tab is secure and doesn’t allow the new page to have access to the original page
          className="px-6 py-2 bg-yellow-950 text-white text-lg rounded-md hover:bg-yellow-600 transition-all duration-200"
        >
          Buy on Amazon
        </a>
      </div>
      </section>

       {/* About Page Preview Section (Below the Book Section) */}
       <section className="flex flex-col items-center max-w-4xl w-full bg-orange-300 p-6 rounded-lg shadow-lg mb-12">

       <img
             src={clientImage}
             alt="client provided image" 
             className=" w-76 h-72 p-2 object-cover shadow-lg rounded-full" // Tailwind classes for styling
             /> 

        <h2 className="text-2xl font-semibold mb-4">About Us (Preview)</h2>
        
        {/* Short preview of the AboutPage content */}
        <p className="text-lg text-gray-700 mb-4">
          We are a company that specializes in delivering top-notch services to our customers. Our team is dedicated to excellence, and we always strive to exceed expectations. {/* This is the preview text */}
        </p>
        
        {/* "Read More" button linking to the full AboutPage */}
        <Link 
          to="/about"  // The path to the full AboutPage
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Read More
        </Link>
      </section>

    </div>
  );
}

export default HomePage;
