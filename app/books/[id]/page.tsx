'use client';

import { useParams } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/status-badge';
import { BookOpen, MapPin, Code, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock book data
const bookData: Record<string, any> = {
  cs1: {
    id: 'cs1',
    title: 'Data Structures and Algorithms',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest',
    isbn: '978-0-262-03384-8',
    domain: 'Computer Science',
    available: true,
    pages: 1312,
    publisher: 'MIT Press',
    year: 2009,
    description:
      'This comprehensive textbook covers the fundamental algorithms used in computer science. It includes detailed explanations and analysis of algorithms for searching, sorting, graphs, dynamic programming, and NP-completeness.',
    location: {
      block: 'A',
      floor: '2nd',
      shelf: '5B',
      row: '12',
    },
    ebook: true,
  },
  cs2: {
    id: 'cs2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0-13-235088-4',
    domain: 'Computer Science',
    available: false,
    pages: 464,
    publisher: 'Prentice Hall',
    year: 2008,
    description:
      'A handbook of agile software craftsmanship. Learn how to write code that is readable, maintainable, and professional. The book provides practical advice and examples for improving your code quality.',
    location: {
      block: 'B',
      floor: '3rd',
      shelf: '2A',
      row: '8',
    },
    ebook: true,
  },
  el1: {
    id: 'el1',
    title: 'Digital Signal Processing',
    author: 'Alan V. Oppenheim, Ronald W. Schafer',
    isbn: '978-0-13-198842-2',
    domain: 'Electronics',
    available: true,
    pages: 1102,
    publisher: 'Prentice Hall',
    year: 2009,
    description:
      'A comprehensive introduction to digital signal processing covering both the fundamentals and advanced techniques. Includes discrete-time signals, systems, filtering, and FFT algorithms.',
    location: {
      block: 'C',
      floor: '2nd',
      shelf: '3C',
      row: '15',
    },
    ebook: false,
  },
};

export default function BookDetailsPage() {
  const params = useParams();
  const bookId = params.id as string;
  const book = bookData[bookId];

  if (!book) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">Book Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The book you are looking for does not exist.
              </p>
              <Link href="/categories">
                <Button>Back to Categories</Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar studentName="Rajesh Kumar" studentId="CS2024001" />

        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Back Button */}
            <Link href="/categories">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Book Info Card */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  {/* Book Header */}
                  <div className="flex gap-8 mb-8">
                    <div className="w-40 h-56 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-16 h-16 text-muted-foreground" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h1 className="text-3xl font-bold text-foreground mb-2">
                            {book.title}
                          </h1>
                          <p className="text-lg text-muted-foreground mb-4">{book.author}</p>
                        </div>
                        <StatusBadge
                          status={book.available ? 'available' : 'issued'}
                          label={book.available ? 'Available' : 'Issued'}
                        />
                      </div>

                      <div className="space-y-2 text-sm mb-6">
                        <p>
                          <span className="text-muted-foreground">ISBN:</span>
                          <span className="ml-2 font-medium text-foreground">
                            {book.isbn}
                          </span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Publisher:</span>
                          <span className="ml-2 font-medium text-foreground">
                            {book.publisher}
                          </span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Year:</span>
                          <span className="ml-2 font-medium text-foreground">
                            {book.year}
                          </span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Pages:</span>
                          <span className="ml-2 font-medium text-foreground">
                            {book.pages}
                          </span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Domain:</span>
                          <span className="ml-2 font-medium text-foreground">
                            {book.domain}
                          </span>
                        </p>
                      </div>

                      {/* Action Button */}
                      <Button className="w-full" disabled={!book.available}>
                        {book.available ? 'Issue Book' : 'Not Available'}
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="border-t border-border pt-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                      Description
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Physical Location */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Physical Location
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Block</p>
                      <p className="text-lg font-semibold text-foreground">
                        {book.location.block}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Floor</p>
                      <p className="text-lg font-semibold text-foreground">
                        {book.location.floor}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Shelf</p>
                      <p className="text-lg font-semibold text-foreground">
                        {book.location.shelf}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Row</p>
                      <p className="text-lg font-semibold text-foreground">
                        {book.location.row}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* E-Book Section */}
                {book.ebook && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      E-Book Available
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4">
                      Access the digital version of this book
                    </p>

                    <Button className="w-full bg-transparent" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Online
                    </Button>
                  </Card>
                )}

                {/* Related Info */}
                <Card className="p-6 bg-blue-50 border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-900 mb-3">
                    Lending Period
                  </h3>
                  <p className="text-sm text-blue-800">
                    This book can be borrowed for <strong>14 days</strong>. Late fees apply at ₹5 per day after the due date.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
