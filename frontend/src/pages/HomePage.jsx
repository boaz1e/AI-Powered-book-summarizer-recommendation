// src/pages/HomePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookSearch from "../components/BookSearch";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="container">
      <h1>Book Summarizer and Recommendation Engine</h1>
      <BookSearch onSearch={handleSearch} />
      <div>
        {searchResults.map((book) => (
          <div
            key={book.id}
            className="book-item"
            onClick={() => handleBookClick(book.id)}
          >
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
