import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Animated Graphic/Branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 via-purple-900 to-background p-12 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="relative z-10 text-center space-y-6">
          <Image
            src="/logo.png"
            alt="GENzAI Logo"
            width={250}
            height={250}
            className="mx-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          />
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Accelerate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Tech Career</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            AI-powered resume scoring, dynamic career roadmaps, and intelligent interview prep designed to get you hired faster.
          </p>
        </div>
        
        {/* Decorative Neon Circles */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Right Side - Clerk Auth Forms */}
      <div className="flex items-center justify-center p-8 bg-background relative">
        <div className="absolute top-8 left-8 md:hidden">
          <Image src="/logo.png" alt="GENzAI Logo" width={100} height={100} />
        </div>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
