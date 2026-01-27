'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Suggestion {
    id: string;
    title: string;
    author: string;
    category: string;
}

export function SearchAutocomplete() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Fetch suggestions
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`/api/books/autocomplete?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setSuggestions(data.suggestions || []);
                setIsOpen(data.suggestions?.length > 0);
            } catch (error) {
                console.error('Autocomplete error:', error);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [query]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                    handleSelectBook(suggestions[selectedIndex].id);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    const handleSelectBook = (bookId: string) => {
        setIsOpen(false);
        setQuery('');
        router.push(`/books/${bookId}`);
    };

    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search for books by title or author..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 pr-12 py-3 text-base rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={suggestion.id}
                            onClick={() => handleSelectBook(suggestion.id)}
                            className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors ${index === selectedIndex ? 'bg-orange-50' : ''
                                }`}
                        >
                            <div className="font-semibold text-gray-900">{suggestion.title}</div>
                            <div className="text-sm text-gray-600">
                                {suggestion.author} • {suggestion.category}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
