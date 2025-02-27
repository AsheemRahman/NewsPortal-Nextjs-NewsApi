import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';


export const fetchTopHeadlines = async ({ country = 'us', category = '', page = 1, pageSize = 10 }) => {
    try {
        const params = { country, apiKey: API_KEY, page, pageSize };

        if (category) {
            params.category = category;
        }

        const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching top headlines:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch news');
    }
};

export const searchNews = async ({ query, sortBy = 'publishedAt', page = 1, pageSize = 10 }) => {
    try {
        const params = { q: query, apiKey: API_KEY, sortBy, page, pageSize };

        const response = await axios.get(`${BASE_URL}/everything`, { params });
        return response.data;
    } catch (error) {
        console.error('Error searching news:', error);
        throw new Error(error.response?.data?.message || 'Failed to search news');
    }
};


export const getArticleDetails = async (title, url) => {
    try {
        const params = { q: title, apiKey: API_KEY, pageSize: 50 };
        const response = await axios.get(`${BASE_URL}/everything`, { params });
        const article = response.data.articles.find(article => article.url === url || article.title === title);
        if (!article) {
            throw new Error('Article not found');
        }

        return article;
    } catch (error) {
        console.error('Error fetching article details:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch article details');
    }
};

export const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];