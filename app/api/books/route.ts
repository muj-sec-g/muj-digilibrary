import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search');
        const category = searchParams.get('category');

        // Build where clause for Prisma query
        const where: any = {};

        // Add search filter (title, author, or ISBN)
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { author: { contains: search, mode: 'insensitive' } },
                { isbn: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Add category filter
        if (category && category !== 'All') {
            where.category = category;
        }

        // Fetch books from database
        const books = await prisma.book.findMany({
            where,
            select: {
                id: true,
                isbn: true,
                title: true,
                author: true,
                category: true,
                availableCopies: true,
                totalCopies: true,
                coverImage: true,
                description: true,
            },
            orderBy: {
                title: 'asc',
            },
        });

        return NextResponse.json({
            success: true,
            books,
            count: books.length,
        });

    } catch (error: any) {
        console.error('Fetch books error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch books. Please try again.' },
            { status: 500 }
        );
    }
}
