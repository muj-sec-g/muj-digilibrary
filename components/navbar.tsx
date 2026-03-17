'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Grid3X3, BookMarked, Library, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  studentName?: string;
  studentId?: string;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/books', label: 'Books', icon: Library },
  { href: '/categories', label: 'Categories', icon: Grid3X3 },
];

export function Navbar({ studentName = 'Student', studentId = '' }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">

        {/* LEFT — Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 shrink-0">
          <div className="relative w-32 h-10">
            <Image
              src="/muj-logo-white.png"
              alt="MUJ DigiLibrary"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* CENTER — Nav Links (desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                  ? 'bg-orange-100 text-orange-700 shadow-sm'
                  : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                  }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-orange-600' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT — User info + Logout (desktop) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{studentName}</p>
            {studentId && (
              <p className="text-xs text-gray-400">{studentId}</p>
            )}
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-orange-600 hover:bg-orange-50"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* MOBILE — Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-orange-100 bg-white/95 backdrop-blur-md">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-orange-600' : 'text-gray-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile user info + logout */}
          <div className="p-4 border-t border-orange-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">{studentName}</p>
              {studentId && <p className="text-xs text-gray-400">{studentId}</p>}
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-orange-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
