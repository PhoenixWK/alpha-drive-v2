export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validateUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9]{10,}$/;
    return usernameRegex.test(username);
}

export function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/;
    return passwordRegex.test(password);
}