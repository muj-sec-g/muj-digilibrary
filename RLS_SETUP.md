# Row Level Security (RLS) Setup Guide

## ⚠️ Security Warning
Your Supabase database tables currently have RLS disabled, which means they are publicly accessible. This is a **critical security issue** that needs to be fixed immediately.

## 🔒 What is Row Level Security?
Row Level Security (RLS) is a PostgreSQL feature that allows you to control which rows users can access in your database tables. Without RLS, anyone with your database URL can read, modify, or delete all data.

## 🚀 How to Enable RLS

### Option 1: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **Database** → **Tables**
3. For each table (`Student`, `Book`, `BorrowRecord`, `Reservation`):
   - Click on the table
   - Click **"Enable RLS"** button
   - Add appropriate policies

### Option 2: Using SQL Script
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `prisma/enable-rls.sql`
4. Paste and run the SQL script
5. Verify that RLS is enabled for all tables

### Option 3: Using Prisma (Not Recommended)
Prisma doesn't directly support RLS policies. You'll need to use raw SQL queries.

## 📋 Policies Created

The `enable-rls.sql` script creates the following policies:

### Student Table
- ✅ Authenticated users can read all students
- ✅ Users can update their own student record (matched by email)

### Book Table
- ✅ Everyone (authenticated and anonymous) can read books
- ❌ Only admins can create/update/delete books (to be implemented)

### BorrowRecord Table
- ✅ Users can only read their own borrow records
- ✅ Users can create borrow records for themselves
- ❌ Only admins can update/delete records (to be implemented)

### Reservation Table
- ✅ Users can only read their own reservations
- ✅ Users can create reservations for themselves
- ❌ Only admins can update/delete reservations (to be implemented)

## ⚙️ Current Limitations

**Important:** The current policies assume you're using Supabase Auth. Since you're using custom OTP authentication, you'll need to:

1. **Either:** Integrate Supabase Auth with your OTP system
2. **Or:** Modify the policies to work with your custom authentication

### For Custom Auth Integration
You'll need to:
- Store session tokens in Supabase Auth after OTP verification
- Use `auth.uid()` or `auth.jwt()` in policies
- Or use service role key for server-side operations (bypasses RLS)

## 🔧 Using Service Role Key (Temporary Solution)

For development, you can use the Supabase service role key which bypasses RLS:

1. Get your service role key from Supabase dashboard
2. Add to `.env.local`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Use it in server-side API routes to bypass RLS

**⚠️ Warning:** Never expose the service role key to the client!

## 📝 Next Steps

1. ✅ Run the `enable-rls.sql` script in Supabase SQL Editor
2. ✅ Verify RLS is enabled in Supabase dashboard
3. ⏳ Decide on authentication strategy:
   - Integrate Supabase Auth with OTP
   - Or use service role key for all server operations
4. ⏳ Add admin/librarian policies for management operations
5. ⏳ Test all API routes to ensure they work with RLS enabled

## 🔍 Verifying RLS is Enabled

Run this query in Supabase SQL Editor:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

All tables should show `rowsecurity = true`.

## 📚 Resources
- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
