'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { BeamsBackground } from '@/components/ui/beams-background';

const TABS = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'collections', label: 'COLLECTIONS & E-RESOURCES' },
    { id: 'ebooks', label: 'E-BOOKS & SERVICES' },
    { id: 'forum', label: 'BOOK SEARCH & FORUM' },
    { id: 'member', label: 'INSTITUTIONAL MEMBER' },
    { id: 'awards', label: 'AWARD & PRACTICES' },
    { id: 'tools', label: 'TOOLS' },
    { id: 'contact', label: 'CONTACT US' },
];

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <BeamsBackground className="flex flex-col h-screen" intensity="medium">
            <Navbar />

            <main className="flex-1 overflow-hidden flex flex-col pt-8 space-y-8">
                {/* Header Section */}
                <div className="px-6 md:px-12 shrink-0">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2">
                        About Our Library
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        Explore our vast collections, institutional practices, and digital resources provided by the university.
                    </p>
                </div>

                {/* Tab Navigation Area */}
                <div className="w-full px-6 md:px-12 shrink-0">
                    {/* 
            Hide scrollbar but allow horizontal scrolling 
            using a flex container that overflows 
          */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                    relative shrink-0 px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide 
                    rounded-md transition-all duration-300 ease-out snap-start
                    ${isActive
                                            ? 'bg-[#d36b36] text-white shadow-md border border-[#d36b36]' // The exact brand orange from the screenshot
                                            : 'bg-white/80 text-[#d36b36] border border-[#d36b36] hover:bg-[#d36b36]/10 backdrop-blur-sm'
                                        }
                  `}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Details Area */}
                <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-12">
                    <div className="bg-white/90 backdrop-blur-md border border-orange-100/50 shadow-xl rounded-2xl p-8 min-h-[500px]">
                        {activeTab === 'overview' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Welcome to the MUJ Central Library. This section contains the general overview of our library&apos;s mission, vision, and core objectives.
                                    <br /><br />
                                    (You can paste your college website&apos;s overview content here).
                                </p>
                            </div>
                        )}

                        {activeTab === 'collections' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Collections & E-Resources</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Dive into our extensive catalogs featuring millions of digital papers, academic journals, and physical books.
                                    <br /><br />
                                    (You can paste your collections content here).
                                </p>
                            </div>
                        )}

                        {activeTab === 'ebooks' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">E-Books & Services</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Learn about our digital loan services, Kindle lending programs, and online archives.
                                    <br /><br />
                                    (You can paste your e-books content here).
                                </p>
                            </div>
                        )}

                        {activeTab === 'forum' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Search & Forum</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Connect with other students and academicians to discuss literature and research methodologies.
                                    <br /><br />
                                    (You can paste your forum content here).
                                </p>
                            </div>
                        )}

                        {activeTab === 'member' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Institutional Member</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Information regarding our partnerships with global institutions and inter-library loan networks.
                                    <br /><br />
                                    (You can paste your membership content here).
                                </p>
                            </div>
                        )}

                        {activeTab === 'awards' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Award & Practices</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Recognitions our library has achieved and the best practices we maintain for intellectual preservation.
                                    <br /><br />
                                    (You can paste your awards content here).
                                </p>
                            </div>
                        )}

                        {activeTab === 'tools' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tools</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Citation generators, research software, and technical tools available to our students.
                                    <br /><br />
                                    (You can paste your tools content here).
                                </p>
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Get in touch with the library administration.
                                    <br /><br />
                                    Email: library@muj.manipal.edu<br />
                                    Phone: +91-141-3999100
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </BeamsBackground>
    );
}
