'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OTPInput } from '@/components/ui/otp-input';
import { GraduationCap, Library, BookOpen, Mail, Lock, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { validateStudentEmail } from '@/lib/validateEmail';

type Step = 'email' | 'otp';

export default function HomePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const otpFormRef = useRef<HTMLFormElement>(null);
  const isVerifyingRef = useRef(false);

  // Auto-verify when all 4 digits are entered
  useEffect(() => {
    const otpValue = otp.join('');
    if (otpValue.length === 4 && step === 'otp' && !loading && !isVerifyingRef.current) {
      isVerifyingRef.current = true;
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

    const validation = validateStudentEmail(email);

    if (!validation.isValid) {
      setError(validation.error || 'Invalid email');
      return;
    }

    setLoading(true);

    try {
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

      setStep('otp');

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
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      // Save user session
      if (data.student) {
        localStorage.setItem('muj_user', JSON.stringify(data.student));
      }

      router.push('/books');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '']);
      isVerifyingRef.current = false;
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

      if (data.devOTP) {
        alert(`🔐 Development Mode\n\nEmail failed. Your new OTP is: ${data.devOTP}\n\n(In production, this will be sent via email)`);
      }

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
    <div className="h-screen w-full relative bg-slate-50 overflow-y-hidden">
      <BackgroundBeams />
      <div className="h-full w-full flex flex-col md:flex-row relative z-10">

        {/* LEFT PANEL — Branding (60%) */}
        <div className="relative w-full md:w-[60%] h-[40vh] md:h-full flex flex-col items-center justify-center shrink-0">
          <div className="relative z-10 text-center px-8 max-w-xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6 md:mb-8">
              <GraduationCap className="w-4 h-4" />
              <span>Manipal University Jaipur</span>
            </div>

            {/* Hero Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 font-bold tracking-tight leading-tight pb-2 mb-4 md:mb-6">
              MUJ <br /> DigiLibrary
            </h1>

            {/* Description */}
            <p className="hidden md:block text-neutral-500 max-w-md mx-auto text-lg mb-8">
              The official digital gateway to knowledge. Track books, manage renewals, and explore the catalog from anywhere on campus.
            </p>

            {/* Stats */}
            <div className="hidden md:flex justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2 text-neutral-500 text-sm">
                <Library className="w-4 h-4" />
                <span>25,000+ Books</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-500 text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Digital Access</span>
              </div>
            </div>
          </div>
        </div>


        {/* RIGHT PANEL — Login Form (40%) */}
        <div className="relative w-full md:w-[40%] flex-1 flex items-center justify-center px-6 py-8 md:py-0">

          {/* Subtle decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-md relative z-10">

            {/* Login Card with Glowing Effect */}
            <div className="relative rounded-2xl">

              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
                colors={["#ea580c", "#fbbf24", "#f97316", "#d97706"]}
              />

              <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">

                {/* Card Header */}
                <div className="bg-gradient-to-b from-orange-100/30 via-orange-50/20 to-transparent p-8 text-center relative z-10">
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

                {/* Form Section */}
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

                  <div className="mt-8 pt-6 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Mail className="w-4 h-4 text-orange-500" />
                      <span>Need help? Contact <span className="font-semibold text-gray-700">IT Helpdesk</span></span>
                    </div>
                    <p className="text-center text-xs text-gray-400">
                      © 2026 Manipal University Jaipur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}