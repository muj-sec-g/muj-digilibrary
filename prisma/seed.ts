import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env.local
config({ path: '.env.local' });

const prisma = new PrismaClient();

const categories = ['Computer Science', 'Physics', 'Literature', 'History', 'Mathematics'];
const publishers = ['Pearson', 'McGraw Hill', 'Penguin Random House', 'Springer', 'Wiley'];
const locations = ['Rack A-1', 'Rack B-12', 'Rack C-05', 'Rack D-09', 'Rack E-02'];

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Create the Student (You)
    const student = await prisma.student.upsert({
        where: { regNumber: '219301001' },
        update: {},
        create: {
            regNumber: '219301001',
            email: 'piyush.23fe10cai00225@muj.manipal.edu',
            firstName: 'Piyush',
            lastName: 'User',
            course: 'B.Tech',
            department: 'Computer Science',
            year: 3,
            phoneNumber: '9876543210',
            validUntil: 2027, // 2023 batch + 4 years
        },
    });

    // 2. DEFINE THE 3 REAL BOOKS
    const realBooks = [
        {
            isbn: "978-0132350884",
            title: "Clean Code",
            author: "Robert C. Martin",
            category: "Computer Science",
            publisher: "Prentice Hall",
            totalCopies: 5,
            availableCopies: 5,
            location: "Rack A-12",
            coverImage: "https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg"
        },
        {
            isbn: "978-0262033848",
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            category: "Computer Science",
            publisher: "MIT Press",
            totalCopies: 3,
            availableCopies: 2,
            location: "Rack B-05",
            coverImage: "https://m.media-amazon.com/images/I/41SNoh5ZhOL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg"
        },
        {
            isbn: "978-1612680194",
            title: "Rich Dad Poor Dad",
            author: "Robert Kiyosaki",
            category: "Finance",
            publisher: "Plata Publishing",
            totalCopies: 10,
            availableCopies: 8,
            location: "Rack F-01",
            coverImage: "https://m.media-amazon.com/images/I/81bsw6fnUiL._SY466_.jpg"
        }
    ];

    // Insert Real Books
    for (const book of realBooks) {
        await prisma.book.upsert({
            where: { isbn: book.isbn },
            update: {},
            create: book,
        });
    }

    // 3. GENERATE 97 RANDOM BOOKS (To reach 100)
    const randomBooks = [];
    for (let i = 4; i <= 100; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const totalCopies = Math.floor(Math.random() * 10) + 1;
        const availableCopies = Math.floor(Math.random() * totalCopies); // Some copies borrowed

        randomBooks.push({
            isbn: `978-FAKE-ISBN-${i}`,
            title: `${category} Advanced Concepts Vol. ${i}`,
            author: `Author Number ${i}`,
            category: category,
            publisher: publishers[Math.floor(Math.random() * publishers.length)],
            totalCopies: totalCopies,
            availableCopies: availableCopies,
            location: locations[Math.floor(Math.random() * locations.length)],
            description: "This is a dummy description for the purpose of testing the UI.",
            coverImage: `https://placehold.co/400x600/orange/white?text=Book+${i}`
        });
    }

    for (const book of randomBooks) {
        await prisma.book.upsert({
            where: { isbn: book.isbn },
            update: {},
            create: book,
        });
    }

    // 4. CREATE DEMO ACCOUNTS AND LENDING HISTORY
    const demoAccounts = [
        { email: 'demo1@muj.manipal.edu', regNumber: '24DEMO001', firstName: 'Alice', lastName: 'Admin' },
        { email: 'demo2@muj.manipal.edu', regNumber: '24DEMO002', firstName: 'Bob', lastName: 'Bookworm' },
        { email: 'demo3@muj.manipal.edu', regNumber: '24DEMO003', firstName: 'Charlie', lastName: 'Chapter' },
        { email: 'demo4@muj.manipal.edu', regNumber: '24DEMO004', firstName: 'Diana', lastName: 'Dewey' },
        { email: 'demo5@muj.manipal.edu', regNumber: '24DEMO005', firstName: 'Ethan', lastName: 'Edition' },
    ];

    const demoStudents = [];
    for (const demo of demoAccounts) {
        const student = await prisma.student.upsert({
            where: { email: demo.email },
            update: {},
            create: {
                ...demo,
                course: 'B.Tech',
                department: 'Information Technology',
                year: 2,
                validUntil: 2028,
            }
        });
        demoStudents.push(student);
    }

    // Get a few books to assign to them
    const allBooks = await prisma.book.findMany({ take: 10 });

    // Clear existing borrow records for demo accounts to avoid clutter on re-seed
    await prisma.borrowRecord.deleteMany({
        where: { studentId: { in: demoStudents.map(s => s.id) } }
    });

    const now = new Date();
    const futureDate = new Date(); futureDate.setDate(now.getDate() + 7);
    const pastDate = new Date(); pastDate.setDate(now.getDate() - 14);
    const veryPastDate = new Date(); veryPastDate.setDate(now.getDate() - 20);

    // Give Alice 3 books (1 active, 2 overdue)
    await prisma.borrowRecord.create({ data: { studentId: demoStudents[0].id, bookId: allBooks[0].id, borrowDate: now, dueDate: futureDate, status: 'BORROWED' } });
    await prisma.borrowRecord.create({ data: { studentId: demoStudents[0].id, bookId: allBooks[1].id, borrowDate: veryPastDate, dueDate: pastDate, status: 'OVERDUE', fineAmount: 30 } });
    await prisma.borrowRecord.create({ data: { studentId: demoStudents[0].id, bookId: allBooks[2].id, borrowDate: veryPastDate, dueDate: pastDate, status: 'OVERDUE', fineAmount: 15 } });

    // Give Bob 1 active book
    await prisma.borrowRecord.create({ data: { studentId: demoStudents[1].id, bookId: allBooks[3].id, borrowDate: now, dueDate: futureDate, status: 'BORROWED' } });

    // Give Charlie 5 active books (max limit usually)
    for (let i = 4; i < 9; i++) {
        await prisma.borrowRecord.create({ data: { studentId: demoStudents[2].id, bookId: allBooks[i].id, borrowDate: now, dueDate: futureDate, status: 'BORROWED' } });
    }

    // Diana has NO books (to test empty state)

    // Ethan has 1 extremely overdue book
    await prisma.borrowRecord.create({ data: { studentId: demoStudents[4].id, bookId: allBooks[9].id, borrowDate: new Date('2023-01-01'), dueDate: new Date('2023-01-15'), status: 'OVERDUE', fineAmount: 1500 } });

    console.log(`✅ Seeding finished. Added 3 real books, 97 dummy books, and 5 demo accounts.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
