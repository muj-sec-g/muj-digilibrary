'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { BeamsBackground } from '@/components/ui/beams-background';
import { ImageIcon, X, MapPin, Mail } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';


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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <BeamsBackground className="flex flex-col" intensity="medium">
            <Navbar />

            <main className="flex-1 flex flex-col pt-8 space-y-8">
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
                    <div className="flex flex-wrap items-center gap-3 pb-4">
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
                <div className="flex-1 px-6 md:px-12 pb-12">
                    <div className="bg-white/90 backdrop-blur-md border border-orange-100/50 shadow-xl rounded-2xl p-8 min-h-[500px]">
                        {activeTab === 'overview' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-16">
                                    {/* Text Section */}
                                    <section>
                                        <h2 className="text-2xl font-bold text-[#d36b36] mb-4 uppercase tracking-wide">Overview</h2>
                                        <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                                            <p>
                                                The Central Library of MUJ has a spacious area of 2319 Sq.m. that exudes peaceful learning environment. The Library is fully air-conditioned with the seating capacity of 700. The central Library employs RFID technology for access control, automatic issue and return of library documents, and stock verification of library holdings. The Central Library has a collection of 57800 books with 14500 titles on various subjects and over 3000 reference books. It subscribes about 400 national and international print journals and holds over 450 project reports and 95 Ph.D Thesis. The Digital Library has subscribed 18 E-Resources include 17800 e-journals, manuals, reports, standards, and other information from ASME, IEL Online, Science Direct, Taylor & Francis, EBSCO Business Source Elite, EBSCO Art & Architecture, EBSCO Hospitality & Tourism Complete, EBSCO Academic Search Elite, EPW India Time Series, JSTOR, Manupatra, Lexis India, Supreme Court Cases, and AIR Online.
                                            </p>
                                            <p>
                                                The Digital library holds nearly 2500 CDs and DVDs. The Central Library has established an Institutional Repository using Dspace: A Digital Library Software. The Central Library provides off campus access to all of its subscribed contents to the students, faculty, and research scholars through username and password using knimbus software. The Central Library extends research support to the researchers and faculty by providing Turnitin: A Plagiarism checking software.
                                            </p>
                                            <p>
                                                The Central Library is a Member of DELNET, INFLIBNET, e-ShodhSindhu, ShodhGanga, British Council Library, Current Science, Indian Academy of Social Sciences, and American Library.
                                            </p>
                                        </div>
                                    </section>

                                    {/* Working Hours Section */}
                                    <section>
                                        <h2 className="text-2xl font-bold text-[#d36b36] mb-6 uppercase tracking-wide">Working Hours</h2>

                                        <div className="space-y-8">
                                            {/* Week Days Table */}
                                            <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                                                <table className="w-full text-sm text-center">
                                                    <thead className="bg-gray-50 border-b border-gray-200">
                                                        <tr>
                                                            <th colSpan={3} className="py-3 px-4 font-semibold text-gray-800">Week Days</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        <tr className="hover:bg-orange-50/50 transition-colors">
                                                            <td className="py-3 px-4 font-medium text-gray-900 border-r border-gray-200 w-1/3">Working Hours</td>
                                                            <td className="py-3 px-4 text-gray-600 border-r border-gray-200 w-1/3">8.30 a.m.</td>
                                                            <td className="py-3 px-4 text-gray-600 w-1/3">11.00 p.m.</td>
                                                        </tr>
                                                        <tr className="hover:bg-orange-50/50 transition-colors">
                                                            <td className="py-3 px-4 font-medium text-gray-900 border-r border-gray-200">Issues/Returns</td>
                                                            <td className="py-3 px-4 text-gray-600 border-r border-gray-200">8.00 a.m.</td>
                                                            <td className="py-3 px-4 text-gray-600">6.00 p.m.</td>
                                                        </tr>
                                                        <tr className="hover:bg-orange-50/50 transition-colors">
                                                            <td className="py-3 px-4 font-medium text-gray-900 border-r border-gray-200">Reprography</td>
                                                            <td className="py-3 px-4 text-gray-600 border-r border-gray-200">9.00 a.m.</td>
                                                            <td className="py-3 px-4 text-gray-600">5.00 p.m.</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Sundays & Holidays Table */}
                                            <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                                                <table className="w-full text-sm text-center">
                                                    <thead className="bg-gray-50 border-b border-gray-200">
                                                        <tr>
                                                            <th colSpan={3} className="py-3 px-4 font-semibold text-gray-800">Sundays & Holidays</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        <tr className="hover:bg-orange-50/50 transition-colors">
                                                            <td className="py-3 px-4 font-medium text-gray-900 border-r border-gray-200 w-1/3">Working Hours</td>
                                                            <td className="py-3 px-4 text-gray-600 border-r border-gray-200 w-1/3">9.00 a.m.</td>
                                                            <td className="py-3 px-4 text-gray-600 w-1/3">6.00 p.m.</td>
                                                        </tr>
                                                        <tr className="hover:bg-orange-50/50 transition-colors">
                                                            <td className="py-3 px-4 font-medium text-gray-900 border-r border-gray-200">Issues/Returns</td>
                                                            <td className="py-3 px-4 text-gray-600 border-r border-gray-200">9.00 a.m.</td>
                                                            <td className="py-3 px-4 text-gray-600">6.00 p.m.</td>
                                                        </tr>
                                                        <tr className="hover:bg-orange-50/50 transition-colors">
                                                            <td className="py-3 px-4 font-medium text-gray-900 border-r border-gray-200">Reprography</td>
                                                            <td className="py-3 px-4 text-gray-600 border-r border-gray-200">9.00 a.m.</td>
                                                            <td className="py-3 px-4 text-gray-600">6.00 p.m.</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Library Layout Section */}
                                    <section>
                                        <h2 className="text-2xl font-bold text-[#d36b36] mb-6 uppercase tracking-wide">Library Layout</h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                            {[
                                                { name: 'Reading Hall', image: '/library/reading-hall.png' },
                                                { name: 'Books Stock Area', image: '/library/book-stock.png' },
                                                { name: 'Periodical Section', image: '/library/periodical.png' },
                                                { name: 'Circulation Counter', image: '/library/circulation-counter.png' },
                                                { name: 'Discussion Rooms', image: '/library/discussion-rooms.png' },
                                                { name: 'Digital Library', image: '/library/digital-library.png' }
                                            ].map((location, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className="flex flex-col items-center group cursor-pointer hover:-translate-y-1 transition-transform"
                                                    onClick={() => setSelectedImage(location.image)}
                                                >
                                                    <div className="w-full aspect-square bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative mb-3 hover:shadow-lg transition-shadow flex items-center justify-center ring-2 ring-transparent group-hover:ring-[#d36b36]/50">
                                                        <div className="w-28 h-28 rounded-full bg-[#87ceeb]/30 flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-sm relative">
                                                            <Image
                                                                src={location.image}
                                                                alt={location.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700 text-center group-hover:text-[#d36b36] transition-colors">{location.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Library Team Section */}
                                    <section>
                                        <h2 className="text-2xl font-bold text-[#d36b36] mb-6 uppercase tracking-wide">Library Team</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {[
                                                { name: 'Dr. K.S. Shivraj', title: 'Chief Librarian, MUJ Libraries', tags: 'B.Sc., M.A. , M.L.I.S., M.Phil., PGDCA, Ph.D', email: 'karamadai.shivraj@jaipur.manipal.edu', image: '/team/Dr. K.S. Shivraj-1.jpg' },
                                                { name: 'Dr. Alka Pandy', title: 'Asst. Librarian', tags: 'B.A., L.L.B, B.LI.Sc., M.L.I.S., Ph.D', email: 'periodicals@jaipur.manipal.edu', image: '/team/Dr. Alka Pandy.jpg' },
                                                { name: 'Mr. Ramraj Choudhary', title: 'Professional Assistant (II)\nTechnical Section', tags: 'B.A., B.ED., B.LI.Sc., M.LI.Sc.', email: 'books@jaipur.manipal.edu', image: '/team/Mr. Ramraj Choudhary.jpg' },
                                                { name: 'Mr. Omprakash Verma', title: 'Professional Assistant (II)\nTechnical Section', tags: 'B.A., M.A., D.LI.Sc., B.LI.Sc., M.LI.Sc., RSCIT', email: 'books@jaipur.manipal.edu', image: '/team/Mr. Omprakash Verma (1).jpg' },
                                                { name: 'Mr. Vikas Tatiwal', title: 'Digital Library Assistant (III)', tags: 'Diploma Computer Hardware, MCA', email: 'vikas.tatiwal@jaipur.manipal.edu', image: '/team/Mr. Vikas Tatiwal.jpg' },
                                                { name: 'Mr. Dheeraj Sain', title: 'Junior Digital Library Assistant (I)', tags: 'Diploma in Php, BCA', email: 'dheeraj.sain@jaipur.manipal.edu', image: '/team/Mr. Dheeraj Sain.jpg' },
                                                { name: 'Mr. Manoj Kumawat', title: 'Junior General Duty Worker', tags: 'B.A., B.LI.Sc., M.LI.Sc.', email: '', image: '/team/Mr. Manoj Kumawat.jpg' },
                                                { name: 'Mr. Dinesh Kumar Sharma', title: 'Junior General Duty Worker', tags: 'B.Com.', email: '', image: '/team/Mr. Dinesh Kumar Sharma.jpg' },
                                                { name: 'Mr. Madan Lal Sharma', title: 'Junior General Duty Worker', tags: 'B.A.', email: '', image: '/team/Mr. Madan Lal Sharma.jpg' }
                                            ].map((member, i) => (
                                                <div key={i} className={`bg-gray-50/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all hover:-translate-y-1 ${i === 8 ? 'lg:col-span-4 sm:col-span-2 w-full max-w-sm mx-auto' : ''}`}>
                                                    <div className="w-28 h-28 rounded-full bg-[#87ceeb]/30 flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-sm relative">
                                                        {member.image ? (
                                                            <Image
                                                                src={member.image}
                                                                alt={member.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <ImageIcon className="w-8 h-8 text-[#87ceeb] opacity-70" />
                                                        )}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-[#d36b36] mb-1">{member.name}</h3>
                                                    <p className="text-sm font-medium text-gray-700 mb-2 whitespace-pre-wrap">{member.title}</p>
                                                    <p className="text-xs text-gray-500 mb-3">{member.tags}</p>
                                                    {member.email && (
                                                        <p className="text-xs font-semibold text-gray-900 mt-auto break-all">{member.email}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
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
                                <h2 className="text-2xl font-bold text-[#d36b36] mb-6 uppercase tracking-wide">Contact Us</h2>
                                <div className="bg-gray-50/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 flex flex-col space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border-2 border-white shadow-sm overflow-hidden relative">
                                            <Image 
                                                src="/team/Dr. K.S. Shivraj-1.jpg"
                                                alt="Dr. K.S. Shivraj"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Dr. K.S. Shivraj, Ph.D.</h3>
                                            <p className="text-[#d36b36] font-semibold uppercase tracking-wider text-xs">Chief Librarian</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 pt-4 border-t border-gray-200">
                                        <div className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                                                <MapPin className="w-3 h-3 text-[#d36b36]" />
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                Manipal University Jaipur | Off Jaipur-Ajmer Expressway | Post: Dehmi Kalan | Jaipur-303007 | Rajasthan | India
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded bg-orange-50 flex items-center justify-center shrink-0">
                                                <Mail className="w-3 h-3 text-[#d36b36]" />
                                            </div>
                                            <p className="text-sm">
                                                <a href="mailto:karamadai.shivraj@jaipur.manipal.edu" className="text-gray-900 font-medium hover:text-[#d36b36] transition-colors">
                                                    karamadai.shivraj@jaipur.manipal.edu
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Image Modal overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-slate-100 border border-slate-700/50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-slate-900/50 hover:bg-slate-900/80 rounded-full text-white transition-colors backdrop-blur-md"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <Image
                                src={selectedImage}
                                alt="Expanded view"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </BeamsBackground>
    );
}
