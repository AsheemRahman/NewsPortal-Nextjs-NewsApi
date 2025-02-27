import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Pagination({
    currentPage,
    totalPages,
    baseUrl
}) {
    const router = useRouter();

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const buildPageUrl = (page) => {
        const query = { ...router.query, page };
        return `${baseUrl}?${new URLSearchParams(query).toString()}`;
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-8">
            {currentPage > 1 && (
                <Link href={buildPageUrl(currentPage - 1)} className="px-3 py-2 border text-black rounded text-sm bg-white hover:bg-gray-100"  >
                    Previous
                </Link>
            )}

            {getPageNumbers().map((page, index) => (
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2">...</span>
                ) : (
                    <Link key={`page-${page}`} href={buildPageUrl(page)} className={`px-3 py-2  rounded text-black text-sm ${currentPage === page ? 'bg-blue-600  border-blue-600' : 'bg-white hover:bg-gray-100'}`}  >
                        {page}
                    </Link>
                )
            ))}

            {currentPage < totalPages && (
                <Link href={buildPageUrl(currentPage + 1)} className="px-3 py-2 text-white  rounded text-sm bg-red-700 hover:bg-red-500" >
                    Next
                </Link>
            )}
        </div>
    );
}