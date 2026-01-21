'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { BookCard } from '@/components/book-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Suspense } from 'react';
import Loading from './loading';

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
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar studentName="Rajesh Kumar" studentId="CS2024001" />

          <main className="flex-1 overflow-auto">
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">{domainName}</h1>
                <p className="text-muted-foreground">
                  Browse and search books in this category
                </p>
              </div>

              {/* Search and Filter */}
              <div className="bg-card rounded-lg border border-border p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1">
                    <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
                      Search by Title or Author
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="search"
                        type="text"
                        placeholder="Search books..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button
                    variant={showOnlyAvailable ? 'default' : 'outline'}
                    onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
                    className="whitespace-nowrap"
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
                <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <p className="text-muted-foreground text-lg mb-2">No books found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}

              {/* Results Count */}
              {filteredBooks.length > 0 && (
                <div className="mt-6 text-sm text-muted-foreground text-center">
                  Showing {filteredBooks.length} of {books.length} books
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </Suspense>
  );
}
