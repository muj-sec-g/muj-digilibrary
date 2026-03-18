import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { otpStore } from '@/lib/otpStore';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, otp } = body;

        if (!email || !otp) {
            return NextResponse.json(
                { error: 'Email and OTP are required' },
                { status: 400 }
            );
        }

        const emailLower = email.toLowerCase();

        // Check if OTP exists
        const storedOTP = otpStore.get(emailLower);

        if (!storedOTP) {
            return NextResponse.json(
                { error: 'OTP not found or expired. Please request a new one.' },
                { status: 400 }
            );
        }

        // Check if OTP is expired
        if (Date.now() > storedOTP.expiresAt) {
            otpStore.delete(emailLower);
            return NextResponse.json(
                { error: 'OTP has expired. Please request a new one.' },
                { status: 400 }
            );
        }

        if (storedOTP.otp !== otp) {
            return NextResponse.json(
                { error: 'Invalid OTP. Please try again.' },
                { status: 400 }
            );
        }

        // OTP is valid - delete it
        otpStore.delete(emailLower);

        // Get student record
        const student = await prisma.student.findUnique({
            where: { email: emailLower },
        });

        if (!student) {
            return NextResponse.json(
                { error: 'Student record not found' },
                { status: 404 }
            );
        }

        // TODO: Create session/JWT token
        // For now, just return success with student data

        // In production, create a JWT token:
        /*
        const token = await new SignJWT({ 
          studentId: student.id,
          email: student.email,
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('7d')
          .sign(new TextEncoder().encode(process.env.JWT_SECRET));
        
        // Set HTTP-only cookie
        const response = NextResponse.json({ success: true, student });
        response.cookies.set('auth-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60, // 7 days
        });
        
        return response;
        */

        return NextResponse.json({
            success: true,
            student: {
                id: student.id,
                email: student.email,
                firstName: student.firstName,
                lastName: student.lastName,
                regNumber: student.regNumber,
            },
        });

    } catch (error: any) {
        console.error('Verify OTP error:', error);
        return NextResponse.json(
            { error: 'Failed to verify OTP. Please try again.' },
            { status: 500 }
        );
    }
}
