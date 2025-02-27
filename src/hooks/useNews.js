import { useState, useEffect } from 'react';
import { fetchTopHeadlines, searchNews } from '../lib/api';

export const useNews = ({ type = 'top-headlines', category = '', query = '', page = 1, pageSize = 10 }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;

                if (type === 'search' && query) {
                    data = await searchNews({ query, page, pageSize });
                } else {
                    data = await fetchTopHeadlines({ category, page, pageSize });
                }
                setArticles(data.articles);
                setTotalResults(data.totalResults || 0);
            } catch (err) {
                setError(err.message || 'Failed to fetch news');
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [type, category, query, page, pageSize]);

    return { articles, loading, error, totalResults };
};
