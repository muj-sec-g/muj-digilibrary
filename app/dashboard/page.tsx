'use client';

import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { DashboardCard } from '@/components/dashboard-card';
import { BookCard } from '@/components/book-card';
import { Button } from '@/components/ui/button';
import { BookOpen, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const recentBooks = [
  {
    id: '1',
    title: 'Data Structures and Algorithms',
    author: 'Thomas H. Cormen',
    domain: 'Computer Science',
    available: true,
  },
  {
    id: '2',
    title: 'Digital Signal Processing',
    author: 'Alan V. Oppenheim',
    domain: 'Electronics',
    available: false,
  },
  {
    id: '3',
    title: 'Engineering Mathematics',
    author: 'K.A. Stroud',
    domain: 'Mathematics',
    available: true,
  },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar studentName="Rajesh Kumar" studentId="CS2024001" />
        
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Manage and track your library books</p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard
                title="Issued Books"
                value="5"
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
                description="Currently borrowed"
              />
              <DashboardCard
                title="Books Due Soon"
                value="2"
                icon={<Clock className="w-6 h-6" />}
                color="purple"
                description="Due within 5 days"
              />
              <DashboardCard
                title="Overdue Books"
                value="0"
                icon={<AlertCircle className="w-6 h-6" />}
                color="red"
                description="No overdue books"
              />
              <DashboardCard
                title="Total Penalties"
                value="₹0"
                icon={<TrendingUp className="w-6 h-6" />}
                color="green"
                description="Current penalties"
              />
            </div>

            {/* Recent Books Section */}
            <div className="bg-card rounded-lg border border-border p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Featured Books</h2>
                <Link href="/categories">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentBooks.map((book) => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Library Information
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Opening Hours:</span>
                    <span className="font-medium text-foreground">8 AM - 6 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Lending Period:</span>
                    <span className="font-medium text-foreground">14 Days</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Max Books:</span>
                    <span className="font-medium text-foreground">5 Books</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Late Fee:</span>
                    <span className="font-medium text-foreground">₹5/day</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Account Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground">Account Status:</span>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground">Membership Valid:</span>
                    <span className="text-foreground font-medium">Till Dec 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Books Issued This Semester:</span>
                    <span className="text-foreground font-medium">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
