// src/components/BookSearch.jsx
import { useState } from "react";
import axios from "axios";

const BookSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const searchBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const books = response.data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        coverImage: item.volumeInfo.imageLinks?.thumbnail,
      }));
      onSearch(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="search-section">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <button onClick={searchBooks}>Search</button>
    </div>
  );
};

export default BookSearch;
