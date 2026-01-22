'use client';

import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { DashboardCard } from '@/components/dashboard-card';
import { BookCard } from '@/components/book-card';
import { Button } from '@/components/ui/button';
import { BookOpen, AlertCircle, Clock, TrendingUp, Library, BookMarked, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { WavyBackground } from '@/components/ui/wavy-background';

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
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 flex items-center gap-2">
                    <BookMarked className="w-4 h-4" />
                    Manage and track your library books
                  </p>
                </div>
              </div>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-xl p-6 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100/50 to-transparent rounded-full blur-3xl -z-10" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                  <h2 className="text-xl font-bold text-gray-800">Featured Books</h2>
                </div>
                <Link href="/categories">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400 transition-all"
                  >
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
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Library className="w-5 h-5 text-orange-600" />
                  Library Information
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between p-2 rounded-lg hover:bg-orange-50/50 transition-colors">
                    <span className="text-gray-600">Opening Hours:</span>
                    <span className="font-semibold text-orange-600">8 AM - 6 PM</span>
                  </li>
                  <li className="flex justify-between p-2 rounded-lg hover:bg-orange-50/50 transition-colors">
                    <span className="text-gray-600">Lending Period:</span>
                    <span className="font-semibold text-orange-600">14 Days</span>
                  </li>
                  <li className="flex justify-between p-2 rounded-lg hover:bg-orange-50/50 transition-colors">
                    <span className="text-gray-600">Max Books:</span>
                    <span className="font-semibold text-orange-600">5 Books</span>
                  </li>
                  <li className="flex justify-between p-2 rounded-lg hover:bg-orange-50/50 transition-colors">
                    <span className="text-gray-600">Late Fee:</span>
                    <span className="font-semibold text-orange-600">₹5/day</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-orange-600" />
                  Account Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-orange-100">
                    <span className="text-gray-600">Account Status:</span>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-orange-100">
                    <span className="text-gray-600">Membership Valid:</span>
                    <span className="text-orange-600 font-semibold">Till Dec 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Books Issued This Semester:</span>
                    <span className="text-orange-600 font-semibold text-lg">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </WavyBackground>
  );
}
