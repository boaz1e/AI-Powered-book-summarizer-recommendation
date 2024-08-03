// src/pages/BookPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [summary, setSummary] = useState("");
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const bookData = response.data.volumeInfo;
        setBook(bookData);

        // Fetch AI-generated summary and similar books
        const aiResponse = await axios.post(
          "http://localhost:5000/api/openai/summarize",
          {
            title: bookData.title,
            description: bookData.description || "",
          }
        );

        setSummary(aiResponse.data.summary);
        setSimilarBooks(aiResponse.data.similarBooks);
      } catch (error) {
        console.error("Error fetching book details or summary:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      {book.imageLinks?.thumbnail && (
        <img src={book.imageLinks.thumbnail} alt={book.title} />
      )}
      <p>{book.description}</p>
      <p>Author: {book.authors?.join(", ")}</p>
      <p>Published Date: {book.publishedDate}</p>
      <p>Genre: {book.categories?.join(", ")}</p>

      <h3>AI-Generated Summary</h3>
      <p>{summary}</p>

      <h3>Similar Books</h3>
      <ul>
        {similarBooks.map((book, index) => (
          <li key={index}>{book}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookPage;
