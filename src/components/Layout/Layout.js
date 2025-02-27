import Header from './Header';
import Footer from './Footer';
import CategoryNav from '../News/CategoryNav';

export default function Layout({ children, showCategories = true }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            {showCategories && <CategoryNav />}
            <main className="container mx-auto px-4 py-6 flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}