-- Enable Row Level Security (RLS) on all tables
-- This fixes the Supabase security warnings

-- Enable RLS on Student table
ALTER TABLE "Student" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on Book table
ALTER TABLE "Book" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on BorrowRecord table
ALTER TABLE "BorrowRecord" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on Reservation table
ALTER TABLE "Reservation" ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
-- These policies allow authenticated users to read all data
-- Adjust these based on your specific security requirements

-- Student policies
CREATE POLICY "Allow authenticated users to read students"
ON "Student" FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow users to update their own student record"
ON "Student" FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'email' = email);

-- Book policies (public read access for browsing)
CREATE POLICY "Allow everyone to read books"
ON "Book" FOR SELECT
TO authenticated, anon
USING (true);

-- BorrowRecord policies (users can only see their own records)
CREATE POLICY "Allow users to read their own borrow records"
ON "BorrowRecord" FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "Student"
    WHERE "Student".id = "BorrowRecord"."studentId"
    AND "Student".email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Allow users to create their own borrow records"
ON "BorrowRecord" FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "Student"
    WHERE "Student".id = "BorrowRecord"."studentId"
    AND "Student".email = auth.jwt() ->> 'email'
  )
);

-- Reservation policies (users can only see their own reservations)
CREATE POLICY "Allow users to read their own reservations"
ON "Reservation" FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "Student"
    WHERE "Student".id = "Reservation"."studentId"
    AND "Student".email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Allow users to create their own reservations"
ON "Reservation" FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "Student"
    WHERE "Student".id = "Reservation"."studentId"
    AND "Student".email = auth.jwt() ->> 'email'
  )
);

-- Note: Admin/librarian policies would need to be added separately
-- based on your authentication system and role management
