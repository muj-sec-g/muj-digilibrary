import { PrismaClient } from '@prisma/client';

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
            email: 'piyush@muj.manipal.edu',
            password: 'password123',
            firstName: 'Piyush',
            lastName: 'User',
            course: 'B.Tech',
            department: 'Computer Science',
            year: 3,
            phoneNumber: '9876543210',
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

    console.log(`✅ Seeding finished. Added 3 real books and 97 dummy books.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
