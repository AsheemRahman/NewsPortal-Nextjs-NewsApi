import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import ArticleList from '../../components/News/ArticleList';
import Pagination from '../../components/News/Pagination';
import { useNews } from '../../hooks/useNews';
import { CATEGORIES } from '../../lib/api';

export default function CategoryPage() {
    const router = useRouter();
    const { category, page = 1 } = router.query;
    const currentPage = parseInt(page) || 1;
    const pageSize = 12;

    const { articles, loading, error, totalResults } = useNews({ type: 'top-headlines', category, page: currentPage, pageSize });

    const totalPages = Math.ceil(totalResults / pageSize);
    const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

    if (category && !CATEGORIES.includes(category)) {
        return (
            <Layout>
                <Head>
                    <title>Category Not Found | NewsPortal</title>
                </Head>
                <div className="text-center py-20">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                        Category Not Found
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The category "{category}" does not exist or is not available.
                    </p>
                    <button onClick={() => router.push('/')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Back to Home
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head>
                <title>{categoryName} News | NewsPortal</title>
                <meta
                    name="description"
                    content={`Latest ${categoryName} news and updates.`}
                />
            </Head>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {categoryName} News
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    The latest updates and stories in {categoryName.toLowerCase()}.
                </p>
            </div>

            <ArticleList articles={articles} loading={loading} error={error} />

            {!loading && !error && totalResults > pageSize && (
                <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/category/${category}`} />
            )}
        </Layout>
    );
}