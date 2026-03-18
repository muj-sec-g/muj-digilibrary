import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get('studentId');

        if (!studentId) {
            return NextResponse.json(
                { error: 'Student ID is required' },
                { status: 400 }
            );
        }

        // Fetch all borrow records for this student including the book details
        const borrowRecords = await prisma.borrowRecord.findMany({
            where: {
                studentId: studentId,
            },
            include: {
                book: true,
            },
            orderBy: {
                dueDate: 'asc',
            },
        });

        // Format the records for the frontend
        const issuedBooks = borrowRecords.map((record) => {
            const today = new Date();
            const dueDate = new Date(record.dueDate);

            // Calculate days remaining (or overdue if negative)
            // Strip time to just compare dates accurately
            const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

            const diffTime = dueDateOnly.getTime() - todayDateOnly.getTime();
            const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return {
                id: record.id,
                title: record.book.title,
                author: record.book.author,
                issueDate: new Date(record.borrowDate).toISOString().split('T')[0],
                dueDate: dueDate.toISOString().split('T')[0],
                daysRemaining: record.status === 'RETURNED' ? 0 : daysRemaining,
                penalty: record.fineAmount,
                status: record.status,
            };
        });

        return NextResponse.json({
            success: true,
            issuedBooks,
            summary: {
                totalActive: issuedBooks.filter(b => b.status === 'BORROWED' || b.status === 'OVERDUE').length,
                totalOverdue: issuedBooks.filter(b => b.status === 'OVERDUE' || b.daysRemaining < 0).length,
                totalFine: issuedBooks.reduce((sum, b) => sum + (b.penalty || 0), 0)
            }
        });

    } catch (error: any) {
        console.error('Fetch dashboard error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard data.' },
            { status: 500 }
        );
    }
}
