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

        // Fetch AI-generated summary and similar books directly from OpenAI
        fetchSummaryAndSimilarBooks(bookData);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    const fetchSummaryAndSimilarBooks = async (bookInfo) => {
      const openaiApiKey = "your-openai-api-key";

      try {
        // Summary Request
        const summaryPrompt = `Provide a brief summary of the following book description: "${
          bookInfo.description || "No description available."
        }"`;

        const summaryResponse = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: summaryPrompt }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openaiApiKey}`,
            },
          }
        );

        const summaryText =
          summaryResponse.data.choices[0].message.content.trim();
        setSummary(summaryText);

        // Similar Books Request
        const similarBooksPrompt = `Suggest 5 books similar to the description: "${
          bookInfo.description || "No description available."
        }" and based on the categories: "${
          bookInfo.categories.join(", ") || "General"
        }"`;

        const similarBooksResponse = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: similarBooksPrompt }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openaiApiKey}`,
            },
          }
        );

        const similarBooksText =
          similarBooksResponse.data.choices[0].message.content.trim();
        const recommendedBooks = similarBooksText.split("\n").slice(0, 5);
        setSimilarBooks(recommendedBooks);
      } catch (error) {
        console.error("Error fetching summary and similar books:", error);
        setSummary("Unable to generate summary.");
        setSimilarBooks(["Unable to fetch similar books."]);
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
      <div
        className="book-description"
        dangerouslySetInnerHTML={{ __html: book.description }}
      />
      <p>
        <strong>Author:</strong> {book.authors?.join(", ")}
      </p>
      <p>
        <strong>Published Date:</strong> {book.publishedDate}
      </p>
      <p>
        <strong>Genre:</strong> {book.categories?.join(", ")}
      </p>

      <h3>AI-Generated Summary</h3>
      <p>{summary}</p>

      <h3>Similar Books</h3>
      <ul>
        {similarBooks.map((similarBook, index) => (
          <li key={index}>{similarBook}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookPage;
