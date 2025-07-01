
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/authentication/LoginForm";
import localFont from "next/font/local";
import { Suspense } from "react";

const righteousFont = localFont({
  src: "../../../public/fonts/Righteous-Regular.ttf",
});


export default function LoginPage() {

  return (
    <div className="flex min-h-screen dark:bg-[#171725]">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-[#FBFAFF] dark:bg-[#19192C]">
        <div className="p-8">
          <Image 
            src="/images/login-illustration.svg" 
            alt="Login illustration" 
            width={400} 
            height={400}
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
            sizes="(max-width: 1024px) 0px, 400px"
            className="max-w-full h-auto"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-16">
        <div className="mb-12">
          <Link href="/" className="w-fit flex items-center gap-3">
            <div>
              <Image 
                src="/logo.png" 
                alt="logo" 
                width={48} 
                height={48}
                />
              </div>
              <span className={`text-xl font-medium text-[#364670] dark:text-white ${righteousFont.className}`}>Alpha Drive</span>
          </Link>
        </div>
        <div className="max-w-md mx-auto w-full">

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#364670] dark:text-white mb-2">
              Sign in to your account
            </h1>
            <p className="text-gray-600 dark:text-white/75">
              Don't have an account? <Link href="/signup-page" className="text-[#6A4BFF] font-medium">Sign up</Link>
            </p>
          </div>     
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 