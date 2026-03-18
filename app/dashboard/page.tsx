'use client';

import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { CountdownIndicator } from '@/components/countdown-indicator';
import { Calendar, AlertTriangle, BookMarked } from 'lucide-react';
import { BeamsBackground } from '@/components/ui/beams-background';

const issuedBooks = [
  {
    id: 1,
    title: 'Data Structures and Algorithms',
    author: 'Thomas H. Cormen',
    issueDate: '2024-01-05',
    dueDate: '2024-01-19',
    daysRemaining: 8,
    penalty: 0,
  },
  {
    id: 2,
    title: 'Engineering Mathematics',
    author: 'K.A. Stroud',
    issueDate: '2024-01-08',
    dueDate: '2024-01-22',
    daysRemaining: 12,
    penalty: 0,
  },
  {
    id: 3,
    title: 'Digital Signal Processing',
    author: 'Alan V. Oppenheim',
    issueDate: '2023-12-25',
    dueDate: '2024-01-08',
    daysRemaining: -3,
    penalty: 15,
  },
  {
    id: 4,
    title: 'Thermodynamics',
    author: 'Y.A. Çengel',
    issueDate: '2024-01-10',
    dueDate: '2024-01-24',
    daysRemaining: 5,
    penalty: 0,
  },
  {
    id: 5,
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    issueDate: '2024-01-12',
    dueDate: '2024-01-26',
    daysRemaining: 10,
    penalty: 0,
  },
];

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default function Dashboard() {
  const totalPenalty = issuedBooks.reduce((sum, book) => sum + book.penalty, 0);
  const overdueCount = issuedBooks.filter((book) => book.daysRemaining < 0).length;

  return (
    <BeamsBackground
      className="flex flex-col h-screen"
      intensity="medium"
    >
      <Navbar studentName="Piyush" studentId="23FE10CAI00225" />

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
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Book Title
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Author
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Issue Date
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Due Date
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">
                      Penalty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.map((book) => (
                    <tr key={book.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{book.title}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {book.author}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(book.issueDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(book.dueDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <CountdownIndicator daysRemaining={book.daysRemaining} />
                      </td>
                      <td className="px-6 py-4 text-right font-semibold">
                        {book.penalty > 0 ? (
                          <span className="text-red-600">₹{book.penalty}</span>
                        ) : (
                          <span className="text-green-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden divide-y divide-border">
              {issuedBooks.map((book) => (
                <div key={book.id} className="p-4 space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Issued</p>
                      <p className="text-foreground">{formatDate(book.issueDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Due</p>
                      <p className="text-foreground">{formatDate(book.dueDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <CountdownIndicator daysRemaining={book.daysRemaining} />
                    <div className="text-right">
                      {book.penalty > 0 ? (
                        <div>
                          <p className="text-xs text-muted-foreground">Penalty</p>
                          <p className="text-lg font-semibold text-red-600">₹{book.penalty}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs text-muted-foreground">Penalty</p>
                          <p className="text-lg font-semibold text-green-600">—</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
      </main>
    </BeamsBackground>
  );
}
