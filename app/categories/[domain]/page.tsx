'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Library, BookOpen, User, Loader2 } from 'lucide-react';
import { WavyBackground } from '@/components/ui/wavy-background';
import Link from 'next/link';
import Image from 'next/image';

interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  availableCopies: number;
  totalCopies: number;
  coverImage: string | null;
}

export default function CategoryBooksPage() {
  const params = useParams();
  const domain = params.domain as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert URL slug to category name
  const categoryName = domain
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Fetch books for this category
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/books?category=${encodeURIComponent(categoryName)}`);
        const data = await response.json();
        if (data.success) {
          setBooks(data.books);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [categoryName]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAvailability = !showOnlyAvailable || book.availableCopies > 0;

      return matchesSearch && matchesAvailability;
    });
  }, [books, searchQuery, showOnlyAvailable]);

  return (
    <WavyBackground
      className="flex h-screen"
      containerClassName="h-screen overflow-hidden"
      colors={["#ea580c", "#fbbf24", "#f97316", "#fed7aa"]}
      backgroundFill="white"
      blur={10}
      speed="slow"
      waveWidth={50}
      waveOpacity={0.2}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar studentName="Piyush" studentId="23FE10CAI00225" />

        <main className="flex-1 overflow-auto bg-transparent">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                  <Library className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    {categoryName}
                  </h1>
                  <p className="text-gray-600 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Browse and search books in this category
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-lg p-6 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-100/40 to-transparent rounded-full blur-3xl -z-10" />

              <div className="flex flex-col md:flex-row gap-4 items-end relative z-10">
                <div className="flex-1">
                  <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                    Search by Title or Author
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-orange-500" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search books..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-orange-200 focus-visible:ring-orange-500 bg-white"
                    />
                  </div>
                </div>

                <Button
                  variant={showOnlyAvailable ? 'default' : 'outline'}
                  onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
                  className={`whitespace-nowrap ${showOnlyAvailable
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md'
                    : 'border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400'
                    } transition-all`}
                >
                  {showOnlyAvailable ? 'Available Only' : 'Show All'}
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
              </div>
            )}

            {/* Books Grid */}
            {!loading && filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.map((book) => {
                  const isAvailable = book.availableCopies > 0;
                  return (
                    <div
                      key={book.id}
                      className="bg-white/90 backdrop-blur-sm rounded-xl border border-orange-100 p-4 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100/30 to-transparent rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-500" />

                      {/* Cover Image */}
                      <div className="relative h-48 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg overflow-hidden mb-4">
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
                      <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 min-h-[3rem]">
                        {book.title}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <User className="w-4 h-4" />
                        <p className="text-sm line-clamp-1">{book.author}</p>
                      </div>

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
                        <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg">
                          View Details
                        </button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* Empty State */}
            {!loading && filteredBooks.length === 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-gray-700 text-lg font-semibold mb-2">No books found</p>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            {/* Results Count */}
            {!loading && filteredBooks.length > 0 && (
              <div className="mt-6 text-sm text-gray-600 text-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 inline-block mx-auto w-full">
                Showing <span className="font-semibold text-orange-600">{filteredBooks.length}</span> of <span className="font-semibold text-orange-600">{books.length}</span> books
              </div>
            )}
          </div>
        </main>
      </div>
    </WavyBackground>
  );
}
