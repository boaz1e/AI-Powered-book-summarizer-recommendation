// src/pages/HomePage.jsx
import { useState } from "react";
import BookSearch from "../components/BookSearch";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="container">
      <h1>Book Summarizer and Recommendation Engine</h1>
      <BookSearch onSearch={handleSearch} />
      <div>
        {searchResults.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.coverImage} alt={book.title} />
            <div className="book-details">
              <h3>{book.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
