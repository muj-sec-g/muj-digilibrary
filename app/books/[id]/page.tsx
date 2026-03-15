import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, MapPin, Package } from 'lucide-react';
import prisma from '@/lib/prisma';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/status-badge';

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
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Pass user info here when auth is integrated */}
        <Navbar studentName="Student" studentId="Guest" />

        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Back Button */}
            <Link href="/books">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Books
              </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Book Info Card */}
              <div className="lg:col-span-2">
                <Card className="p-8">
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
                          <h1 className="text-3xl font-bold text-foreground mb-2">
                            {book.title}
                          </h1>
                          <p className="text-lg text-muted-foreground mb-4">
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
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    Physical Location
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Details</p>
                      <p className="text-lg font-semibold text-foreground">
                        {book.location || 'Location Not Specified'}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Related Info */}
                <Card className="p-6 bg-blue-50/50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/50">
                  <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-3 flex items-center">
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
      </div>
    </div>
  );
}
