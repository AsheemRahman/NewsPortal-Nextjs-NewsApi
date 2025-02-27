# NewsPortal Website

A modern news website built with Next.js that fetches and displays news articles from NewsAPI.org. The website allows users to browse news by category, search for specific articles, and view detailed news content. Unit tests are included to ensure component and API correctness.

## Features

- **Top Headlines**: Displays trending news articles.
- **Category-based News**: Browse news by different categories (e.g., Business, Technology, Sports, Entertainment, etc.).
- **Search News**: Search for articles using keywords.
- **News Details Page**: Clicking on an article opens a detailed view with full content.
- **Pagination**: Navigate through multiple pages of news results.
- **Loading & Error Handling**: Displays loading indicators and handles API errors gracefully.
- **Responsive UI**: Mobile-friendly design.


## Additional Features

- **Dark Mode**: Toggle between light and dark themes.
- **User Preferences**: Save last searched keyword/category using localStorage.

## Tech Stack

- **Framework**: Next.js
- **State Management**: React Hooks (useState, useEffect, useContext)
- **API Calls**: Axios
- **Styling**: TailwindCSS
- **Routing**: Next.js Pages & Dynamic Routing
- **Environment Variables**: `.env.local` for API keys
- **Testing**: Jest & React Testing Library

## Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/AsheemRahman/NewsPortal-Nextjs-NewsApi.git
   cd NewsPortal-Nextjs-NewsApi
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory and add your NewsAPI key:
   ```sh
   NEXT_PUBLIC_NEWS_API_KEY = "your_api_key_here"
   ```

4. **Run the Development Server**
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Project Structure

```
NewsPortal-Nextjs-NewsApi/
│── public/                   # Static assets
│── src/
│  │── components/            # Reusable UI components
│  │   ├── Layout/
│  │   │   ├── footer.js
│  │   │   ├── header.js
│  │   │   ├── Layout.js
│  │   ├── News/
│  │   ├── ArticleCard.js
│  │   │   ├── ArticleList.js
│  │   │   ├── CategoryNav.js
│  │   │   ├── CategoryNav.js
│  │   │   ├── Pagination.js
│  │   │   ├── SearchBar.js
│  │   ├── UI/
│  │   │   ├── ErrorMessage.js
│  │   │   ├── LoadingSpinner.js
│  │── hooks/                 # Reusable UI components
│  │   │   ├── useLocalStorage.js
│  │   │   ├── useNews.js
│  │── lib/                   # Helper functions (API calls, etc.)
│  │   │   ├── Api.js
│  │── styles/                # Global and component-specific styles
│  │   ├── global.css         # Global and component-specific styles
│  │── pages/                 # Next.js pages
│  │   ├── category/          # Category-based news pages
│  │   │   ├── [category].js
│  │   ├── Api/               # Api news pages
│  │   │   ├── news.js
│  │   ├── article/           # Sigle article page
│  │   │   ├── [artile].js
│  │   ├── _app.js            # App file
│  │   ├── _document.js
│  │   ├── index.js           # Homepage (Top Headlines)
│  │   ├── search.js          # Search results page
│  │── tests/                 # Unit tests
│  │   ├── components/
│  │   │   ├── ArticleList.test.js
│  │   │   ├── SearchBar.test.js
│  │   ├── hooks/
│  │   │   ├── useNews.test.js
│── .env.local                # Environment variables
│── jest.confiq.js            # Congiq jest
│── jest.setup.js             # setup jest
│── next.config.js            # Next.js configuration
│── package.json              # Project dependencies and scripts
```

## API Integration

### Fetching News Articles
- **Top Headlines**: `/v2/top-headlines?country=us&apiKey={API_KEY}`
- **Category Filter**: `/v2/top-headlines?category={category}&apiKey={API_KEY}`
- **Search News**: `/v2/everything?q={query}&apiKey={API_KEY}`

## Testing

Unit tests are written using Jest and React Testing Library.

- **Run Tests**:
  ```sh
  npm test
  ```


## Author

Developed by [Asheem Rahman](https://github.com/AsheemRahman).

