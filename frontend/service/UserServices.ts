'use server'

import { checkExistingUserProfile, checkExistingUserStorage, createDefaultUserProfile, createDefaultUserStorage, createSignedUrlForPrivateAsset, getUser, logout, resetPasswordForEmail, signInWithEmailAndPassword, signUp, updateUserPassword } from "@/dao/UserDAO";



export async function signInWithEmailAndPasswordService(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Server-side validation
    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        const result = await signInWithEmailAndPassword(email, password);
        
        if (result?.error) {
            return { error: result.error };
        }

        if (result?.success) {
            // Return success with redirect URL instead of redirecting
            return { 
                success: result.success,  
                user: result.user,
            };
        }

        return { error: "Failed to log in. Please check your credentials." };
    } catch (error) {
        console.error('Login service error:', error);
        return { error: "An unexpected error occurred. Please try again." };
    }
}


export async function signUpService(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Server-side validation
    if(!email || !password || !confirmPassword) {
        return { error: "All fields are required" };
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    try {
        const result = await signUp(email, password);
        
        if (result?.error) {
            return { error: result.error };
        }

        if (result?.success) {
            // Return success with redirect URL instead of redirecting
            return { 
                success: true, 
                redirectTo: '/auth/verify-email?email=' + encodeURIComponent(email) 
            };
        }

        return { error: "Failed to create account. Please try again." };
    } catch (error) {
        console.error('Signup service error:', error);
        return { error: "An unexpected error occurred. Please try again." };
    }
}

export async function logoutService() {
    return await logout();
}

export async function resetPasswordForEmailService(formData: FormData) {
    const email = formData.get("email") as string;

    if(!email) {
        return { error: "Email field are required" };
    }

    try {
        const result = await resetPasswordForEmail(email);
        if (result?.error) {
            return { error: result.error.message || "Failed to send reset password email" };
        }

        return {
            success: true,
            message: "Password reset email sent successfully. Please check your email to reset your password."
        }
    } catch (error) {
        return { error: "An unexpected error occurred. Please try again." };
    }
}

export default async function updateUserPasswordService(formData: FormData) {
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!newPassword || !confirmPassword) {
        return { error: "All fields are required" };
    }

    if (newPassword !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    try {
        const result = await updateUserPassword(newPassword);
        if (result?.error) {
            console.log(result.error)
            return {  error: result.error.message || "Failed to update password" };
        }

        return { success: true, message: "Password updated successfully", redirectTo: '/login-page' };
    } catch (error) {
        console.log(error)
        return { error: "An unexpected error occurred. Please try again." };
    }
}

export async function getUserService() {
    return await getUser();
}

export async function createDefaultUserProfileService() {
    const user = await getUser() 

    if(!user) {
        return { error: "User not found. Please log in." };
    }

    try {
        const checkExistingUserProfileResponse = await checkExistingUserProfile(user.id);
        const existingProfile = checkExistingUserProfileResponse.data;

        // If there's an error and it's not "not found", return error
        if (checkExistingUserProfileResponse.error && checkExistingUserProfileResponse.error.code !== 'PGRST116') {
            console.log('Error checking existing profile:', checkExistingUserProfileResponse.error);
            return { error: "An error occurred while checking your profile." };
        }
        
        // If profile exists, return success
        if(existingProfile) {
            return { 
                success: true,
                isExistingProfile: true,
                message: "Profile already exists." 
            };
        }
        
        // Create new profile
        const newDefaultUserProfile = await createDefaultUserProfile(user.id, user.email as string);

        if( newDefaultUserProfile.error ) {
            console.log('Error creating profile:', newDefaultUserProfile.error);
            return { error: "An error occurred while creating your profile." };
        }

        console.log('Profile created successfully for user:', user.id);
        return { 
            success: true,
            isExistingProfile: false,
            message: "Profile created successfully.", 
        };
    } catch (error) {
        console.error('Unexpected error in createDefaultUserProfileService:', error);
        return { error: "An unexpected error occurred while setting up your profile." };
    }
}

export async function createDefaultUserStorageService(folderName: string, file: File) {
    try {
        const checkExistingUserStorageResponse = await checkExistingUserStorage(folderName);

        if(checkExistingUserStorageResponse.error) {
            console.error('Error checking existing user profile:', checkExistingUserStorageResponse.error);
            return { error: checkExistingUserStorageResponse.error.message || "An error occurred while checking your storage." };
        }

        if(checkExistingUserStorageResponse.data != undefined && checkExistingUserStorageResponse.data?.length > 0) {
            console.log('User storage already exists for folder:', folderName);
            return {data: "User storage already exists. No need to create again."};
        }

        const createStorageResponse = await createDefaultUserStorage(folderName, file);
        if(createStorageResponse.error) {
            console.error('Error creating user storage:', createStorageResponse.error);
            return { error: createStorageResponse.error.message || "An error occurred while creating your storage." };
        }
    }catch (error) {  
        console.error('Unexpected error in createDefaultUserStorageService:', error);
        return { error: "An unexpected error occurred while setting up your storage." };
    }
}

export async function getUserProfileImageLinkService(relativePath: string, expiredIn: number) {
    try {
        const userProfileImageLinkResponse = await createSignedUrlForPrivateAsset(relativePath, expiredIn);

        if (userProfileImageLinkResponse.error) {
            console.error('Error retrieving user profile image link:', userProfileImageLinkResponse.error);
            return { error: userProfileImageLinkResponse.error.message || "An error occurred while retrieving your profile image link." };
        } else if(userProfileImageLinkResponse.data?.signedUrl === undefined) {
            return { 
                success: false, 
                signedUrl: undefined,
                message: "No profile image found. Using default image."
            };
        } else {
            return { 
                success: true, 
                signedUrl: userProfileImageLinkResponse.data?.signedUrl,
                message: "Profile image link retrieved successfully." 
            };
        }
    }catch (error) {
        console.error('Unexpected error in getUserProfileImageLinkService:', error);
        return { error: "An unexpected error occurred while retrieving your profile image link." };
    }
}