'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { BeamsBackground } from '@/components/ui/beams-background';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';


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
                                                'Reading Hall',
                                                'Books Stock Area',
                                                'Periodical Section',
                                                'Circulation Counter',
                                                'Discussion Rooms',
                                                'Digital Library'
                                            ].map((location) => (
                                                <div key={location} className="flex flex-col items-center group cursor-pointer">
                                                    <div className="w-full aspect-square bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative mb-3 hover:shadow-md transition-shadow flex items-center justify-center">
                                                        {/* Placeholder for actual images */}
                                                        {/* Your Real Image! */}
                                                        <div className="w-28 h-28 rounded-full bg-[#87ceeb]/30 flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-sm">
                                                            <Image
                                                                src={"/team/reading-hall.jpg"} // Example path like "/team/dr.-alka-pandy.jpg"
                                                                alt={"reading-hall"}
                                                                width={112}
                                                                height={112}
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>

                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700 text-center group-hover:text-[#d36b36] transition-colors">{location}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Library Team Section */}
                                    <section>
                                        <h2 className="text-2xl font-bold text-[#d36b36] mb-6 uppercase tracking-wide">Library Team</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {[
                                                { name: 'Dr. K.S. Shivraj', title: 'Chief Librarian, MUJ Libraries', tags: 'B.Sc., M.A. , M.L.I.S., M.Phil., PGDCA, Ph.D', email: 'karamadai.shivraj@jaipur.manipal.edu' },
                                                { name: 'Dr. Alka Pandy', title: 'Asst. Librarian', tags: 'B.A., L.L.B, B.LI.Sc., M.L.I.S., Ph.D', email: 'periodicals@jaipur.manipal.edu' },
                                                { name: 'Mr. Ramraj Choudhary', title: 'Professional Assistant (II)\nTechnical Section', tags: 'B.A., B.ED., B.LI.Sc., M.LI.Sc.', email: 'books@jaipur.manipal.edu' },
                                                { name: 'Mr. Omprakash Verma', title: 'Professional Assistant (II)\nTechnical Section', tags: 'B.A., M.A., D.LI.Sc., B.LI.Sc., M.LI.Sc., RSCIT', email: 'books@jaipur.manipal.edu' },
                                                { name: 'Mr. Vikas Tatiwal', title: 'Digital Library Assistant (III)', tags: 'Diploma Computer Hardware, MCA', email: 'vikas.tatiwal@jaipur.manipal.edu' },
                                                { name: 'Mr. Dheeraj Sain', title: 'Junior Digital Library Assistant (I)', tags: 'Diploma in Php, BCA', email: 'dheeraj.sain@jaipur.manipal.edu' },
                                                { name: 'Mr. Manoj Kumawat', title: 'Junior General Duty Worker', tags: 'B.A., B.LI.Sc., M.LI.Sc.', email: '' },
                                                { name: 'Mr. Dinesh Kumar Sharma', title: 'Junior General Duty Worker', tags: 'B.Com.', email: '' },
                                                { name: 'Mr. Madan Lal Sharma', title: 'Junior General Duty Worker', tags: 'B.A.', email: '' }
                                            ].map((member, i) => (
                                                <div key={i} className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all hover:-translate-y-1">
                                                    <div className="w-28 h-28 rounded-full bg-[#87ceeb]/30 flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-sm">
                                                        <ImageIcon className="w-8 h-8 text-[#87ceeb] opacity-70" />
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
