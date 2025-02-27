import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import ArticleList from '../components/News/ArticleList';
import Pagination from '../components/News/Pagination';
import { useNews } from '../hooks/useNews';

export default function SearchPage() {
    const router = useRouter();
    const { q: query, page = 1 } = router.query;
    const currentPage = parseInt(page) || 1;
    const pageSize = 12;

    const { articles, loading, error, totalResults } = useNews({ type: 'search', query, page: currentPage, pageSize });

    const totalPages = Math.ceil(totalResults / pageSize);

    return (
        <Layout showCategories={false}>
            <Head>
                <title>Search Results: {query} | NewsPortal</title>
                <meta name="description" content={`Search results for "${query}" - News articles and updates.`} />
            </Head>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Search Results: <span className="text-blue-600 dark:text-blue-400">{query}</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Found {totalResults} articles matching your search.
                </p>
            </div>

            <ArticleList articles={articles} loading={loading} error={error} />

            {!loading && !error && totalResults > pageSize && (
                <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/search" />
            )}
        </Layout>
    );
}
