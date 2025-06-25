
import { validateEmail, validatePassword } from "@/utils/FiledValidations";

export async function loginAction(prevState: unknown, formData: FormData) {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    if(!validateEmail(email) || !validatePassword(password)) {
        return { error: "Invalid email or password format" }; 
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                hashedPassword: password
            }),
        });
        
        if (!response.ok) {
            // For 401 with empty response, provide a standard message
            if (response.status === 401) {
                return { error: response.statusText || "Unauthorized: Invalid email or password" };
            }
            return { error: response.statusText || "Login failed: Server returned an error" };
        }

        const data = await response.json(); 

        return { 
            success: true,
            message: data.message || "Login successful",
            userName: data.userName
        };
    } catch (error: unknown) {
        console.error("Error during login:", error);
        return { error: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
}