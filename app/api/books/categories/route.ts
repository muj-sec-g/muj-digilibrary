import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Get unique categories with book counts
        const categories = await prisma.book.groupBy({
            by: ['category'],
            _count: {
                category: true,
            },
            orderBy: {
                category: 'asc',
            },
        });

        const result = categories.map(cat => ({
            name: cat.category,
            count: cat._count.category,
        }));

        return NextResponse.json({ categories: result });

    } catch (error: any) {
        console.error('Categories error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}
