'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OTPInput } from '@/components/ui/otp-input';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ShineBorder } from '@/components/ui/shine-border';
import { WavyBackground } from '@/components/ui/wavy-background';
import { validateStudentEmail } from '@/lib/validateEmail';

type Step = 'email' | 'otp';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const otpFormRef = useRef<HTMLFormElement>(null);
  const isVerifyingRef = useRef(false);

  // Auto-verify when all 4 digits are entered

  // Auto-verify when all 4 digits are entered
  useEffect(() => {
    const otpValue = otp.join('');
    if (otpValue.length === 4 && step === 'otp' && !loading && !isVerifyingRef.current) {
      // Mark as verifying to prevent double submission
      isVerifyingRef.current = true;
      // Auto-submit the form
      otpFormRef.current?.requestSubmit();
    }
  }, [otp, step, loading]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    // Validate email format and graduation year
    const validation = validateStudentEmail(email);

    if (!validation.isValid) {
      setError(validation.error || 'Invalid email');
      return;
    }

    setLoading(true);

    try {
      // Call API to send OTP
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          graduationYear: validation.graduationYear,
          batchYear: validation.batchYear,
          isFaculty: validation.isFaculty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      // Move to OTP step
      setStep('otp');

      // In development, show OTP in alert for easy testing
      if (data.devOTP) {
        alert(`🔐 Development Mode\n\nYour OTP is: ${data.devOTP}\n\n(This will not appear in production)`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otpValue = otp.join('');

    if (otpValue.length !== 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }

    setLoading(true);

    try {
      // Call API to verify OTP
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      // Success - redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '']); // Clear OTP on error
      isVerifyingRef.current = false; // Reset to allow retry
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);

    try {
      const validation = validateStudentEmail(email);

      if (!validation.isValid) {
        throw new Error(validation.error || 'Invalid email');
      }

      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          graduationYear: validation.graduationYear,
          batchYear: validation.batchYear,
          isFaculty: validation.isFaculty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP');
      }

      // Show OTP in alert for development if email failed
      if (data.devOTP) {
        alert(`🔐 Development Mode\n\nEmail failed. Your new OTP is: ${data.devOTP}\n\n(In production, this will be sent via email)`);
      }

      // Clear OTP inputs
      setOtp(['', '', '', '']);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp(['', '', '', '']);
    setError('');
  };

  return (
    <WavyBackground
      className="z-10"
      containerClassName="fixed inset-0 grid place-items-center bg-white"
      colors={["#ea580c", "#fbbf24", "#f97316", "#fed7aa"]}
      backgroundFill="white"
      blur={10}
      speed="slow"
      waveWidth={50}
      waveOpacity={0.3}
    >
      {/* 3. YOUR EXACT CARD CODE (UNCHANGED) */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10">

        {/* KEEPING SHINE BORDER AS REQUESTED */}
        <ShineBorder
          className="text-center text-2xl font-bold capitalize"
          shineColor={["#ea580c", "#fbbf24", "#f97316"]}
          borderWidth={2}
          duration={8}
        />

        {/* HEADER */}
        <div className="bg-gradient-to-b from-orange-100/50 via-orange-50/30 to-white p-8 text-center relative z-10">

          <Link href="/" className="absolute top-4 left-4 text-gray-400 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex justify-center mb-4">
            <div className="relative w-100 h-30">
              <Image
                src="/muj-logo-white.png"
                alt="Manipal University Jaipur"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <p className="text-orange-600/80 text-sm font-medium mt-1">
            {step === 'email' ? 'Student Portal Access' : 'Verify OTP'}
          </p>
        </div>

        {/* FORM SECTION */}
        <div className="px-8 pb-8 pt-2 relative z-10">

          {/* EMAIL STEP */}
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name.regnumber@muj.manipal.edu"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={`h-11 bg-gray-50/50 ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:ring-orange-500'}`}
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  Use your @muj.manipal.edu or @jaipur.manipal.edu email
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-red-600 font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-base shadow-lg shadow-orange-100 transition-all hover:scale-[1.01]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending OTP...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Send OTP
                  </span>
                )}
              </Button>
            </form>
          )}

          {/* OTP STEP */}
          {step === 'otp' && (
            <form ref={otpFormRef} onSubmit={handleOTPSubmit} className="space-y-5">
              <div>
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change email
                </button>

                <p className="text-sm text-gray-600 mb-1.5">
                  Enter the 4-digit code sent to:
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-4">{email}</p>

                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  length={4}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-red-600 font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-base shadow-lg shadow-orange-100 transition-all hover:scale-[1.01]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Verify & Login
                  </span>
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium disabled:opacity-50"
                >
                  Didn't receive? Resend OTP
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Mail className="w-4 h-4 text-orange-500" />
            <span>Need help? Contact <span className="font-semibold text-gray-700">IT Helpdesk</span></span>
          </div>
        </div>

      </div>

      <div className="absolute bottom-6 w-full text-center text-xs text-gray-400 z-10 pointer-events-none">
        © 2026 Manipal University Jaipur
      </div>

    </WavyBackground>
  );
}