import Image from 'next/image';
import Link from 'next/link';

export default function ArticleCard({ article }) {
    const slug = encodeURIComponent(`${article.title}|${article.url}`);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg">
            <div className="relative h-48 w-full">
                {article.urlToImage ? (
                    <Image src={article.urlToImage} alt={article.title} fill={true} unoptimized className="object-cover transition-opacity opacity-90 hover:opacity-100" />
                ) : (
                    <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <span className="text-xs text-gray-500">
                    {article.source?.name} · {new Date(article.publishedAt).toLocaleDateString()}
                </span>

                <h3 className="mt-1 text-lg font-semibold line-clamp-2">
                    <Link href={`/article/${slug}`} className="text-gray-900 hover:text-blue-600" >
                        {article.title}
                    </Link>
                </h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {article.description || 'No description available'}
                </p>

                <div className="mt-4 flex justify-between items-center">
                    <Link href={`/article/${slug}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium" >
                        Read more →
                    </Link>

                    {article.author && (
                        <span className="text-xs text-gray-500 italic">
                            By {article.author}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}