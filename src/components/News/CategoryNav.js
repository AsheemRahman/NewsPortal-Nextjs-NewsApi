import Link from 'next/link';
import { useRouter } from 'next/router';
import { CATEGORIES } from '../../lib/api';

export default function CategoryNav() {
    const router = useRouter();
    const { category } = router.query;

    return (
        <nav className="mb-8 overflow-x-auto whitespace-nowrap py-3 bg-white border-b">
            <div className="container mx-auto px-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className={`py-2 px-4 rounded-md text-sm font-medium ${!category ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}   >
                            All
                        </Link>
                    </li>

                    {CATEGORIES.map((cat) => (
                        <li key={cat}>
                            <Link href={`/category/${cat}`} className={`py-2 px-4 rounded-md text-sm font-medium capitalize ${category === cat ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}  >
                                {cat}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}