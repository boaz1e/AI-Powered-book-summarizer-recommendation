# AI-Powered Book Summarizer and Recommendation Engine

This project is an AI-powered application that provides concise book summaries and suggests similar books based on user preferences. The app leverages the OpenAI API to generate summaries and recommendations, enhancing the book discovery experience for users.

## Features

- **Book Search and Information:**
  - Search for books by title, author, or ISBN using the Google Books API.
  - Display detailed book information, including cover image, author, publication date, and genre.

- **AI-Powered Summarization:**
  - Generate concise summaries of books based on their descriptions.
  - Highlight key insights and themes from each book.

- **Personalized Recommendations:**
  - Suggest related books based on the current book's description and categories.
  - Provide a list of similar books for users to explore.

## Technologies Used

- **Frontend:**
  - React for building a dynamic and responsive user interface.
  - Axios for making HTTP requests to APIs.

- **APIs:**
  - Google Books API for retrieving book information.
  - OpenAI API for generating summaries and recommendations.

- **Deployment:**
  - The application can be deployed using platforms like Vercel or Netlify for the frontend.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your local development machine.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/boaz1e/AI-Powered-book-summarizer-recommendation.git
   cd frontend

## Install Dependencies:
npm install

## Set Up Environment Variables:
Create a .env file in the project root and add your API keys:
REACT_APP_OPENAI_API_KEY=your-openai-api-key
REACT_APP_GOOGLE_BOOKS_API_KEY=your-google-books-api-key

## Run the Application:
npm run dev

