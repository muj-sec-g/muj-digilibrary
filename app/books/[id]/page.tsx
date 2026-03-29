import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, MapPin, Package } from 'lucide-react';
import prisma from '@/lib/prisma';
import { BeamsBackground } from '@/components/ui/beams-background';
import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/status-badge';
import { Library3DMap } from '@/components/books/library-3d-map';

interface BookDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;

  // Fetch book details
  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    notFound();
  }

  const isAvailable = book.availableCopies > 0;

  return (
    <BeamsBackground
      className="flex flex-col h-screen"
      intensity="medium"
    >
      <Navbar studentName="Piyush" studentId="23FE10CAI00225" />

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <Link href="/books">
            <Button variant="ghost" size="sm" className="mb-6 hover:bg-white/50 bg-white/30 backdrop-blur-sm border border-orange-100 shadow-sm text-gray-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Books
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Info Card */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-white/90 backdrop-blur-md border-orange-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100/40 to-transparent rounded-full blur-3xl -z-10" />
                {/* Book Header */}
                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                  <div className="w-40 h-56 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-sm">
                    {book.coverImage ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <BookOpen className="w-16 h-16 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                          {book.title}
                        </h1>
                        <p className="text-lg text-gray-600 mb-4">
                          by {book.author}
                        </p>
                      </div>
                      <StatusBadge
                        status={isAvailable ? 'available' : 'issued'}
                        label={isAvailable ? 'Available' : 'Issued'}
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
                        <span className="text-muted-foreground">Category:</span>
                        <span className="ml-2 font-medium text-foreground">
                          {book.category}
                        </span>
                      </p>
                      {book.publisher && (
                        <p>
                          <span className="text-muted-foreground">Publisher:</span>
                          <span className="ml-2 font-medium text-foreground">
                            {book.publisher}
                          </span>
                        </p>
                      )}
                      {book.publishedYear && (
                        <p>
                          <span className="text-muted-foreground">Year:</span>
                          <span className="ml-2 font-medium text-foreground">
                            {book.publishedYear}
                          </span>
                        </p>
                      )}
                      <p>
                        <span className="text-muted-foreground">Availability:</span>
                        <span className="ml-2 font-medium text-foreground">
                          {book.availableCopies} of {book.totalCopies} copies available
                        </span>
                      </p>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full sm:w-auto" disabled={!isAvailable}>
                      {isAvailable ? 'Borrow This Book' : 'Currently Unavailable'}
                    </Button>
                  </div>
                </div>

                {/* Description */}
                {book.description && (
                  <div className="border-t border-border pt-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                      Description
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Physical Location */}
              <Card className="p-6 bg-white/90 backdrop-blur-md border-orange-100 shadow-lg overflow-hidden group">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  Physical Location
                </h3>

                <div className="space-y-4">
                  <Library3DMap location={book.location} />
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Details</p>
                    <p className="text-lg font-semibold text-foreground uppercase tracking-tight">
                      {book.location || 'Location Not Specified'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Related Info */}
              <Card className="p-6 bg-blue-50/80 backdrop-blur-md border-blue-100 shadow-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Lending Period
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  This book can be borrowed for <strong>14 days</strong>. Late fees apply at ₹5 per day after the due date.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </BeamsBackground>
  );
}
