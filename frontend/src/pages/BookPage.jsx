// src/pages/BookPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data.volumeInfo);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <img src={book.imageLinks?.thumbnail} alt={book.title} />
      <p>{book.description}</p>
      <p>
        <strong>Author:</strong> {book.authors?.join(", ")}
      </p>
      <p>
        <strong>Published Date:</strong> {book.publishedDate}
      </p>
      <p>
        <strong>Genre:</strong> {book.categories?.join(", ")}
      </p>
    </div>
  );
};

export default BookPage;
