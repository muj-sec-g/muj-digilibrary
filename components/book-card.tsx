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
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-1">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mb-1">{author}</p>
          <p className="text-xs text-muted-foreground mb-3">{domain}</p>
          <div className="flex items-center justify-between">
            <StatusBadge
              status={available ? 'available' : 'issued'}
              label={available ? 'Available' : 'Issued'}
            />
            <Link href={`/books/${id}`}>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
