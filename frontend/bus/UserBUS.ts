export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
    // Password must be at least 10 characters long and contain:
    // - At least one lowercase letter
    // - At least one uppercase letter  
    // - At least one number
    // - At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{}|;:,.<>?]{10,}$/;
    return passwordRegex.test(password);
}

export function validateConfirmPassword(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
}

export function getUserNameFromEmail(email: string): string {
    // Extract the part before the '@' symbol and replace '.' with ' '
    const namePart = email.split('@')[0];
    return namePart.replace(/\./g, ' ');
}