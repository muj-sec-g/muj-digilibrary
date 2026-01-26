'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, HelpCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ShineBorder } from '@/components/ui/shine-border';
import { WavyBackground } from '@/components/ui/wavy-background';


export default function LoginPage() {
  const router = useRouter();
  const [regNumber, setRegNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ regNumber?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { regNumber?: string; password?: string } = {};

    if (!regNumber) newErrors.regNumber = 'Registration Number is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    /* 1. REPLACED OUTER DIV WITH WAVY BACKGROUND */
    <WavyBackground
      className="z-10"
      containerClassName="fixed inset-0 grid place-items-center bg-white"
      colors={["#ea580c", "#fbbf24", "#f97316", "#fed7aa"]} // Manipal Theme
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

          <p className="text-orange-600/80 text-sm font-medium mt-1">Student Portal Access</p>
        </div>

        {/* FORM SECTION */}
        <div className="px-8 pb-8 pt-2 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Registration Number */}
            <div>
              <label htmlFor="regNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                Registration Number
              </label>
              <Input
                id="regNumber"
                type="text"
                placeholder="e.g. 219301XXX"
                value={regNumber}
                onChange={(e) => {
                  setRegNumber(e.target.value);
                  if (errors.regNumber) setErrors({ ...errors, regNumber: undefined });
                }}
                className={`h-11 bg-gray-50/50 ${errors.regNumber ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:ring-orange-500'}`}
              />
              {errors.regNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.regNumber}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-orange-600 hover:text-orange-700 font-medium">
                  Forgot?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className={`h-11 bg-gray-50/50 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:ring-orange-500'}`}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
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
                  <Lock className="w-4 h-4" /> Secure Login
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
            <HelpCircle className="w-4 h-4 text-orange-500" />
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