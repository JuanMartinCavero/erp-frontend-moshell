// src/pages/Login.jsx
import { Lock, User, Eye, ArrowRight, ShieldCheck, FileCheck2, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* Header Image Area */}
        <div className="h-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1701964621103-96fc0dd08d5c?w=800&q=80" 
            alt="Fabric texture"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-8 z-20 text-white">
            <h1 className="text-2xl font-bold tracking-tight">TexFlow ERP</h1>
            <p className="text-sm font-medium text-gray-200">Next Generation Textile Management</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-8 flex-1">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">Secure Enterprise Login</h2>
            <p className="text-sm text-gray-500 mt-1">Please enter your credentials to access your dashboard</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Email or Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="e.g. j.doe@texflow.com"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:ring-2 focus:ring-[#42526E] focus:border-transparent transition-colors"
                  defaultValue="j.doe@texflow.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:ring-2 focus:ring-[#42526E] focus:border-transparent transition-colors"
                  defaultValue="password123"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#42526E] focus:ring-[#42526E]" />
                <span className="text-gray-600 font-medium">Remember Me</span>
              </label>
              <a href="#" className="font-semibold text-[#42526E] hover:underline">Forgot Password?</a>
            </div>

            <button 
              type="submit"
              className="w-full h-12 mt-4 bg-[#42526E] hover:bg-[#344563] text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              Sign In to System
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Footer area */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center mb-4">
              Compliance & Security
            </p>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <ShieldCheck className="h-3.5 w-3.5" /> SSO READY
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <Cpu className="h-3.5 w-3.5" /> AES-256
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <FileCheck2 className="h-3.5 w-3.5" /> SOC2
              </div>
            </div>
            <p className="text-xs text-center text-gray-400 mt-6">
              © 2024 TexFlow ERP Systems. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;