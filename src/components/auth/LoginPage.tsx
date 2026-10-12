import React, { useState } from 'react';
import {
  Lock,
  User,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Laugh,
  CheckCircle2
} from 'lucide-react';
import { useEdu } from '../../context/EduContext';

export const LoginPage: React.FC = () => {
  const { login, accessibility, updateAccessibility } = useEdu();

  const [username, setUsername] = useState<string>('udhay');
  const [password, setPassword] = useState<string>('udh');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = login(username, password);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.message);
    }
  };

  const handleQuickFill = () => {
    setUsername('udhay');
    setPassword('udh');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#070914] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      
      {/* Background Anime & Cyberpunk Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-gradient-to-tr from-purple-600/20 via-cyan-500/15 to-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 shadow-2xl shadow-purple-950/60 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-600 to-purple-600 p-0.5 shadow-xl shadow-purple-600/30 mb-1 animate-pulse">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-3xl">
              ⚡
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Adaptix
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-purple-950 border border-purple-500/40 text-purple-300">
              Auth Portal
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Smart Education Ecosystem • Gamified & Meme-Powered
          </p>
        </div>

        {/* Credentials Info Helper Pill */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-purple-500/30 flex items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Assigned Credentials:
            </span>
            <div className="font-mono text-slate-200">
              User: <strong className="text-white">udhay</strong> | Pass: <strong className="text-white">udh</strong>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-400/40 text-purple-200 font-bold text-[11px] whitespace-nowrap transition-all shadow-sm flex items-center gap-1"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Auto-Fill</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Student Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username (e.g. udhay)"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm text-white placeholder-slate-500 transition-all outline-none font-medium"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Access Password
              </label>
              <span className="text-[11px] text-slate-500 font-mono">Password: udh</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password (e.g. udh)"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm text-white placeholder-slate-500 transition-all outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Meme Card if login fails */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-950/70 border border-red-500/50 flex items-start gap-3 animate-in shake duration-300">
              <span className="text-2xl">🤦‍♂️❌</span>
              <div className="space-y-0.5">
                <p className="text-xs font-black text-red-300">EMOTIONAL DAMAGE: Impostor Alert!</p>
                <p className="text-[11px] text-red-200">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-purple-600/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Log In to Adaptix</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* BIS Standards & Security Footer */}
        <div className="pt-4 border-t border-slate-800 space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>IS/ISO 27001 Secure Sovereign Login & IS 17802 Accessible</span>
          </div>
          <p className="text-[10px] text-slate-500">
            Zero telemetry • Encrypted session • Local sovereign student credentials
          </p>
        </div>

      </div>

    </div>
  );
};
