import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import clientImage from '../assets/MikeN.png'; 
import NewsletterForm from '../components/Newsletter';
import "../pages/Home";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const book = {
    title: "God, Country, Family: Three Short Stories",
    description: "Three Stories pulling you in with questions of belief, War, Tears and Laughter...",
    coverImageUrl: "https://m.media-amazon.com/images/I/714MiqrkPhL._SL1500_.jpg",
    amazonLink: "https://a.co/d/8bZOQID"
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3000/blog/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const blogsData = await response.json();
      const sortedBlogs = blogsData.sort((a, b) => new Date(b.created) - new Date(a.created));
      setBlogs(sortedBlogs.slice(0, 2));
    } catch (error) {
      setError('Failed to fetch blogs');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 p-6 transition-all duration-1000">

      {/* Book Section */}
      <section className="w-full max-w-4xl bg-white p-8 mb-12 rounded-lg shadow-lg transition-all duration-300 ease-in-out book-card">
        <h1 className="text-4xl font-serif font-bold text-center mb-6">{book.title}</h1>

        <div className="flex justify-center mb-6">
          <img
            src={book.coverImageUrl || '/path/to/placeholder.jpg'}
            alt={book.title}
            className="w-48 h-72 object-cover rounded-lg shadow-lg"
          />
        </div>

        <p className="text-lg text-gray-700 mb-6">{book.description}</p>

        <div className="flex justify-center">
          <a
            href={book.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-yellow-950 text-white text-lg font-semibold rounded-md hover:bg-yellow-700 transition-all duration-300 shadow-lg"
          >
            Buy on Amazon
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full max-w-4xl bg-orange-300 p-8 rounded-lg shadow-lg mb-12 transition-all duration-300 ease-in-out about-card">
        <div className="flex flex-col items-center">
          <img
            src={clientImage}
            alt="client provided image"
            className="w-full h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-white shadow-lg mb-4"
          />
          <h2 className="text-2xl font-serif font-semibold mb-4">About Mike Ninnes </h2>
          <p className="text-lg font-serif text-gray-700 mb-6">
          Mike, a retired Air Force vet, storyteller, and writer, has been published by Maryville University and founded the Washington Wordsmiths. Discover his journey—click to learn more!
          </p>
          <Link to="/about" className="text-teal-600 hover:text-blue-800 font-semibold transition-all duration-200">
            Read More
          </Link>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="w-full max-w-4xl px-8 py-12">
        <h3 className="text-3xl font-serif font-semibold text-center mb-8">Latest Blog Posts</h3>
        <div className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
              <h4 className="text-2xl font-serif font-semibold text-center mb-4">{blog.title}</h4>
              <p className="text-gray-500 text-sm text-center mb-4">
                By {blog.author} | {new Date(blog.created).toLocaleDateString()}
              </p>
              <p className="text-lg text-gray-800">{blog.content.slice(0, 150)}...</p>
              <Link
                to="/blogPage"
                className="text-teal-500 hover:text--800 mt-4 block text-center font-semibold transition-all duration-200"
              >
                See  More
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div>
        <NewsletterForm/>
      </div>

    </div>
  );
}

export default HomePage;
