import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateStudentEmail, extractRegNumber } from '@/lib/validateEmail';
import { otpStore } from '@/lib/otpStore';
import { Resend } from 'resend';

// Lazy-initialize Resend (avoids build-time crash when env var is missing)
let resend: Resend;
function getResend() {
    if (!resend) {
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
}

// Generate 4-digit OTP
function generateOTP(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function POST(req: NextRequest) {
    console.log('--- OTP Send Request Started ---');
    try {
        // Log environment variable status (don't log the full keys for security)
        console.log('RESEND_API_KEY status:', !!process.env.RESEND_API_KEY ? 'Present (Starts with ' + process.env.RESEND_API_KEY.substring(0, 3) + ')' : 'MISSING');
        console.log('DATABASE_URL status:', !!process.env.DATABASE_URL ? 'Present' : 'MISSING');

        const body = await req.json();
        const { email, graduationYear, batchYear, isFaculty } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Validate email
        const validation = validateStudentEmail(email);

        if (!validation.isValid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        // Generate OTP
        const otp = generateOTP();

        // Store OTP with 10-minute expiry
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
        otpStore.set(email.toLowerCase(), { otp, expiresAt });

        // Send OTP via email using Resend
        let emailSent = false;
        try {
            console.log('[Resend] Attempting to send email to:', email);
            console.log('[Resend] API Key exists:', !!process.env.RESEND_API_KEY);
            console.log('[Resend] API Key starts with re_:', process.env.RESEND_API_KEY?.startsWith('re_'));

            const result = await getResend().emails.send({
                from: 'MUJ DigiLibrary <onboarding@resend.dev>', // Change to your verified domain
                to: email,
                subject: 'Your MUJ DigiLibrary Login OTP',
                html: `
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                                .otp-box { background: white; border: 2px solid #ea580c; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
                                .otp-code { font-size: 32px; font-weight: bold; color: #ea580c; letter-spacing: 8px; }
                                .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>MUJ DigiLibrary</h1>
                                    <p>Your One-Time Password</p>
                                </div>
                                <div class="content">
                                    <p>Hello,</p>
                                    <p>You requested to log in to MUJ DigiLibrary. Use the OTP below to complete your login:</p>
                                    <div class="otp-box">
                                        <div class="otp-code">${otp}</div>
                                    </div>
                                    <p><strong>This code will expire in 10 minutes.</strong></p>
                                    <p>If you didn't request this code, please ignore this email.</p>
                                    <div class="footer">
                                        <p>© 2026 Manipal University Jaipur - DigiLibrary</p>
                                    </div>
                                </div>
                            </div>
                        </body>
                    </html>
                `,
            });

            console.log('[Resend] Response:', JSON.stringify(result, null, 2));

            if (result.error) {
                throw new Error(`Resend API error: ${JSON.stringify(result.error)}`);
            }

            console.log(`✅ OTP email sent to ${email} (ID: ${result.data?.id})`);
            emailSent = true;
        } catch (emailError: any) {
            console.error('[Resend] Failed to send email:', emailError);
            console.error('[Resend] Error details:', {
                message: emailError.message,
                name: emailError.name,
                stack: emailError.stack,
            });
            // Fallback to console logging in development
            console.log('\n' + '='.repeat(50));
            console.log(`🔐 OTP for ${email}: ${otp} (Email failed, check console)`);
            console.log('='.repeat(50) + '\n');
        }

        // Create or update student record
        const regNumber = extractRegNumber(email);

        if (regNumber) {
            await prisma.student.upsert({
                where: { email: email.toLowerCase() },
                update: {
                    validUntil: graduationYear || new Date().getFullYear() + 4,
                },
                create: {
                    email: email.toLowerCase(),
                    regNumber: regNumber,
                    firstName: email.split('@')[0].split('.')[0] || 'Student',
                    lastName: '',
                    validUntil: graduationYear || new Date().getFullYear() + 4,
                },
            });
        }

        return NextResponse.json({
            success: true,
            message: emailSent ? 'OTP sent to your email' : 'OTP generated (check console)',
            // Show OTP in development if email failed
            devOTP: (process.env.NODE_ENV === 'development' && !emailSent) ? otp : undefined,
        });

    } catch (error: any) {
        console.error('CRITICAL Send OTP failure:', error);

        // This prevents the "!doctype" HTML error in the browser
        return new NextResponse(
            JSON.stringify({
                error: 'Server Error: Failed to send OTP.',
                details: error.message,
                code: error.code || 'UNKNOWN_ERROR',
                // Only show stack in dev mode
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
