# Database Setup Instructions

## 📋 Prerequisites
Make sure you have your Supabase PostgreSQL connection string in `.env.local`:
```
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
```

## 🚀 Setup Steps

### 1. Get Your Database URL from Supabase
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Under **Connection String**, select **URI** format
4. Copy the connection string and replace `[YOUR-PASSWORD]` with your actual database password
5. Paste it in your `.env.local` file as `DATABASE_URL`

### 2. Push Schema to Database
Run this command to create all tables in your database:
```bash
npx prisma db push
```

**OR** if you want to create a migration (recommended for production):
```bash
npx prisma migrate dev --name init
```

### 3. Open Prisma Studio (Optional)
To visually manage your database:
```bash
npx prisma studio
```

## 📦 What's Been Set Up

### Database Models Created:
- **Student** - User accounts with registration numbers
- **Book** - Library book catalog
- **BorrowRecord** - Track borrowed books
- **Reservation** - Book reservation system

### Files Created:
- `prisma/schema.prisma` - Database schema
- `lib/prisma.ts` - Prisma client singleton
- `.env.local` - Environment variables (add your DATABASE_URL here)

## 🔧 Usage in Your Code

Import and use Prisma client:
```typescript
import prisma from '@/lib/prisma'

// Example: Get all students
const students = await prisma.student.findMany()

// Example: Create a new book
const book = await prisma.book.create({
  data: {
    isbn: '978-1234567890',
    title: 'Sample Book',
    author: 'John Doe',
    category: 'Fiction',
    totalCopies: 5,
    availableCopies: 5
  }
})
```

## ⚠️ Important Notes
- The Prisma client is automatically regenerated when you run `npx prisma generate`
- Use `npx prisma studio` to view and edit your database visually
- Always run migrations before deploying to production
