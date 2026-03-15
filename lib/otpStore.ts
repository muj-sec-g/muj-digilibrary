// Shared OTP storage for both send-otp and verify-otp routes
// In production, replace this with Redis or a database table

interface OTPData {
    otp: string;
    expiresAt: number;
}

class OTPStore {
    private store: Map<string, OTPData> = new Map();

    set(email: string, data: OTPData): void {
        this.store.set(email.toLowerCase(), data);
        console.log(`[OTP Store] Stored OTP for ${email}:`, data.otp);
    }

    get(email: string): OTPData | undefined {
        const data = this.store.get(email.toLowerCase());
        console.log(`[OTP Store] Retrieved OTP for ${email}:`, data?.otp || 'NOT FOUND');
        return data;
    }

    delete(email: string): void {
        this.store.delete(email.toLowerCase());
        console.log(`[OTP Store] Deleted OTP for ${email}`);
    }

    has(email: string): boolean {
        return this.store.has(email.toLowerCase());
    }
}

const globalForOTP = globalThis as unknown as {
    otpStore: OTPStore | undefined;
};

// Export singleton instance
export const otpStore = globalForOTP.otpStore ?? new OTPStore();

if (process.env.NODE_ENV !== "production") globalForOTP.otpStore = otpStore;
