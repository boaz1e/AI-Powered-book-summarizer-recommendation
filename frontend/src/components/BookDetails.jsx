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
    <div>
      <h2>{book.title}</h2>
      <img src={book.imageLinks?.thumbnail} alt={book.title} />
      <p>{book.description}</p>
      <p>Author: {book.authors?.join(", ")}</p>
      <p>Published Date: {book.publishedDate}</p>
      <p>Genre: {book.categories?.join(", ")}</p>
    </div>
  );
};

export default BookPage;
