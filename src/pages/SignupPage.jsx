import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiMail } from 'react-icons/fi';

export function SignupPage() {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-[400px]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-bold text-[#0f172a] mb-2 tracking-tight">Sign Up</h1>
          <p className="text-[#64748b] text-[15px]">Join us and track your roadmap progress.</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <SocialButton icon={<FaGithub className="text-lg" />} text="Sign up with GitHub" />
          <SocialButton icon={<FcGoogle className="text-lg" />} text="Sign up with Google" />
          <SocialButton icon={<FaLinkedin className="text-[#0a66c2] text-lg" />} text="Sign up with LinkedIn" />
          <SocialButton icon={<FaApple className="text-lg" />} text="Sign up with Apple" />
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-[#e2e8f0]"></div>
          <span className="px-4 text-[12px] text-[#94a3b8] font-medium">OR</span>
          <div className="flex-1 border-t border-[#e2e8f0]"></div>
        </div>

        {/* Email Button */}
        <SocialButton icon={<FiMail className="text-lg" />} text="Sign up with email" />

        {/* Login Link */}
        <div className="mt-6 text-center text-[13px] text-[#64748b] font-medium">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
        </div>

        {/* Terms */}
        <div className="mt-8 text-center text-[11px] text-[#94a3b8] leading-relaxed max-w-[360px] mx-auto">
          By continuing to use our services, you acknowledge that you have both read and agree to our <a href="#" className="underline hover:text-[#64748b]">Terms of Service</a> and <a href="#" className="underline hover:text-[#64748b]">Privacy Policy</a>.
        </div>

      </div>
    </div>
  );
}

function SocialButton({ icon, text }) {
  return (
    <button className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white border border-[#e2e8f0] rounded-md hover:bg-[#f8f9fa] transition-colors text-[14px] font-bold text-[#0f172a] shadow-sm cursor-pointer">
      {icon}
      <span>{text}</span>
    </button>
  );
}
