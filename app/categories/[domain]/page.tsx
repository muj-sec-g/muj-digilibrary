'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { BookCard } from '@/components/book-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Library, BookOpen } from 'lucide-react';
import { Suspense } from 'react';
import Loading from './loading';
import { WavyBackground } from '@/components/ui/wavy-background';

// Mock data for different categories
const booksByDomain: Record<string, any[]> = {
  'computer-science': [
    {
      id: 'cs1',
      title: 'Data Structures and Algorithms',
      author: 'Thomas H. Cormen',
      domain: 'Computer Science',
      available: true,
    },
    {
      id: 'cs2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      domain: 'Computer Science',
      available: false,
    },
    {
      id: 'cs3',
      title: 'The Pragmatic Programmer',
      author: 'David Thomas, Andrew Hunt',
      domain: 'Computer Science',
      available: true,
    },
    {
      id: 'cs4',
      title: 'Design Patterns',
      author: 'Gang of Four',
      domain: 'Computer Science',
      available: true,
    },
    {
      id: 'cs5',
      title: 'Introduction to Algorithms',
      author: 'Leiserson, Stein',
      domain: 'Computer Science',
      available: false,
    },
  ],
  'electronics': [
    {
      id: 'el1',
      title: 'Digital Signal Processing',
      author: 'Alan V. Oppenheim',
      domain: 'Electronics',
      available: true,
    },
    {
      id: 'el2',
      title: 'Analog Electronics',
      author: 'Muhammad H. Rashid',
      domain: 'Electronics',
      available: true,
    },
    {
      id: 'el3',
      title: 'Microcontroller Fundamentals',
      author: 'Rick Farmer',
      domain: 'Electronics',
      available: false,
    },
  ],
  'mechanical': [
    {
      id: 'mech1',
      title: 'Mechanical Engineering Design',
      author: 'Shigley and Mischke',
      domain: 'Mechanical',
      available: true,
    },
    {
      id: 'mech2',
      title: 'Thermodynamics',
      author: 'Y.A. Çengel and M.A. Boles',
      domain: 'Mechanical',
      available: true,
    },
  ],
  'civil': [
    {
      id: 'civil1',
      title: 'Structural Analysis',
      author: 'R.C. Hibbler',
      domain: 'Civil',
      available: true,
    },
    {
      id: 'civil2',
      title: 'Concrete Technology',
      author: 'M.S. Shetty',
      domain: 'Civil',
      available: false,
    },
  ],
  'mathematics': [
    {
      id: 'math1',
      title: 'Engineering Mathematics',
      author: 'K.A. Stroud',
      domain: 'Mathematics',
      available: true,
    },
    {
      id: 'math2',
      title: 'Calculus: Early Transcendentals',
      author: 'James Stewart',
      domain: 'Mathematics',
      available: true,
    },
    {
      id: 'math3',
      title: 'Linear Algebra Done Right',
      author: 'Sheldon Axler',
      domain: 'Mathematics',
      available: true,
    },
  ],
  'general': [
    {
      id: 'gen1',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      domain: 'General',
      available: true,
    },
    {
      id: 'gen2',
      title: 'The Lean Startup',
      author: 'Eric Ries',
      domain: 'General',
      available: true,
    },
  ],
};

const domainNames: Record<string, string> = {
  'computer-science': 'Computer Science',
  'electronics': 'Electronics',
  'mechanical': 'Mechanical',
  'civil': 'Civil',
  'mathematics': 'Mathematics',
  'general': 'General',
};

export default function CategoryBooksPage() {
  const params = useParams();
  const domain = params.domain as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const books = booksByDomain[domain] || [];
  const domainName = domainNames[domain] || 'Books';

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAvailability = !showOnlyAvailable || book.available;

      return matchesSearch && matchesAvailability;
    });
  }, [books, searchQuery, showOnlyAvailable]);

  return (
    <Suspense fallback={<Loading />}>
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
          <Navbar studentName="Rajesh Kumar" studentId="CS2024001" />

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
                      {domainName}
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

              {/* Books Grid */}
              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBooks.map((book) => (
                    <BookCard key={book.id} {...book} />
                  ))}
                </div>
              ) : (
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
              {filteredBooks.length > 0 && (
                <div className="mt-6 text-sm text-gray-600 text-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 inline-block mx-auto w-full">
                  Showing <span className="font-semibold text-orange-600">{filteredBooks.length}</span> of <span className="font-semibold text-orange-600">{books.length}</span> books
                </div>
              )}
            </div>
          </main>
        </div>
      </WavyBackground>
    </Suspense>
  );
}
