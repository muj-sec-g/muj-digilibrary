'use client';

import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import Link from 'next/link';
import { BookOpen, Code, Zap, Hammer, Building, Calculator } from 'lucide-react';

const categories = [
  {
    id: 'computer-science',
    name: 'Computer Science',
    icon: Code,
    books: 245,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Zap,
    books: 128,
    color: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
  {
    id: 'mechanical',
    name: 'Mechanical',
    icon: Hammer,
    books: 189,
    color: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    id: 'civil',
    name: 'Civil',
    icon: Building,
    books: 156,
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    books: 203,
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: 'general',
    name: 'General',
    icon: BookOpen,
    books: 312,
    color: 'bg-gray-50',
    iconColor: 'text-gray-600',
  },
];

export default function CategoriesPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar studentName="Rajesh Kumar" studentId="CS2024001" />

        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Browse Categories</h1>
              <p className="text-muted-foreground">
                Explore books by subject area
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link key={category.id} href={`/categories/${category.id}`}>
                    <div className={`${category.color} rounded-lg border border-border p-8 cursor-pointer hover:shadow-lg transition-shadow h-full`}>
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-4 rounded-lg ${category.color}`}>
                          <Icon className={`w-8 h-8 ${category.iconColor}`} />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded">
                          {category.books} books
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {category.name}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Explore {category.books} available titles in this category
                      </p>

                      <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
                        View Books →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
