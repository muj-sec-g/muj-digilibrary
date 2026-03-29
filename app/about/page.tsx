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
                    <div className="flex flex-wrap items-center justify-center gap-3 pb-4">
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
                                                The Central Library of MUJ has a spacious area of <span className="font-bold text-[#d36b36]">2319 Sq.m.</span> that exudes peaceful learning environment. The Library is fully air-conditioned with the <span className="font-bold text-[#d36b36]">seating capacity of 700</span>. The central Library employs <span className="font-bold text-[#d36b36]">RFID technology</span> for access control, automatic issue and return of library documents, and stock verification of library holdings. The Central Library has a collection of <span className="font-bold text-[#d36b36]">57800 books</span> with <span className="font-bold text-[#d36b36]">14500 titles</span> on various subjects and over <span className="font-bold text-[#d36b36]">3000 reference books</span>. It subscribes about <span className="font-bold text-[#d36b36]">400 national and international print journals</span> and holds over <span className="font-bold text-[#d36b36]">450 project reports</span> and <span className="font-bold text-[#d36b36]">95 Ph.D Thesis</span>. The Digital Library has subscribed <span className="font-bold text-[#d36b36]">18 E-Resources</span> include <span className="font-bold text-[#d36b36]">17800 e-journals</span>, manuals, reports, standards, and other information from ASME, IEL Online, Science Direct, Taylor & Francis, EBSCO Business Source Elite, EBSCO Art & Architecture, EBSCO Hospitality & Tourism Complete, EBSCO Academic Search Elite, EPW India Time Series, JSTOR, Manupatra, Lexis India, Supreme Court Cases, and AIR Online.
                                            </p>
                                            <p>
                                                The Digital library holds nearly <span className="font-bold text-[#d36b36]">2500 CDs and DVDs</span>. The Central Library has established an <span className="font-bold text-[#d36b36]">Institutional Repository using Dspace</span>: A Digital Library Software. The Central Library provides <span className="font-bold text-[#d36b36]">off campus access</span> to all of its subscribed contents to the students, faculty, and research scholars through username and password using <span className="font-bold text-[#d36b36]">knimbus software</span>. The Central Library extends research support to the researchers and faculty by providing <span className="font-bold text-[#d36b36]">Turnitin: A Plagiarism checking software</span>.
                                            </p>
                                            <p>
                                                The Central Library is a Member of <span className="font-bold text-[#d36b36]">DELNET, INFLIBNET, e-ShodhSindhu, ShodhGanga, British Council Library</span>, Current Science, Indian Academy of Social Sciences, and American Library.
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
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
                                {/* Library Collections Header */}
                                <section>
                                    <h2 className="text-xl font-semibold text-[#d36b36] mb-4 uppercase tracking-wider border-b border-orange-100 pb-2">Library Collections</h2>
                                    
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">BOOKS</h3>
                                    <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="py-4 px-6 font-semibold text-gray-700">Faculty</th>
                                                    <th className="py-4 px-6 font-semibold text-gray-700 text-center">No. of Titles</th>
                                                    <th className="py-4 px-6 font-semibold text-gray-700 text-center">No. of Volumes</th>
                                                    <th className="py-4 px-6 font-semibold text-gray-700 text-center">E-Books</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 bg-white">
                                                {[
                                                    { faculty: 'Faculty of Engineering', titles: '9500', volumes: '35608', ebooks: '7693' },
                                                    { faculty: 'Faculty of Design', titles: '3604', volumes: '5435', ebooks: '1102' },
                                                    { faculty: 'Faculty of Management', titles: '3337', volumes: '9086', ebooks: '3601' },
                                                    { faculty: 'Faculty of Arts & Law', titles: '2064', volumes: '9270', ebooks: '76602' },
                                                    { faculty: 'Faculty of Science', titles: '1213', volumes: '3115', ebooks: '10309' },
                                                ].map((row, i) => (
                                                    <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                                                        <td className="py-4 px-6 font-medium text-gray-900">{row.faculty}</td>
                                                        <td className="py-4 px-6 text-center text-gray-600 font-mono">{row.titles}</td>
                                                        <td className="py-4 px-6 text-center text-gray-600 font-mono">{row.volumes}</td>
                                                        <td className="py-4 px-6 text-center text-gray-600 font-mono">{row.ebooks}</td>
                                                    </tr>
                                                ))}
                                                <tr className="bg-gray-50/80 font-bold text-gray-900 border-t-2 border-gray-200">
                                                    <td className="py-4 px-6 text-right">Total</td>
                                                    <td className="py-4 px-6 text-center font-mono">19718</td>
                                                    <td className="py-4 px-6 text-center font-mono">62514</td>
                                                    <td className="py-4 px-6 text-center font-mono">99307</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                                {/* Print Periodicals Section */}
                                <section>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">PRINT PERIODICALS</h3>
                                    <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="py-4 px-6 font-semibold text-gray-700 w-20">S.No.</th>
                                                    <th className="py-4 px-6 font-semibold text-gray-700">Faculty</th>
                                                    <th className="py-4 px-6 font-semibold text-gray-700 text-center">List of Print Journals</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 bg-white">
                                                {[
                                                    'Faculty of Engineering',
                                                    'Faculty of Science',
                                                    'Faculty of Management',
                                                    'Faculty of Design',
                                                    'Faculty of Law'
                                                ].map((faculty, i) => (
                                                    <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                                                        <td className="py-4 px-6 text-gray-500 font-mono">{i + 1}</td>
                                                        <td className="py-4 px-6 font-medium text-gray-900">{faculty}</td>
                                                        <td className="py-4 px-6 text-center">
                                                            <button className="text-[#d36b36] font-semibold hover:underline text-xs tracking-wider uppercase">Click Here</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                                {/* E-Resources Section */}
                                <section className="space-y-8">
                                    <h2 className="text-xl font-semibold text-[#d36b36] mb-8 uppercase tracking-wider border-b border-orange-100 pb-2">E-RESOURCES</h2>
                                    
                                    <div className="grid grid-cols-1 gap-8">
                                        {[
                                            { 
                                                name: 'ASME', 
                                                desc: 'The American Society of Mechanical Engineers (ASME) is an American professional association that, in its own words, promotes the art, science, and practice of multidisciplinary engineering and allied sciences around the globe via continuing education, training and professional development, codes and standards, research, conferences and publications, government relations, and other forms of outreach.', 
                                                image: '/resources/asme.png' 
                                            },
                                            { 
                                                name: 'IEEE', 
                                                desc: 'The Institute of Electrical and Electronics Engineers (IEEE) is a professional association for electronic engineering and electrical engineering (and associated disciplines) with its corporate office in New York City and its operations center in Piscataway, New Jersey. It offers journals in Electrical, Electronics, Computer Science and IT.', 
                                                image: '/resources/ieee.png' 
                                            },
                                            { 
                                                name: 'ScienceDirect', 
                                                desc: 'ScienceDirect is a website which provides subscription-based access to a large database of Engineering and Computer Sciences. It hosts over 12 million pieces of content from 3,500 academic journals and 34,000 e-books.', 
                                                image: '/resources/sciencedirect.png' 
                                            },
                                            { 
                                                name: 'Taylor & Francis', 
                                                desc: 'Taylor & Francis Group is an international company originating in England that publishes books and academic journals. It is a division of Informa plc, a United Kingdom-based publisher and conference company. It offers journals in Engineering, Social Sciences, Management and allied.', 
                                                image: '/resources/tandf.png' 
                                            },
                                            { 
                                                name: 'EBSCO', 
                                                desc: 'EBSCO provides products and services to libraries of very many types around the world. Its products include EBSCONET, a complete e-resource management system, and EBSCOhost, which supplies a fee-based online research service with 375 full-text databases, a collection of 600,000-plus ebooks, subject indexes, point-of-care medical references, and an array of historical digital archives.', 
                                                image: '/resources/ebsco.png' 
                                            },
                                            { 
                                                name: 'JSTOR', 
                                                desc: 'JSTOR provides access to more than 12 million academic journal articles, books, and primary sources in 75 disciplines JSTOR is a digital library of academic journals, books, and primary sources. We help you explore a wide range of scholarly content through a powerful research and teaching platform. We collaborate with the academic community to help libraries connect students and faculty to vital content while lowering costs and increasing shelf space, provide independent researchers with free.', 
                                                image: '/resources/jstor.png' 
                                            },
                                            { 
                                                name: 'ProQuest', 
                                                desc: 'ProQuest provides applications and products for libraries. Its resources and tools support research and learning, publishing and dissemination, and the acquisition, management and discovery of library collections.', 
                                                image: '/resources/proquest.png' 
                                            },
                                            { 
                                                name: 'Manupatra', 
                                                desc: "India's premier online research service for the legal community. Manupatra enables legal professionals to retrieve cases, statutes, and other documents from Manupatra's vast library of legal and business materials.", 
                                                image: '/resources/manupatra.png' 
                                            },
                                            { 
                                                name: 'IEEE Xplore', 
                                                desc: 'IEEE Xplore digital library is a research database for discovery and access to journal articles, conference proceedings, technical standards, and related materials on computer science, electrical engineering and electronics, and allied fields.', 
                                                image: '/resources/ieee-xplore.png' 
                                            },
                                            { 
                                                name: 'Lexis India', 
                                                desc: 'Authoritative Content – Drawing from our years of publishing, technology and legal research experience, Lexis®India is a trusted legal information source used by some of the prestigious law firms, legal professionals and leading law schools throughout India.', 
                                                image: '/resources/lexis.png' 
                                            },
                                            { 
                                                name: 'Corporate Law Adviser', 
                                                desc: 'A law graduate. Mr Bhargava is the founder of the journal "Corporate Law Adviser" which started its journey in the year 1989. He has to his credit in the capacity of Author / Editor, several books in Corporate Laws, Business Laws and Direct Taxes.', 
                                                image: '/resources/cla.png' 
                                            },
                                            { 
                                                name: 'AIR Online', 
                                                desc: 'The All India Reporter, as an organization can take pride with all humility, as being a pioneer in the field of law publications and for revolutionizing the law publication sector. Apart from conceiving the first and only pan-India Law Reports publication, we have many Firsts to our credit.', 
                                                image: '/resources/air.png' 
                                            },
                                            { 
                                                name: 'Turnitin', 
                                                desc: 'Turnitin is an American commercial, Internet-based plagiarism detection service which is a subsidiary of Advance.', 
                                                image: '/resources/turnitin.png' 
                                            },
                                            { 
                                                name: 'Academic Complete', 
                                                desc: 'Academic Complete is ProQuest’s award-winning subscription database trusted by libraries around the world. For more than a decade, students have relied on Academic Completes unlimited access, multidisciplinary coverage, and powerful research tools.', 
                                                image: '/resources/academic-complete.png' 
                                            }
                                        ].map((res, i) => (
                                            <div key={i} className="bg-gray-50/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-orange-100 group">
                                                <div className="flex-1 space-y-4">
                                                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#d36b36] transition-colors">{res.name}</h4>
                                                    <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                                        {res.desc}
                                                    </p>
                                                    <button className="px-6 py-2 bg-[#d36b36] text-white rounded-lg text-sm font-semibold hover:bg-[#b85a2d] transition-colors shadow-sm">
                                                        Click Here
                                                    </button>
                                                </div>
                                                <div className="w-full md:w-48 aspect-square bg-white rounded-xl shadow-inner flex items-center justify-center p-4 border border-gray-100 group-hover:scale-105 transition-transform shrink-0 relative overflow-hidden">
                                                    {/* Generic Icon / Brand Color for now until images are uploaded */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-white -z-10" />
                                                    <Image 
                                                        src={res.image}
                                                        alt={res.name}
                                                        width={120}
                                                        height={120}
                                                        className="object-contain"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                            const parent = target.parentElement;
                                                            if (parent) {
                                                                const fallback = document.createElement('div');
                                                                fallback.className = 'text-2xl font-black text-[#d36b36]/20 uppercase';
                                                                fallback.innerText = res.name.substring(0, 2);
                                                                parent.appendChild(fallback);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Open Access E-Resources Section */}
                                <section className="space-y-12">
                                    <h2 className="text-xl font-semibold text-[#d36b36] mb-8 uppercase tracking-wider border-b border-orange-100 pb-2">Open Access E-Resources</h2>

                                    {[
                                        {
                                            title: "Online Courses",
                                            data: [
                                                { name: "SWAYAM Online Courses", url: "https://swayam.gov.in/" },
                                                { name: "NPTEL", url: "https://nptel.ac.in/" },
                                                { name: "Harvard online courses", url: "https://online-learning.harvard.edu/" },
                                                { name: "MIT Open Courseware", url: "https://ocw.mit.edu/index.htm" },
                                                { name: "e-PG Pathshala", url: "https://epgp.inflibnet.ac.in/" },
                                                { name: "e-Content courseware in UG subjects", url: "http://cec.nic.in/cec/" },
                                                { name: "Infoport", url: "https://infoport.inflibnet.ac.in/" },
                                                { name: "UG/PG MOOCs", url: "http://ugcmoocs.inflibnet.ac.in/ugcmoocs/" },
                                                { name: "IEEE online courses", url: "https://ieeexplore.ieee.org/" },
                                            ]
                                        },
                                        {
                                            title: "E-Journals",
                                            data: [
                                                { name: "Directory of Open Access Journals", url: "https://doaj.org/" },
                                                { name: "Cambridge University Press", url: "https://www.cambridge.org/core/services/open-research/open-access" },
                                                { name: "Science Direct Open Access", url: "https://www.sciencedirect.com/browse/journals-and-books?accessType=openAccess" },
                                                { name: "Springer Open Journals", url: "https://www.springeropen.com/journals-a-z" },
                                                { name: "Taylor & Francis Open Access", url: "https://www.tandfonline.com/openaccess" },
                                                { name: "Oxford Open", url: "https://academic.oup.com/journals/pages/open_access" },
                                                { name: "e-Shodh Sindhu", url: "https://ess.inflibnet.ac.in/" },
                                                { name: "Wiley Open Access Journals", url: "https://authorservices.wiley.com/open-research/open-access/browse-journals.html" },
                                            ]
                                        },
                                        {
                                            title: "E-Books",
                                            data: [
                                                { name: "E-Books", url: "http://pdfdrive.net/" },
                                                { name: "Directory of Open Access Books", url: "https://www.doabooks.org/" },
                                                { name: "Springer e-books", url: "https://www.springeropen.com/books" },
                                            ]
                                        },
                                        {
                                            title: "Digital Library",
                                            data: [
                                                { name: "National Digital Library", url: "https://ndl.iitkgp.ac.in/" },
                                                { name: "National Knowledge Network", url: "http://nkn.gov.in/en" },
                                                { name: "Talks to Teacher", url: "https://www.ted.com/playlists/182/talks_from_inspiring_teachers" },
                                                { name: "A-VIEW", url: "http://aview.in/" },
                                                { name: "Virtual Labs", url: "http://www.vlab.co.in/" },
                                                { name: "FOSSEE", url: "https://fossee.in/" },
                                                { name: "Spoken Tutorial", url: "https://spoken-tutorial.org/" },
                                                { name: "e-Yantra", url: "https://www.e-yantra.org/" },
                                                { name: "Oscar++", url: "https://www.it.iitb.ac.in/oscar/" },
                                                { name: "E-Kalpa", url: "https://icar.org.in/content/e-kalpa" },
                                                { name: "Open Knowledge Repository - World Bank", url: "https://openknowledge.worldbank.org/" },
                                                { name: "SWAYAMPRABHA", url: "https://www.swayamprabha.gov.in/" },
                                                { name: "Vidwan", url: "https://vidwan.inflibnet.ac.in/" },
                                                { name: "SNLTR", url: "https://nltr.org/" },
                                                { name: "ILOSTAT", url: "https://www.ilo.org/" },
                                                { name: "Project Euclid", url: "https://projecteuclid.org/librarians/lib_oa" },
                                                { name: "AidData", url: "https://www.aiddata.org/" },
                                                { name: "Legal Information", url: "http://www.commonlii.org/resources/221.html" },
                                                { name: "The OAPEN Foundation", url: "https://www.oapen.org/content/" },
                                                { name: "PubMed Central (PMC)", url: "https://www.ncbi.nlm.nih.gov/pmc/" },
                                                { name: "Project Gutenberg", url: "https://www.dev.gutenberg.org/" },
                                                { name: "High Wire", url: "https://www.highwirepress.com/" },
                                                { name: "AGRIS", url: "http://agris.fao.org/agris-search/index.do" },
                                                { name: "Southern Connecticut State University", url: "https://libguides.southernct.edu/openaccess" },
                                                { name: "LibriVox - Audio Books", url: "https://librivox.org/" },
                                            ]
                                        },
                                        {
                                            title: "Theses and Dissertations",
                                            data: [
                                                { name: "E-Shodhganga - Indian Theses", url: "https://shodhganga.inflibnet.ac.in/" },
                                                { name: "Networked Digital Library of Theses and Dissertations (NDLTD)", url: "http://search.ndltd.org/" },
                                                { name: "Open Access Thesis & Dissertations", url: "https://oatd.org/" },
                                            ]
                                        },
                                        {
                                            title: "Newspapers",
                                            data: [
                                                { name: "Newspapers", url: "https://www.pressreader.com/catalog/english" },
                                            ]
                                        }
                                    ].map((section, sidx) => (
                                        <div key={sidx} className="space-y-4">
                                            <h3 className="text-xl font-bold text-gray-900 border-l-4 border-[#d36b36] pl-4">{section.title}</h3>
                                            <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
                                                <table className="w-full text-sm text-left">
                                                    <thead className="bg-gray-50 border-b border-gray-200">
                                                        <tr>
                                                            <th className="py-3 px-6 font-semibold text-gray-700 w-16 text-center">S.No.</th>
                                                            <th className="py-3 px-6 font-semibold text-gray-700">Source Name</th>
                                                            <th className="py-3 px-6 font-semibold text-gray-700">Access URL</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {section.data.map((item, idx) => (
                                                            <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                                                                <td className="py-3 px-6 text-gray-500 font-mono text-center">{idx + 1}</td>
                                                                <td className="py-3 px-6 font-medium text-gray-900">{item.name}</td>
                                                                <td className="py-3 px-6">
                                                                    <a 
                                                                        href={item.url} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="text-[#d36b36] hover:text-[#b85a2d] hover:underline transition-colors break-all font-mono text-xs flex items-center gap-2"
                                                                    >
                                                                        {item.url}
                                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                        </svg>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </section>
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
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
                                <h2 className="text-2xl font-bold text-[#d36b36] mb-6 uppercase tracking-wide">Contact Us</h2>
                                <div className="bg-gray-50/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center space-y-4 max-w-2xl w-full mx-auto shadow-sm">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border-4 border-white shadow-md overflow-hidden relative transition-transform hover:scale-105 duration-300">
                                            <Image 
                                                src="/team/Dr. K.S. Shivraj-1.jpg"
                                                alt="Dr. K.S. Shivraj"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Dr. K.S. Shivraj, Ph.D.</h3>
                                            <p className="text-[#d36b36] font-bold uppercase tracking-[0.2em] text-xs mt-1">Chief Librarian</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4 pt-6 border-t border-gray-200 w-full">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mb-1">
                                                <MapPin className="w-4 h-4 text-[#d36b36]" />
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                                                Manipal University Jaipur | Off Jaipur-Ajmer Expressway | Post: Dehmi Kalan | Jaipur-303007 | Rajasthan | India
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mb-1">
                                                <Mail className="w-4 h-4 text-[#d36b36]" />
                                            </div>
                                            <p className="text-sm">
                                                <a href="mailto:karamadai.shivraj@jaipur.manipal.edu" className="text-lg font-semibold text-gray-900 hover:text-[#d36b36] transition-colors underline decoration-[#d36b36]/30 underline-offset-4">
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
