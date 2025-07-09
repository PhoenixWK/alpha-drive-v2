import { Suspense } from 'react';
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const righteousFont = localFont({
  src: "../../../../public/fonts/Righteous-Regular.ttf",
});

async function VerifyEmailContent({ searchParams }: { searchParams: Promise<{ email?: string; error?: string }> }) {
  const params = await searchParams;
  const { email, error } = params;

  const getErrorMessage = (errorType: string) => {
      switch (errorType) {
      case 'verification_failed':
          return 'The verification link is invalid or has expired.';
      case 'unexpected_error':
          return 'An unexpected error occurred during verification.';
      case 'invalid_link':
          return 'The verification link is invalid.';
      default:
          return 'An error occurred during verification.';
      }
  };
  return (
    <div className="flex min-h-screen dark:bg-[#171725]">
      <div className="w-full flex flex-col p-8">
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
            <span className={`text-xl font-medium text-[#364670] dark:text-white ${righteousFont.className}`}>
              Alpha Drive
            </span>
          </Link>
        </div>
        <div className="max-w-md mx-auto w-full">
          <div className="text-center">
            {error ? (
              <>
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#364670] dark:text-white mb-2">
                    Verification Failed
                  </h1>
                  <p className="text-gray-600 dark:text-white/75 mb-6">
                    {getErrorMessage(error)}
                  </p>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                    What to do next:
                  </p>
                  <ul className="text-sm text-red-700 dark:text-red-300 mt-2 space-y-1 text-left">
                    <li>• Try clicking the verification link again</li>
                    <li>• Check if the link has expired</li>
                    <li>• Sign up again to get a new verification email</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#364670] dark:text-white mb-2">
                    Check your email
                  </h1>
                  <p className="text-gray-600 dark:text-white/75 mb-6">
                    We've sent a verification link to{email ? ` ${email}` : ' your email address'}. 
                    Please click the link to verify your account and complete the signup process.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                    Next steps:
                  </p>
                  <ol className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1 text-left">
                    <li>1. Check your email inbox</li>
                    <li>2. Click the verification link</li>
                    <li>3. You'll be redirected to sign in</li>
                  </ol>
                </div>
              </>
            )}

            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-white/75">
                Didn't receive the email? Check your spam folder or{" "}
                <Link href="/signup-page" className="text-[#6A4BFF] font-medium hover:underline">
                  try signing up again
                </Link>
              </p>
              
              <Link 
                href="/login-page" 
                className="inline-block w-full py-3 px-4 bg-[#6A4BFF] text-white font-semibold rounded-md hover:bg-[#573FDB] transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; error?: string }>
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent searchParams={searchParams} />
    </Suspense>
  );
}
