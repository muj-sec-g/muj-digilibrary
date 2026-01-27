import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q');

        if (!query || query.length < 2) {
            return NextResponse.json({ suggestions: [] });
        }

        // Search for books matching the query
        const books = await prisma.book.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { author: { contains: query, mode: 'insensitive' } },
                ],
            },
            select: {
                id: true,
                title: true,
                author: true,
                category: true,
            },
            take: 5,
            orderBy: {
                title: 'asc',
            },
        });

        return NextResponse.json({ suggestions: books });

    } catch (error: any) {
        console.error('Autocomplete error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch suggestions' },
            { status: 500 }
        );
    }
}
