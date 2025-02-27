import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import ArticleList from '../components/News/ArticleList';
import Pagination from '../components/News/Pagination';
import { useNews } from '../hooks/useNews';

export default function HomePage() {
    const router = useRouter();
    const { page = 1 } = router.query;
    const currentPage = parseInt(page) || 1;
    const pageSize = 12;

    const { articles, loading, error, totalResults } = useNews({ type: 'top-headlines', page: currentPage, pageSize});

    const totalPages = Math.ceil(totalResults / pageSize);

    return (
        <Layout>
            <Head>
                <title>NewsPortal - Latest Headlines</title>
                <meta name="description" content="Stay updated with the latest news from around the world."/>
            </Head>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Latest Headlines
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Stay updated with the most recent news from around the world.
                </p>
            </div>

            <ArticleList articles={articles} loading={loading} error={error}/>

            {!loading && !error && totalResults > pageSize && (
                <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/"/>
            )}
        </Layout>
    );
}