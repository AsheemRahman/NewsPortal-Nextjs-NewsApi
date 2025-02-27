import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchBar from '../News/SearchBar';

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('darkMode');
            setDarkMode(savedMode === 'true');

            if (savedMode === 'true') {
                document.documentElement.classList.add('dark');
            }
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (typeof window !== 'undefined') {
            if (!darkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
            }
        }
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center justify-between mb-4 md:mb-0">
                        <Link href="/" className="flex items-center" >
                            <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                />
                            </svg>
                            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                                NewsPortal
                            </span>
                        </Link>

                        <button onClick={toggleDarkMode}
                            className="p-2 ml-9 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" aria-label="Toggle dark mode">
                            {darkMode ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="w-full md:w-1/2">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </header>
    );
}