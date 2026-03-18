'use client';

import { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/navbar';
import { BeamsBackground } from '@/components/ui/beams-background';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';
import { Library, Sparkles, Code, Zap, BookMarked, BookOpen, Calculator, Loader2, Search, User, SlidersHorizontal, ArrowLeft } from 'lucide-react';

interface Category {
    name: string;
    count: number;
}

interface Book {
    id: string;
    isbn: string;
    title: string;
    author: string;
    category: string;
    availableCopies: number;
    totalCopies: number;
    coverImage: string | null;
}

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
    // Categories and Books State
    const [categories, setCategories] = useState<Category[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(false);

    // Search and Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

    // Determine if user has actively searched
    const hasSearched = searchQuery.length > 0 || selectedCategory !== 'All' || showOnlyAvailable;

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/books/categories');
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    // Fetch books when search criteria change (debounce search input)
    useEffect(() => {
        if (!hasSearched) return;

        const timer = setTimeout(async () => {
            setLoadingBooks(true);
            try {
                let url = '/api/books?';
                if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
                if (selectedCategory !== 'All') url += `category=${encodeURIComponent(selectedCategory)}&`;

                const response = await fetch(url);
                const data = await response.json();
                setBooks(data.books || []);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            } finally {
                setLoadingBooks(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, selectedCategory, hasSearched]);

    const filteredBooks = useMemo(() => {
        if (!showOnlyAvailable) return books;
        return books.filter(book => book.availableCopies > 0);
    }, [books, showOnlyAvailable]);

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        // Page scrolls up naturally if we want, or stays same
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setShowOnlyAvailable(false);
    };

    return (
        <BeamsBackground
            className="flex flex-col"
            intensity="medium"
        >
            <Navbar />

            <main className="flex-1">
                <div className="p-8 max-w-7xl mx-auto border-transparent relative z-10">

                    {/* Header */}
                    <div className="mb-8 relative flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Browse Books
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Search by title, author, or category
                            </p>
                        </div>
                    </div>

                    {/* Advanced Search Bar Block */}
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-orange-100 shadow-xl p-6 mb-12 relative overflow-hidden">
                        {/* Decorative blob */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100/50 to-transparent rounded-full blur-3xl -z-10" />

                        <div className="flex items-center gap-2 mb-4 text-orange-600 font-medium">
                            <SlidersHorizontal className="w-5 h-5" />
                            <h2>Advanced Search & Filters</h2>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search Input */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-orange-500" />
                                <Input
                                    placeholder="Search by title, author, or ISBN..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12 text-md border-orange-200 focus-visible:ring-orange-500 bg-white/60"
                                />
                            </div>

                            {/* Category Dropdown */}
                            <div className="w-full lg:w-64">
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="h-12 bg-white/60 border-orange-200">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All Categories</SelectItem>
                                        {categories.map(c => (
                                            <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Available Only Toggle */}
                            <Button
                                variant={showOnlyAvailable ? 'default' : 'outline'}
                                onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
                                className={`h-12 whitespace-nowrap transition-all ${showOnlyAvailable
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 text-white shadow-md border-transparent'
                                    : 'bg-white/60 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800'
                                    }`}
                            >
                                {showOnlyAvailable ? 'Available Only' : 'Show All'}
                            </Button>
                        </div>
                    </div>

                    {/* Content Area */}
                    {!hasSearched ? (
                        /* Categories Grid View */
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-2 mb-6 text-gray-800">
                                <h2 className="text-2xl font-bold">Search via Categories</h2>
                            </div>

                            {loadingCategories ? (
                                <div className="flex justify-center py-20">
                                    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categories.map((category) => {
                                        const style = categoryStyles[category.name] || categoryStyles['Computer Science'];
                                        const Icon = style.icon;

                                        return (
                                            <div
                                                key={category.name}
                                                onClick={() => handleCategoryClick(category.name)}
                                                className={`bg-gradient-to-br ${style.color} rounded-2xl border border-orange-100 p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden group`}
                                            >
                                                {/* Decorative blob inside card */}
                                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-200/40 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                                                <div className="flex items-start justify-between mb-6 relative z-10">
                                                    <div className={`p-4 rounded-xl bg-gradient-to-br ${style.iconColor} shadow-lg group-hover:shadow-xl transition-shadow`}>
                                                        <Icon className="w-8 h-8 text-white" />
                                                    </div>
                                                    <span className="text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 rounded-full shadow-md">
                                                        {category.count} books
                                                    </span>
                                                </div>

                                                <h3 className={`text-2xl font-bold ${style.textColor} mb-2`}>
                                                    {category.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-6">
                                                    Explore {category.count} available titles in this category
                                                </p>

                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 text-orange-700 rounded-lg text-sm font-semibold shadow-sm group-hover:bg-orange-50 transition-all group-hover:gap-3">
                                                    Browse Books
                                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Search Results View */
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Search Results
                                </h2>
                                <Button variant="ghost" className="text-orange-600 hover:text-orange-800 hover:bg-orange-50" onClick={clearFilters}>
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
                                </Button>
                            </div>

                            {loadingBooks ? (
                                <div className="flex justify-center py-20">
                                    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                                </div>
                            ) : filteredBooks.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredBooks.map((book) => {
                                        const isAvailable = book.availableCopies > 0;
                                        return (
                                            <div
                                                key={book.id}
                                                className="bg-white/90 backdrop-blur-sm rounded-xl border border-orange-100 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col"
                                            >
                                                {/* Cover Image */}
                                                <div className="relative h-56 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg overflow-hidden mb-4 shrink-0">
                                                    {book.coverImage ? (
                                                        <Image
                                                            src={book.coverImage}
                                                            alt={book.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <BookOpen className="w-16 h-16 text-orange-300" />
                                                        </div>
                                                    )}

                                                    {/* Status Badge */}
                                                    <div className="absolute top-2 right-2">
                                                        {isAvailable ? (
                                                            <span className="px-3 py-1 bg-green-500/90 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-sm">
                                                                Available
                                                            </span>
                                                        ) : (
                                                            <span className="px-3 py-1 bg-red-500/90 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-sm">
                                                                Out of Stock
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Book Info */}
                                                <div className="flex-1 flex flex-col">
                                                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2" title={book.title}>
                                                        {book.title}
                                                    </h3>

                                                    <div className="flex items-center gap-2 text-gray-600 mb-3 mt-auto">
                                                        <User className="w-4 h-4 text-orange-400" />
                                                        <p className="text-sm line-clamp-1">{book.author}</p>
                                                    </div>

                                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4 bg-orange-50/50 p-2 rounded-lg">
                                                        <span className="font-medium text-orange-700">
                                                            {book.category}
                                                        </span>
                                                        <span className="font-semibold text-gray-700">
                                                            {book.availableCopies}/{book.totalCopies} copies
                                                        </span>
                                                    </div>

                                                    <Link href={`/books/${book.id}`} className="mt-auto">
                                                        <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:gap-3">
                                                            View Details
                                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-lg p-16 text-center mt-8">
                                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <BookOpen className="w-10 h-10 text-orange-600" />
                                    </div>
                                    <p className="text-gray-900 text-xl font-bold mb-2">No books found</p>
                                    <p className="text-md text-gray-500">
                                        Try adjusting your search criteria or category filter
                                    </p>
                                    <Button onClick={clearFilters} variant="outline" className="mt-6 border-orange-200 text-orange-600 hover:bg-orange-50">
                                        Clear Filters
                                    </Button>
                                </div>
                            )}

                            {/* Results Count Summary */}
                            {!loadingBooks && filteredBooks.length > 0 && (
                                <div className="mt-8 text-sm text-gray-600 text-center bg-white/60 backdrop-blur-sm rounded-full px-6 py-2 inline-block mx-auto flex justify-center w-max shadow-sm border border-orange-50">
                                    Showing <span className="font-bold text-orange-600 mx-1">{filteredBooks.length}</span> results
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </BeamsBackground>
    );
}
