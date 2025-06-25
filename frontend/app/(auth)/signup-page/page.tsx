

import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/auth-form/LoginForm";
import localFont from "next/font/local";
import SignupForm from "@/components/auth-form/SignupPage";

const righteousFont = localFont({
  src: "../../../public/fonts/Righteous-Regular.ttf",
});


export default function SignupPage() {
  
  return (
    <div className="flex min-h-screen dark:bg-[#171725]">
        <div className="p-8 hidden lg:flex lg:w-1/2 flex-col bg-[#FBFAFF] dark:bg-[#19192C]">
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
            <div className="p-8 flex items-center justify-center">
                <Image 
                    src="/images/login-illustration.svg" 
                    alt="Login illustration" 
                    width={400} 
                    height={400}
                    priority
                />
            </div>
        </div>
      
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-16">
        <div className="max-w-md mx-auto w-full"> 
          <SignupForm />
        </div>
      </div>
    </div>
  );
} 