/**
 * Email Validation Utility for MUJ DigiLibrary
 * Validates student/faculty emails and checks graduation year eligibility
 */

interface ValidationResult {
    isValid: boolean;
    error?: string;
    graduationYear?: number;
    batchYear?: number;
    isFaculty?: boolean;
}

/**
 * Validates student email and checks if they're eligible (not alumni)
 * 
 * @param email - Student or faculty email address
 * @returns ValidationResult object with validation status and details
 * 
 * @example
 * validateStudentEmail('piyush.23fe10cai00225@muj.manipal.edu')
 * // Returns: { isValid: true, graduationYear: 2027, batchYear: 2023 }
 * 
 * validateStudentEmail('alumni.19xxx@muj.manipal.edu')
 * // Returns: { isValid: false, error: 'Alumni Access Only - Student ID Expired (Graduated in 2023)' }
 */
export function validateStudentEmail(email: string): ValidationResult {
    const trimmedEmail = email.trim().toLowerCase();

    // DEV MODE: Allow pytworks@gmail.com for Resend testing
    if (process.env.NODE_ENV === 'development' && trimmedEmail === 'pytworks@gmail.com') {
        return {
            isValid: true,
            graduationYear: 2027,
            batchYear: 2023,
            isFaculty: false,
        };
    }

    // Step 1: Domain validation
    const studentDomain = '@muj.manipal.edu';
    const facultyDomain = '@jaipur.manipal.edu';

    const isStudent = trimmedEmail.endsWith(studentDomain);
    const isFaculty = trimmedEmail.endsWith(facultyDomain);

    if (!isStudent && !isFaculty) {
        return {
            isValid: false,
            error: 'Invalid email domain. Use @muj.manipal.edu (Students) or @jaipur.manipal.edu (Faculty)',
        };
    }

    // Step 2: Faculty bypass - no year check needed
    if (isFaculty) {
        return {
            isValid: true,
            isFaculty: true,
        };
    }

    // Step 3: Extract registration number from student email
    // Format: name.REGNUMBER@muj.manipal.edu
    // Examples: 
    //   - piyush.23fe10cai00225@muj.manipal.edu
    //   - xyz.2310920399@muj.manipal.edu

    const emailLocalPart = trimmedEmail.split('@')[0]; // Get part before @
    const parts = emailLocalPart.split('.');

    if (parts.length < 2) {
        return {
            isValid: false,
            error: 'Invalid email format. Expected format: name.REGNUMBER@muj.manipal.edu',
        };
    }

    // Registration number is everything after the first dot
    const regNumber = parts.slice(1).join('.');

    if (!regNumber || regNumber.length < 2) {
        return {
            isValid: false,
            error: 'Invalid registration number format',
        };
    }

    // Step 4: Extract batch year (first 2 digits of registration number)
    const batchYearStr = regNumber.substring(0, 2);
    const batchYearNum = parseInt(batchYearStr, 10);

    if (isNaN(batchYearNum)) {
        return {
            isValid: false,
            error: 'Unable to parse batch year from registration number',
        };
    }

    // Convert 2-digit year to 4-digit year (23 -> 2023)
    const currentYear = new Date().getFullYear();
    const currentCentury = Math.floor(currentYear / 100) * 100; // 2000
    const batchYear = currentCentury + batchYearNum;

    // Step 5: Calculate graduation year (batch year + 4)
    const graduationYear = batchYear + 4;

    // Step 6: Check if student has graduated (alumni)
    if (currentYear > graduationYear) {
        return {
            isValid: false,
            error: `Alumni Access Only - Student ID Expired (Graduated in ${graduationYear})`,
            graduationYear,
            batchYear,
        };
    }

    // Step 7: Valid student
    return {
        isValid: true,
        graduationYear,
        batchYear,
        isFaculty: false,
    };
}

/**
 * Extract registration number from email
 * @param email - Student email
 * @returns Registration number or null
 */
export function extractRegNumber(email: string): string | null {
    const emailLocalPart = email.trim().toLowerCase().split('@')[0];
    const parts = emailLocalPart.split('.');

    if (parts.length < 2) return null;

    return parts.slice(1).join('.');
}
