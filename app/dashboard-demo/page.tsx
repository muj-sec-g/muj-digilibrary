'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { CountdownIndicator } from '@/components/countdown-indicator';
import { Calendar, AlertTriangle, BookMarked } from 'lucide-react';
import { BeamsBackground } from '@/components/ui/beams-background';

// Demo Mock Data
const MOCK_ISSUED_BOOKS = [
  {
    id: '1',
    title: 'Introduction to Quantum Mechanics',
    author: 'David J. Griffiths',
    issueDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),   // 5 days ago
    daysRemaining: -5,
    penalty: 25,
  },
  {
    id: '2',
    title: 'The Art of Computer Programming',
    author: 'Donald Knuth',
    issueDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),    // 2 days from now
    daysRemaining: 2,
    penalty: 0,
  },
  {
    id: '3',
    title: 'Digital Design and Computer Architecture',
    author: 'Harris & Harris',
    issueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),  // 2 days ago
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),   // 12 days from now
    daysRemaining: 12,
    penalty: 0,
  }
];

const MOCK_SUMMARY = {
  totalActive: 3,
  totalOverdue: 1,
  totalFine: 25,
};

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default function DashboardDemo() {
  const issuedBooks = MOCK_ISSUED_BOOKS;
  const summary = MOCK_SUMMARY;
  const overdueCount = summary.totalOverdue;

  return (
    <BeamsBackground className="flex flex-col min-h-screen" intensity="medium">
      <Navbar />

      <main className="flex-1">
        <div className="p-8 max-w-7xl mx-auto">
          {/* Demo Ribbon */}
          <div className="bg-orange-600 text-white text-center py-1 text-xs font-bold uppercase tracking-widest rounded-b-lg mb-8 shadow-lg">
            Demo Mode: Displaying Sample Student Records
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard & Profile</h1>
            <p className="text-gray-600 mt-1">Showing how active borrowing and penalties appear for students.</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 transition-all hover:shadow-md hover:border-orange-200">
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Issued</p>
              <p className="text-4xl font-bold text-foreground">{issuedBooks.length}</p>
            </Card>
            <Card className="p-6 border-purple-100 bg-purple-50/30 transition-all hover:shadow-md">
              <p className="text-sm font-medium text-purple-600 mb-2">Due Soon (≤5 days)</p>
              <p className="text-4xl font-bold text-purple-700">
                {issuedBooks.filter((b) => b.daysRemaining >= 0 && b.daysRemaining <= 5).length}
              </p>
            </Card>
            <Card className="p-6 border-red-100 bg-red-50/30 transition-all hover:shadow-md">
              <p className="text-sm font-medium text-red-600 mb-2">Total Penalties</p>
              <p className="text-4xl font-bold text-red-700">₹{summary.totalFine}</p>
            </Card>
          </div>

          {/* Overdue Alert */}
          {overdueCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500 shadow-sm">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              </div>
              <div>
                <h3 className="font-bold text-red-900 text-lg mb-1">
                  You have {overdueCount} overdue book{overdueCount !== 1 ? 's' : ''}
                </h3>
                <p className="text-red-800 opacity-90">
                  Please return them to the Central Library circulation desk immediately to avoid growing daily fines.
                </p>
              </div>
            </div>
          )}

          {/* Books Table */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-8 py-5 text-sm font-bold text-gray-700">Book Details</th>
                    <th className="text-left px-8 py-5 text-sm font-bold text-gray-700">Loan Timeline</th>
                    <th className="text-left px-8 py-5 text-sm font-bold text-gray-700">Current Status</th>
                    <th className="text-right px-8 py-5 text-sm font-bold text-gray-700">Action/Fine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {issuedBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-orange-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-14 bg-gray-100 rounded flex items-center justify-center border border-gray-200 group-hover:border-orange-200 shadow-sm">
                            <BookMarked className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{book.title}</p>
                            <p className="text-sm text-gray-500">{book.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            <span>Issued: {formatDate(book.issueDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            <Calendar className="w-4 h-4 text-red-500" />
                            <span>Due: {formatDate(book.dueDate)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="max-w-[140px]">
                          <CountdownIndicator daysRemaining={book.daysRemaining} />
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span
                          className={`inline-flex px-4 py-1.5 rounded-full text-xs font-black tracking-tight ${
                            book.penalty > 0
                              ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {book.penalty > 0 ? `PENALTY: ₹${book.penalty}` : 'NO DUES'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Guidelines */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
            <Card className="p-8 bg-blue-50/50 border-blue-100 shadow-sm">
              <h3 className="font-bold text-blue-900 text-lg mb-4">Lending Policies</h3>
              <ul className="text-sm text-blue-800 space-y-3">
                <li className="flex gap-2">
                  <span className="font-black">•</span>
                  <span><strong>Duration:</strong> Standard 14-day lending period applies to all physical volumes.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-black">•</span>
                  <span><strong>Overdue:</strong> A fine of ₹5 per day is levied immediately following the due date.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-black">•</span>
                  <span><strong>Limit:</strong> Maximum of 5 books can be issued concurrently per student ID.</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-emerald-50/50 border-emerald-100 shadow-sm">
              <h3 className="font-bold text-emerald-900 text-lg mb-4">Support Channels</h3>
              <div className="space-y-4">
                <p className="text-sm text-emerald-800">
                  Have issues with your issued books or incorrect penalty records?
                </p>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-emerald-700">Email: library@muj.manipal.edu</span>
                  <span className="text-sm font-semibold text-emerald-700">Phone: +91-141-3999100 (Ext. 244)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </BeamsBackground>
  );
}
