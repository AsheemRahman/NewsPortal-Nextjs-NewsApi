export default async function handler(req, res) {
    const { endpoint = 'top-headlines', country = 'us', category, q, page = 1, pageSize = 10} = req.query;

    const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const BASE_URL = 'https://newsapi.org/v2';

    if (!API_KEY) {
        return res.status(500).json({ error: 'News API key is not configured' });
    }

    try {
        let url = `${BASE_URL}/${endpoint}`;
        const params = new URLSearchParams();

        if (endpoint === 'top-headlines') {
            params.append('country', country);

            if (category) {
                params.append('category', category);
            }
        } else if (endpoint === 'everything') {
            if (q) {
                params.append('q', q);
            } else {
                return res.status(400).json({ error: 'Search query is required for "everything" endpoint' });
            }
        }

        params.append('page', page);
        params.append('pageSize', pageSize);
        params.append('apiKey', API_KEY);

        const response = await fetch(`${url}?${params.toString()}`);
        const data = await response.json();

        if (data.status === 'error') {
            throw new Error(data.message || 'Failed to fetch news');
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('News API error:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch news' });
    }
}