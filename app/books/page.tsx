'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { BeamsBackground } from '@/components/ui/beams-background';
import { SearchAutocomplete } from '@/components/books/search-autocomplete';
import Link from 'next/link';
import { Library, Sparkles, Code, Zap, BookMarked, BookOpen, Calculator, Loader2 } from 'lucide-react';

interface Category {
    name: string;
    count: number;
}

// Map category names to icons and colors
const categoryStyles: Record<string, any> = {
    'Computer Science': {
        icon: Code,
        color: 'from-orange-50 to-orange-100/50',
        iconColor: 'from-orange-500 to-orange-600',
        textColor: 'text-orange-700',
    },
    'Physics': {
        icon: Zap,
        color: 'from-amber-50 to-amber-100/50',
        iconColor: 'from-amber-500 to-amber-600',
        textColor: 'text-amber-700',
    },
    'Literature': {
        icon: BookMarked,
        color: 'from-orange-50 to-red-50',
        iconColor: 'from-orange-600 to-red-600',
        textColor: 'text-red-700',
    },
    'History': {
        icon: BookOpen,
        color: 'from-orange-50 to-yellow-50',
        iconColor: 'from-orange-500 to-yellow-600',
        textColor: 'text-orange-700',
    },
    'Mathematics': {
        icon: Calculator,
        color: 'from-orange-100 to-orange-50',
        iconColor: 'from-orange-600 to-orange-500',
        textColor: 'text-orange-700',
    },
};

export default function BooksPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/books/categories');
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

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
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                                <Library className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                                    Browse Books
                                </h1>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Search and explore books by category
                                </p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl">
                            <SearchAutocomplete />
                        </div>
                    </div>

                    {/* Categories Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((category) => {
                                const style = categoryStyles[category.name] || categoryStyles['Computer Science'];
                                const Icon = style.icon;

                                return (
                                    <Link key={category.name} href={`/categories/${category.name.toLowerCase().replace(' ', '-')}`}>
                                        <div className={`bg-gradient-to-br ${style.color} rounded-2xl border border-orange-100 p-8 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden group`}>
                                            {/* Decorative gradient blob */}
                                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />

                                            <div className="flex items-start justify-between mb-6 relative z-10">
                                                <div className={`p-4 rounded-xl bg-gradient-to-br ${style.iconColor} shadow-lg group-hover:shadow-xl transition-shadow`}>
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                                <span className="text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 rounded-full shadow-md">
                                                    {category.count} books
                                                </span>
                                            </div>

                                            <h2 className={`text-2xl font-bold ${style.textColor} mb-2 group-hover:scale-105 transition-transform`}>
                                                {category.name}
                                            </h2>
                                            <p className="text-sm text-gray-600 mb-6">
                                                Explore {category.count} available titles in this category
                                            </p>

                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all group-hover:gap-3">
                                                View Books
                                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </BeamsBackground>
    );
}
