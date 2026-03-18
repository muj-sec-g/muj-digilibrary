'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { CountdownIndicator } from '@/components/countdown-indicator';
import { Calendar, AlertTriangle, BookMarked, Loader2 } from 'lucide-react';
import { BeamsBackground } from '@/components/ui/beams-background';

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default function Dashboard() {
  const [issuedBooks, setIssuedBooks] = useState<any[]>([]);
  const [summary, setSummary] = useState({ totalActive: 0, totalOverdue: 0, totalFine: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const saved = localStorage.getItem('muj_user');
        if (!saved) {
          window.location.href = '/';
          return;
        }
        const user = JSON.parse(saved);
        const res = await fetch(`/api/student/dashboard?studentId=${user.id}`);
        const data = await res.json();

        if (data.success) {
          setIssuedBooks(data.issuedBooks);
          setSummary(data.summary);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const totalPenalty = summary.totalFine;
  const overdueCount = summary.totalOverdue;

  return (
    <BeamsBackground
      className="flex flex-col h-screen"
      intensity="medium"
    >
      <Navbar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 relative">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard & Profile
              </h1>
              <p className="text-gray-600 mt-1">
                Track and manage your borrowed books and library record
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Total Issued
              </p>
              <p className="text-3xl font-bold text-foreground">{issuedBooks.length}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Due Soon (≤5 days)
              </p>
              <p className="text-3xl font-bold text-purple-600">
                {issuedBooks.filter((b) => b.daysRemaining >= 0 && b.daysRemaining <= 5).length}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Total Penalties
              </p>
              <p className="text-3xl font-bold text-red-600">₹{totalPenalty}</p>
            </Card>
          </div>

          {/* Overdue Alert */}
          {overdueCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">
                  You have {overdueCount} overdue book{overdueCount !== 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-red-800">
                  Please return them to the library to avoid additional penalties.
                </p>
              </div>
            </div>
          )}

          {/* Books Table */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
              </div>
            ) : issuedBooks.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-lg p-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookMarked className="w-10 h-10 text-orange-600" />
                </div>
                <p className="text-gray-900 text-xl font-bold mb-2">No borrowed books yet</p>
                <p className="text-md text-gray-500">
                  You haven't issued any books. Head over to the Books section to explore!
                </p>
              </div>
            ) : (
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted">
                        <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                          Book Title
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                          Issue/Due Date
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                          Status
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                          Penalty
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {issuedBooks.map((book) => (
                        <tr key={book.id} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-medium text-foreground">{book.title}</p>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {formatDate(book.issueDate)} - {formatDate(book.dueDate)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <CountdownIndicator daysRemaining={book.daysRemaining} />
                              <span className="text-sm font-medium text-foreground">
                                {book.daysRemaining < 0
                                  ? `${Math.abs(book.daysRemaining)} days overdue`
                                  : book.daysRemaining === 0
                                    ? 'Due today'
                                    : `${book.daysRemaining} days remaining`}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${book.penalty > 0
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : 'bg-green-100 text-green-700 border border-green-200'
                                }`}
                            >
                              {book.penalty > 0 ? `₹${book.penalty}` : 'No Penalty'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="md:hidden divide-y divide-border">
                  {issuedBooks.map((book) => (
                    <div key={book.id} className="p-4 space-y-4 bg-card">
                      <div>
                        <h4 className="font-semibold text-foreground">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-xs">Issued</span>
                          <span className="font-medium text-foreground">
                            {formatDate(book.issueDate)}
                          </span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-muted-foreground text-xs">Due</span>
                          <span className="font-medium text-foreground">
                            {formatDate(book.dueDate)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-2">
                          <CountdownIndicator daysRemaining={book.daysRemaining} />
                          <span className="text-sm font-semibold text-foreground">
                            {Math.abs(book.daysRemaining)}d
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${book.penalty > 0
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : 'bg-green-100 text-green-700 border border-green-200'
                            }`}
                        >
                          {book.penalty > 0 ? `₹${book.penalty}` : 'Clear'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3">Loan Information</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>
                    <strong>Lending Period:</strong> 14 days
                  </li>
                  <li>
                    <strong>Late Fee:</strong> ₹5 per day
                  </li>
                  <li>
                    <strong>Max Books:</strong> 5 books at a time
                  </li>
                  <li>
                    <strong>Renewal:</strong> You can renew up to 2 times
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="font-semibold text-green-900 mb-3">Library Contact</h3>
                <ul className="text-sm text-green-800 space-y-2">
                  <li>
                    <strong>Email:</strong> library@muj.manipal.edu
                  </li>
                  <li>
                    <strong>Phone:</strong> +91-141-3999100
                  </li>
                  <li>
                    <strong>Hours:</strong> 8 AM - 6 PM
                  </li>
                  <li>
                    <strong>Closed:</strong> Sundays
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </BeamsBackground>
  );
}
