import { LucideIcon, Cpu, Zap, BookMarked, BookOpen, Calculator } from 'lucide-react';

interface CategoryCardProps {
    name: string;
    count: number;
    isActive: boolean;
    onClick: () => void;
}

// Map category names to icons
const categoryIcons: Record<string, LucideIcon> = {
    'Computer Science': Cpu,
    'Physics': Zap,
    'Literature': BookMarked,
    'History': BookOpen,
    'Mathematics': Calculator,
};

export function CategoryCard({ name, count, isActive, onClick }: CategoryCardProps) {
    const Icon = categoryIcons[name] || BookOpen;

    return (
        <button
            onClick={onClick}
            className={`
        group relative p-5 rounded-lg transition-all duration-200
        ${isActive
                    ? 'bg-orange-600 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 shadow hover:shadow-md'
                }
        border ${isActive ? 'border-orange-600' : 'border-gray-200 hover:border-orange-300'}
      `}
        >
            <div className="flex flex-col items-center gap-2">
                <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-orange-600'}`} />
                <div className="text-center">
                    <div className="font-semibold text-sm">
                        {name}
                    </div>
                    <div className={`text-xs mt-1 ${isActive ? 'text-orange-100' : 'text-gray-500'}`}>
                        {count} {count === 1 ? 'book' : 'books'}
                    </div>
                </div>
            </div>
        </button>
    );
}
