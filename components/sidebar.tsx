'use client';

import Link from 'next/link';
import Image from 'next/image'; // <--- Added Image import
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, BookMarked } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  // Simple helper to check if link is active
  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/categories', label: 'Categories', icon: Grid3X3 },
    { href: '/issued-books', label: 'My Books', icon: BookMarked },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col sticky top-0 border-r border-orange-100 bg-gradient-to-b from-orange-50/80 via-white to-white">

      {/* --- LOGO HEADER --- */}
      <div className="p-6 border-b border-orange-100">
        <div className="relative w-50 h-20">
          <Image
            src="/muj-logo-white.png"
            alt="Manipal University Jaipur"
            fill
            className="object-contain "
            priority
          />
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${active
                      ? 'bg-orange-100 text-orange-700 shadow-sm' // Active State
                      : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600' // Inactive State
                    }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-500'}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* --- FOOTER --- */}
      <div className="p-6 border-t border-orange-100 bg-white/50">
        <p className="text-xs text-gray-400 font-medium">
          © 2026 MUJ DigiLibrary
        </p>
      </div>
    </aside>
  );
}