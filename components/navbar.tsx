'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  studentName?: string;
  studentId?: string;
}

export function Navbar({ studentName = 'John Doe', studentId = 'CS2024001' }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-foreground">{studentName}</h2>
        <span className="text-sm text-muted-foreground">Roll: {studentId}</span>
      </div>

      <Button
        onClick={handleLogout}
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </header>
  );
}
