import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import { getArticleDetails } from '../../lib/api';

export default function ArticlePage() {
    const router = useRouter();
    const { id } = router.query;

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);

                const [title, url] = decodeURIComponent(id).split('|');
                if (!title || !url) {
                    throw new Error('Invalid article identifier');
                }
                const articleData = await getArticleDetails(title, url);
                setArticle(articleData);
            } catch (err) {
                setError(err.message || 'Failed to fetch article');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <Layout showCategories={false}>
                <LoadingSpinner />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout showCategories={false}>
                <ErrorMessage message={error} />
                <div className="mt-6 text-center">
                    <button onClick={() => router.back()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Go Back
                    </button>
                </div>
            </Layout>
        );
    }

    if (!article) {
        return (
            <Layout showCategories={false}>
                <div className="text-center py-20">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                        Article Not Found
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The article you're looking for doesn't exist or is no longer available.
                    </p>
                    <button onClick={() => router.push('/')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" >
                        Back to Home
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout showCategories={false}>
            <Head>
                <title>{article.title} | NewsPortal</title>
                <meta name="description" content={article.description || 'Read the full article on NewsPortal'} />
            </Head>

            <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                {article.urlToImage && (
                    <div className="relative h-64 md:h-96 w-full">
                        <Image src={article.urlToImage} alt={article.title} layout="fill" objectFit="cover" priority />
                    </div>
                )}

                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {article.source?.name}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <time className="text-gray-500 dark:text-gray-400" dateTime={article.publishedAt}>
                            {new Date(article.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {article.title}
                    </h1>

                    {article.author && (
                        <p className="text-gray-600 dark:text-gray-400 italic mb-6">
                            By {article.author}
                        </p>
                    )}

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            {article.description}
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {article.content?.replace(/\[\+\d+ chars\]$/, '') || 'To read the full article, please visit the original source.'}
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Read Full Article
                            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        </Layout>
    );
}