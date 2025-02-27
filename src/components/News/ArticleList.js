import ArticleCard from './ArticleCard';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

export default function ArticleList({ articles, loading, error }) {
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!articles || articles.length === 0) {
        return (
            <div className="text-center py-10">
                <h3 className="text-xl font-medium text-gray-500">No articles found</h3>
                <p className="mt-2 text-gray-400">Try a different search or category</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
                <ArticleCard key={`${article.url}-${index}`} article={article} />
            ))}
        </div>
    );
}