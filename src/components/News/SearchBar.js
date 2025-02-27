import { useState } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function SearchBar() {
    const router = useRouter();
    const [lastSearch, setLastSearch] = useLocalStorage('lastSearch', '');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            return;
        }
        setLastSearch(searchTerm);

        router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto mb-8">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lastSearch ? `Search news (last: ${lastSearch})` : 'Search news...'}
                className="flex-grow px-4 py-2 text-black border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Search news" />
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Search
            </button>
        </form>
    );
}