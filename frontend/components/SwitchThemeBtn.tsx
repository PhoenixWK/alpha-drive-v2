"use client"

import Image from "next/image"
import * as React from "react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"


export default function SwitchThemeBtn() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Only render after mounting to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
    }

    // Show a neutral state until mounted
    if (!mounted) {
        return (
            <Button 
                onClick={handleThemeChange}
                className="bg-black px-4 py-6 rounded-md dark:bg-[#6A4BFF] border-none"
            >
                <Image 
                    src="/night-mode.png" 
                    alt="theme toggle" 
                    width={16} 
                    height={16}
                    className="w-auto h-auto"
                />
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    return (
        <Button 
            onClick={handleThemeChange}
            className="bg-black px-4 py-6 rounded-md dark:bg-[#6A4BFF] border-none"
        >
            {theme === "dark" ? (
                <Image 
                    src="/sun.png" 
                    alt="sun" 
                    width={16} 
                    height={16}
                    className="w-auto h-auto"
                />
            ) : (
                <Image 
                    src="/night-mode.png" 
                    alt="moon" 
                    width={16} 
                    height={16} 
                    className="w-auto h-auto"
                />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
