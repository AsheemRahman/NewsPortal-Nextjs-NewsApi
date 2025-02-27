import { render, screen, waitFor } from '@testing-library/react';
import { useNews } from '../../hooks/useNews';
import { fetchTopHeadlines, searchNews } from '../../lib/api';
import { useEffect } from 'react';


jest.mock('../../lib/api', () => ({
    fetchTopHeadlines: jest.fn(),
    searchNews: jest.fn(),
    CATEGORIES: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
}));

const TestComponent = ({ params }) => {
    const { loading, articles, error } = useNews(params);

    useEffect(() => {
    }, [articles]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
};

describe('useNews Hook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetches top headlines by default', async () => {
        const mockData = {
            status: 'ok',
            totalResults: 2,
            articles: [
                { title: 'Article 1', url: 'https://example.com/1' },
                { title: 'Article 2', url: 'https://example.com/2' }
            ]
        };

        fetchTopHeadlines.mockResolvedValueOnce(mockData);
        render(<TestComponent params={{}} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        await waitFor(() => expect(fetchTopHeadlines).toHaveBeenCalled());

        expect(screen.getByText('Article 1')).toBeInTheDocument();
        expect(screen.getByText('Article 2')).toBeInTheDocument();
    });

    test('fetches news by category', async () => {
        const mockData = {
            status: 'ok',
            totalResults: 1,
            articles: [{ title: 'Tech News', url: 'https://example.com/tech' }]
        };

        fetchTopHeadlines.mockResolvedValueOnce(mockData);
        render(<TestComponent params={{ category: 'technology' }} />);
        await waitFor(() => expect(fetchTopHeadlines).toHaveBeenCalled());

        expect(screen.getByText('Tech News')).toBeInTheDocument();
    });

    test('searches for news with query', async () => {
        const mockData = {
            status: 'ok',
            totalResults: 3,
            articles: [
                { title: 'Search Result 1', url: 'https://example.com/search1' },
                { title: 'Search Result 2', url: 'https://example.com/search2' },
                { title: 'Search Result 3', url: 'https://example.com/search3' }
            ]
        };

        searchNews.mockResolvedValueOnce(mockData);
        render(<TestComponent params={{ type: 'search', query: 'breaking news' }} />);
        await waitFor(() => expect(searchNews).toHaveBeenCalled());

        expect(screen.getByText('Search Result 1')).toBeInTheDocument();
        expect(screen.getByText('Search Result 2')).toBeInTheDocument();
        expect(screen.getByText('Search Result 3')).toBeInTheDocument();
    });

    test('handles API errors', async () => {
        const errorMessage = 'API rate limit exceeded';
        fetchTopHeadlines.mockRejectedValueOnce(new Error(errorMessage));

        render(<TestComponent params={{}} />);

        await waitFor(() => expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument());
    });
});
