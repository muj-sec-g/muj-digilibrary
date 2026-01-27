import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, User } from 'lucide-react';

interface BookCardProps {
    book: {
        id: string;
        title: string;
        author: string;
        coverImage: string | null;
        availableCopies: number;
        totalCopies: number;
        category: string;
    };
}

export function BookCard({ book }: BookCardProps) {
    const isAvailable = book.availableCopies > 0;

    return (
        <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Cover Image */}
            <div className="relative h-56 bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
                {book.coverImage ? (
                    <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-orange-300" />
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                    {isAvailable ? (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                            Available
                        </span>
                    ) : (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>

            {/* Book Info */}
            <div className="p-4">
                {/* Title */}
                <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 min-h-[3rem]">
                    {book.title}
                </h3>

                {/* Author */}
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <User className="w-4 h-4" />
                    <p className="text-sm line-clamp-1">{book.author}</p>
                </div>

                {/* Category & Copies */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded font-medium">
                        {book.category}
                    </span>
                    <span>
                        {book.availableCopies}/{book.totalCopies} copies
                    </span>
                </div>

                {/* View Details Button */}
                <Link href={`/books/${book.id}`}>
                    <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
}
