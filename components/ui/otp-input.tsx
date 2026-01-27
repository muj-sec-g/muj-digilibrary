'use client';

import React, { useRef, KeyboardEvent, ClipboardEvent } from 'react';
import { Input } from '@/components/ui/input';

interface OTPInputProps {
    value: string[];
    onChange: (value: string[]) => void;
    length?: number;
}

export function OTPInput({ value, onChange, length = 4 }: OTPInputProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, digit: string) => {
        // Only allow single digits
        if (digit.length > 1) {
            digit = digit[digit.length - 1];
        }

        // Only allow numbers
        if (digit && !/^\d$/.test(digit)) {
            return;
        }

        const newValue = [...value];
        newValue[index] = digit;
        onChange(newValue);

        // Auto-focus next input
        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === 'Backspace') {
            if (!value[index] && index > 0) {
                // If current box is empty, go to previous box
                inputRefs.current[index - 1]?.focus();
            } else {
                // Clear current box
                const newValue = [...value];
                newValue[index] = '';
                onChange(newValue);
            }
        }

        // Handle arrow keys
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();

        // Only process if it's all digits
        if (!/^\d+$/.test(pastedData)) {
            return;
        }

        const digits = pastedData.slice(0, length).split('');
        const newValue = [...value];

        digits.forEach((digit, i) => {
            if (i < length) {
                newValue[i] = digit;
            }
        });

        onChange(newValue);

        // Focus the next empty box or the last box
        const nextEmptyIndex = newValue.findIndex(v => !v);
        const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
    };

    return (
        <div className="flex gap-3 justify-center">
            {Array.from({ length }).map((_, index) => (
                <Input
                    key={index}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`
            w-14 h-14 text-center text-2xl font-bold
            border-2 rounded-lg
            transition-all duration-200
            ${value[index]
                            ? 'border-orange-600 bg-orange-50 text-orange-900'
                            : 'border-gray-300 bg-white'
                        }
            focus:border-orange-600 focus:ring-2 focus:ring-orange-200
            focus-visible:ring-orange-500
          `}
                    autoComplete="off"
                />
            ))}
        </div>
    );
}
