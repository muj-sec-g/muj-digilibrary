import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, MapPin, Package } from 'lucide-react';
import prisma from '@/lib/prisma';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = params;

  // Fetch book details
  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    notFound();
  }

  const isAvailable = book.availableCopies > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/books" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Books
          </Link>
        </div>
      </div>

      {/* Book Details */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left: Cover Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[3/4] bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg overflow-hidden shadow-md">
                {book.coverImage ? (
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-32 h-32 text-orange-300" />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Book Information */}
            <div className="flex flex-col">
              {/* Status Badge */}
              <div className="mb-4">
                {isAvailable ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 font-semibold rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>

              {/* Author */}
              <p className="text-xl text-gray-600 mb-6">
                by {book.author}
              </p>

              {/* Details Grid */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">ISBN</div>
                    <div className="font-semibold text-gray-900">{book.isbn}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="font-semibold text-gray-900">{book.category}</div>
                  </div>
                </div>

                {book.publisher && (
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Publisher</div>
                      <div className="font-semibold text-gray-900">{book.publisher}</div>
                    </div>
                  </div>
                )}

                {book.publishedYear && (
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Published Year</div>
                      <div className="font-semibold text-gray-900">{book.publishedYear}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-semibold text-gray-900">{book.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Availability</div>
                    <div className="font-semibold text-gray-900">
                      {book.availableCopies} of {book.totalCopies} copies available
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {book.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              )}

              {/* Borrow Button */}
              <button
                disabled={!isAvailable}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${isAvailable
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isAvailable ? 'Borrow This Book' : 'Currently Unavailable'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
