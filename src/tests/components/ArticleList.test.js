import { render, screen } from '@testing-library/react';
import ArticleList from '../../components/News/ArticleList';

// Mock data
const mockArticles = [
    {
        source: { id: 'cnn', name: 'CNN' },
        author: 'John Doe',
        title: 'Test Article 1',
        description: 'This is a test article description',
        url: 'https://example.com/article1',
        urlToImage: 'https://example.com/image1.jpg',
        publishedAt: '2025-02-25T12:00:00Z',
        content: 'Test content 1'
    },
    {
        source: { id: 'bbc', name: 'BBC' },
        author: 'Jane Smith',
        title: 'Test Article 2',
        description: 'This is another test article description',
        url: 'https://example.com/article2',
        urlToImage: 'https://example.com/image2.jpg',
        publishedAt: '2025-02-25T14:00:00Z',
        content: 'Test content 2'
    }
];


jest.mock('next/router', () => ({
    useRouter: () => ({
        query: {},
        push: jest.fn()
    })
}));

describe('ArticleList Component', () => {
    test('displays loading spinner when loading', () => {
        render(<ArticleList loading={true} articles={[]} error={null} />);
        expect(screen.getByText(/loading news/i)).toBeInTheDocument();
    });

    test('displays error message when error occurs', () => {
        render(<ArticleList loading={false} articles={[]} error="API Error" />);
        expect(screen.getByText(/error loading news/i)).toBeInTheDocument();
        expect(screen.getByText(/api error/i)).toBeInTheDocument();
    });

    test('displays no articles found message when array is empty', () => {
        render(<ArticleList loading={false} articles={[]} error={null} />);
        expect(screen.getByText(/no articles found/i)).toBeInTheDocument();
    });

    test('renders the correct number of article cards', () => {
        render(<ArticleList loading={false} articles={mockArticles} error={null} />);
        expect(screen.getAllByText(/read more/i)).toHaveLength(2);
        expect(screen.getByText('Test Article 1')).toBeInTheDocument();
        expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    });
});