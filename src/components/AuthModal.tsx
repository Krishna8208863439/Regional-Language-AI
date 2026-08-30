import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Globe, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  RotateCcw,
  UserCheck
} from 'lucide-react';
import { LanguageCode, UserRole, UserAccount } from '../types';
import { SUPPORTED_LANGUAGES, USER_ROLES, DEMO_USERS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  initialTab?: 'login' | 'register' | 'forgot';
  currentLanguage: LanguageCode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = 'login',
  currentLanguage
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(initialTab);
  
  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLanguage, setRegLanguage] = useState<LanguageCode>(currentLanguage);
  const [regRole, setRegRole] = useState<UserRole>('citizen');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAgreeTerms, setRegAgreeTerms] = useState(true);

  // Forgot password flow state
  const [forgotStep, setForgotStep] = useState<'request' | 'otp' | 'reset' | 'success'>('request');
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(45);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Status & errors
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const resetMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleTabSwitch = (tab: 'login' | 'register' | 'forgot') => {
    resetMessages();
    setActiveTab(tab);
    if (tab === 'forgot') setForgotStep('request');
  };

  // Demo user quick login
  const handleQuickDemoLogin = (demoUser: UserAccount) => {
    setIsLoading(true);
    resetMessages();
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ ...demoUser, isLoggedIn: true });
      onClose();
    }, 400);
  };

  // Standard Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!loginIdentifier.trim()) {
      setErrorMessage('Please enter your email or mobile number.');
      return;
    }
    if (!loginPassword.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Find matching demo user or construct active user session
      const matched = DEMO_USERS.find(
        u => u.email.toLowerCase() === loginIdentifier.toLowerCase() || u.phone?.includes(loginIdentifier)
      );

      const user: UserAccount = matched || {
        id: `user-${Date.now()}`,
        name: loginIdentifier.split('@')[0] || 'Authenticated User',
        email: loginIdentifier.includes('@') ? loginIdentifier : `${loginIdentifier}@bharatvoice.ai`,
        phone: loginIdentifier.includes('@') ? '+91 98234 11223' : loginIdentifier,
        role: 'citizen',
        preferredLanguage: currentLanguage,
        avatar: '👤',
        createdAt: new Date().toISOString().split('T')[0],
        isLoggedIn: true
      };

      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  // Registration Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!regName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regEmail.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!regAgreeTerms) {
      setErrorMessage('Please accept the BharatVoice AI Terms and Data Privacy Policy.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newUser: UserAccount = {
        id: `user-${Date.now()}`,
        name: regName,
        email: regEmail,
        phone: regPhone || '+91 98000 00000',
        role: regRole,
        preferredLanguage: regLanguage,
        avatar: '🌟',
        createdAt: new Date().toISOString().split('T')[0],
        isLoggedIn: true
      };

      onLoginSuccess(newUser);
      onClose();
    }, 700);
  };

  // Forgot password OTP Request
  const handleForgotRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (!forgotIdentifier.trim()) {
      setErrorMessage('Please enter registered Email or Mobile number.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep('otp');
      setSuccessMessage(`A 6-digit verification code was sent to ${forgotIdentifier}`);
      setOtpTimer(45);
    }, 600);
  };

  // Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    const entered = otpCode.join('');
    if (entered.length < 6) {
      setErrorMessage('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep('reset');
    }, 500);
  };

  // Reset Password Submit
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep('success');
      setSuccessMessage('Password reset successfully! You can now log in.');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden p-6 md:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-600 via-saffron-500 to-amber-400 text-white shadow-lg shadow-saffron-500/20 mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Bharat<span className="gradient-text-saffron">Voice AI</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Enterprise Multilingual Access & RBAC Portal (Hindi • Marathi • English)
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
          <button
            onClick={() => handleTabSwitch('login')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'login'
                ? 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In (लॉगिन)
          </button>
          <button
            onClick={() => handleTabSwitch('register')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'register'
                ? 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account (खाते तयार करा)
          </button>
          <button
            onClick={() => handleTabSwitch('forgot')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'forgot'
                ? 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Forgot Password (पासवर्ड विसरलात)
          </button>
        </div>

        {/* Alerts & Feedback */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* --- TAB 1: LOGIN --- */}
        {activeTab === 'login' && (
          <div className="space-y-4">
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email or Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. user@bharatvoice.ai or 9823456789"
                    className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => handleTabSwitch('forgot')}
                    className="text-[11px] text-saffron-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full glass-input pl-10 pr-10 py-2.5 rounded-xl text-xs"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-saffron-500 focus:ring-saffron-500 bg-slate-900"
                  />
                  <span>Remember me on this laptop</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-bold text-xs shadow-lg shadow-saffron-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <RotateCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In to BharatVoice AI</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Login Personas */}
            <div className="pt-3 border-t border-slate-800">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                ⚡ Instant One-Click Demo Logins
              </span>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleQuickDemoLogin(user)}
                    className="flex items-center space-x-2 p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-saffron-500/40 text-left transition"
                  >
                    <span className="text-lg">{user.avatar}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-200 truncate">{user.name}</p>
                      <p className="text-[10px] text-saffron-400 capitalize">{user.role.replace('_', ' ')} • {user.preferredLanguage.toUpperCase()}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: CREATE ACCOUNT (REGISTER) --- */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Sunil Kulkarni / प्रिया शर्मा"
                  className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Language</label>
                <select
                  value={regLanguage}
                  onChange={(e) => setRegLanguage(e.target.value as LanguageCode)}
                  className="w-full bg-slate-900 border border-slate-700 text-saffron-400 font-semibold text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">User Persona Role</label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as UserRole)}
                  className="w-full bg-slate-900 border border-slate-700 text-indigo-300 font-semibold text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                >
                  {USER_ROLES.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <label className="flex items-start space-x-2 text-xs text-slate-300 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={regAgreeTerms}
                onChange={(e) => setRegAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 text-saffron-500 focus:ring-saffron-500 bg-slate-900"
              />
              <span>
                I agree to the <span className="text-saffron-400 underline">Terms of Service</span> and consent to regional voice telemetry under AES-256 data protection.
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-bold text-xs shadow-lg shadow-saffron-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Create Account & Start Exploring</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* --- TAB 3: FORGOT PASSWORD --- */}
        {activeTab === 'forgot' && (
          <div className="space-y-4">
            
            {forgotStep === 'request' && (
              <form onSubmit={handleForgotRequestOtp} className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enter your registered email address or mobile number. We will send you an OTP verification code to reset your security credentials.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email or Mobile Number</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={forgotIdentifier}
                      onChange={(e) => setForgotIdentifier(e.target.value)}
                      placeholder="e.g. user@bharatvoice.ai or 9823456789"
                      className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-bold text-xs shadow-lg hover:brightness-110 transition flex items-center justify-center space-x-2"
                >
                  {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <span>Send OTP Verification Code</span>}
                </button>
              </form>
            )}

            {forgotStep === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <p className="text-xs text-slate-300 text-center">
                  Enter the 6-digit verification code sent to <strong className="text-saffron-400">{forgotIdentifier}</strong>:
                </p>

                <div className="flex justify-center gap-2">
                  {otpCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value;
                        const newOtp = [...otpCode];
                        newOtp[index] = val;
                        setOtpCode(newOtp);
                        if (val && index < 5) {
                          const next = document.getElementById(`otp-${index + 1}`);
                          next?.focus();
                        }
                      }}
                      className="w-10 h-12 text-center text-lg font-bold font-mono glass-input rounded-xl border border-slate-700 focus:border-saffron-500"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Resend OTP in: <span className="text-saffron-400 font-mono font-bold">{otpTimer}s</span></span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpCode(['7', '2', '9', '4', '1', '0']);
                      setSuccessMessage('Auto-filled test OTP: 729410');
                    }}
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    Quick Test OTP (729410)
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg hover:brightness-110 transition"
                >
                  {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <span>Verify OTP Code</span>}
                </button>
              </form>
            )}

            {forgotStep === 'reset' && (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 chars)"
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-bold text-xs shadow-lg hover:brightness-110 transition"
                >
                  {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <span>Update & Save Password</span>}
                </button>
              </form>
            )}

            {forgotStep === 'success' && (
              <div className="text-center space-y-4 py-4">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-white">Password Updated Successfully</h3>
                <p className="text-xs text-slate-300">
                  Your credentials have been securely updated. You can now sign in with your new password.
                </p>
                <button
                  onClick={() => handleTabSwitch('login')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 text-white font-bold text-xs shadow-md hover:brightness-110"
                >
                  Go to Sign In
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
