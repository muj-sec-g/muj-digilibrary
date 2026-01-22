import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/status-badge';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  domain: string;
  available: boolean;
}

export function BookCard({
  id,
  title,
  author,
  domain,
  available,
}: BookCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-orange-100 p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 group relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-start gap-4 relative z-10">
        <div className="w-14 h-18 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
          <BookOpen className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1 group-hover:text-orange-600 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-600 mb-1">{author}</p>
          <p className="text-xs text-orange-600 font-medium mb-3">{domain}</p>
          <div className="flex items-center justify-between">
            <StatusBadge
              status={available ? 'available' : 'issued'}
              label={available ? 'Available' : 'Issued'}
            />
            <Link href={`/books/${id}`}>
              <Button
                size="sm"
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400 transition-all"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
