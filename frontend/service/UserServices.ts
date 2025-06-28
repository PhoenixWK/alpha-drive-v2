

import { getUser, logout, signInWithGoogle } from "@/dao/UserDAO";

export function signInWithGoogleService(){
    return signInWithGoogle();
}

export function logoutService() {
    return logout();
}

export function getUserService() {
    return getUser();
}