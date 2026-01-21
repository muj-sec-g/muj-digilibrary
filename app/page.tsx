"use client";
import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, Library, BookOpen } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    // Main Container: White background, full height
    <div className="h-screen w-full rounded-md bg-white relative flex flex-col items-center justify-center antialiased overflow-hidden">
      
      {/* 1. BACKGROUND BEAMS (Layer 0) */}
      <div className="absolute inset-0 z-0">
        <BackgroundBeams />
      </div>

      {/* 2. MAIN CONTENT (Layer 10) */}
      <div className="max-w-2xl mx-auto p-4 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium mb-8">
          <GraduationCap className="w-4 h-4" />
          <span>Manipal University Jaipur</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 text-center font-bold tracking-tight mb-6">
          MUJ <br /> DigiLibrary
        </h1>

        {/* Description */}
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-lg text-center relative z-10 mb-8">
          The official digital gateway to knowledge. Track books, manage renewals, and explore the catalog from anywhere on campus.
        </p>

        {/* LOGIN BUTTON (The Trigger) */}
        <div className="flex items-center justify-center gap-4">
            <Link href="/login">
                <Button className="h-14 px-8 text-lg rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-200 transition-all hover:scale-105">
                    Student Login <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </Link>
        </div>

      </div>

      {/* 3. FOOTER DECORATION (Optional) */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 opacity-50 z-10">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <Library className="w-4 h-4" />
            <span>25,000+ Books</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Digital Access</span>
        </div>
      </div>

    </div>
  );
}