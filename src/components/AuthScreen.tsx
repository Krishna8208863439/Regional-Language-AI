import React, { useState } from 'react';
import { 
  Volume2, 
  ShieldCheck, 
  Globe, 
  Sun, 
  Moon, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  Zap
} from 'lucide-react';
import { LanguageCode, UserRole, UserAccount } from '../types';
import { SUPPORTED_LANGUAGES, USER_ROLES, DEMO_USERS } from '../data/mockData';
import { UI_TRANSLATIONS } from '../data/translations';

interface AuthScreenProps {
  selectedLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  selectedLanguage,
  onLanguageChange,
  isDarkMode,
  onToggleTheme,
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>('register');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Login inputs with pre-filled demo
  const [loginIdentifier, setLoginIdentifier] = useState('aarav@bharatvoice.ai');
  const [loginPassword, setLoginPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(true);

  // Register inputs with pre-filled smart placeholders
  const [regName, setRegName] = useState('Aarav Deshmukh / आरव देशमुख');
  const [regEmail, setRegEmail] = useState('aarav@bharatvoice.ai');
  const [regPhone, setRegPhone] = useState('+91 98234 11223');
  const [regLanguage, setRegLanguage] = useState<LanguageCode>(selectedLanguage);
  const [regRole, setRegRole] = useState<UserRole>('citizen');
  const [regPassword, setRegPassword] = useState('123456');
  const [regConfirmPassword, setRegConfirmPassword] = useState('123456');
  const [regAgreeTerms, setRegAgreeTerms] = useState(true);

  // Forgot password inputs
  const [forgotStep, setForgotStep] = useState<'request' | 'otp' | 'reset' | 'success'>('request');
  const [forgotIdentifier, setForgotIdentifier] = useState('aarav@bharatvoice.ai');
  const [otpCode, setOtpCode] = useState(['7', '2', '9', '4', '1', '0']);
  const [otpTimer, setOtpTimer] = useState(45);
  const [newPassword, setNewPassword] = useState('123456');
  const [confirmNewPassword, setConfirmNewPassword] = useState('123456');

  const t = UI_TRANSLATIONS[selectedLanguage] || UI_TRANSLATIONS.mr;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const resetMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleTabSwitch = (tab: 'login' | 'register' | 'forgot') => {
    resetMessages();
    setActiveTab(tab);
    if (tab === 'forgot') setForgotStep('request');
  };

  // Instant 1-Click Login for Guest / Demo
  const handleQuickDemoLogin = (demoUser?: UserAccount) => {
    setIsLoading(true);
    resetMessages();
    const userToLogin = demoUser || DEMO_USERS[0];
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        ...userToLogin,
        preferredLanguage: selectedLanguage,
        isLoggedIn: true
      });
    }, 200);
  };

  // Sign In Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const email = loginIdentifier.trim() || 'user@bharatvoice.ai';
      const matched = DEMO_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() || u.phone?.includes(email)
      );

      const user: UserAccount = matched || {
        id: `user-${Date.now()}`,
        name: email.split('@')[0] || 'User',
        email: email.includes('@') ? email : `${email}@bharatvoice.ai`,
        phone: '+91 98234 11223',
        role: 'citizen',
        preferredLanguage: selectedLanguage,
        avatar: '👤',
        createdAt: new Date().toISOString().split('T')[0],
        isLoggedIn: true
      };

      onLoginSuccess(user);
    }, 300);
  };

  // Register / Create Account Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const name = regName.trim() || 'Aarav Deshmukh';
      const email = regEmail.trim() || 'aarav@bharatvoice.ai';

      const newUser: UserAccount = {
        id: `user-${Date.now()}`,
        name: name,
        email: email,
        phone: regPhone.trim() || '+91 98234 11223',
        role: regRole,
        preferredLanguage: regLanguage || selectedLanguage,
        avatar: '🌟',
        createdAt: new Date().toISOString().split('T')[0],
        isLoggedIn: true
      };

      onLoginSuccess(newUser);
    }, 300);
  };

  // Forgot password OTP Request
  const handleForgotRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep('otp');
      setSuccessMessage(`${forgotIdentifier} वर ६ अंकी पडताळणी कोड पाठवला आहे.`);
      setOtpTimer(45);
    }, 300);
  };

  // Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep('reset');
    }, 300);
  };

  // Reset Password Submit
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep('success');
      setSuccessMessage(selectedLanguage === 'mr' ? 'पासवर्ड यशस्वीरित्या बदलला! आता लॉगिन करा.' : 'Password reset successful! Please sign in.');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navbar */}
      <header className="glass-panel border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-600 via-saffron-500 to-amber-400 text-white shadow-lg shadow-saffron-500/20">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white font-indic">
              Bharat<span className="gradient-text-saffron">Voice AI</span>
            </span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 hidden sm:block font-indic">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Live Language Switcher */}
          <div className="flex bg-white dark:bg-slate-900/80 p-1 rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm">
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedLanguage === lang.code
                    ? 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            title={isDarkMode ? t.toggleThemeLight : t.toggleThemeDark}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </header>

      {/* Main Authentication Grid */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Hero & Feature Highlights */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-saffron-500/10 border border-saffron-500/30 text-saffron-600 dark:text-saffron-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>मराठी • हिन्दी • English AI Platform</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight font-indic">
              {t.authHeroTitle}
            </h1>

            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-indic">
              {t.authHeroSubtitle}
            </p>

            {/* Feature Bullet Cards */}
            <div className="space-y-3 pt-2">
              {t.authHeroFeatures.map((feat, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start space-x-3.5">
                  <div className="p-2 rounded-xl bg-saffron-500/15 text-saffron-600 dark:text-saffron-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-indic">{feat.title}</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 font-indic">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>


          </div>

          {/* Right Auth Card Form */}
          <div className="lg:col-span-6">
            <div className="bg-white dark:bg-slate-900/90 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl space-y-5">
              
              {/* Card Tabs */}
              <div className="flex bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => handleTabSwitch('register')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'register'
                      ? 'bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white shadow-lg shadow-saffron-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {t.createAccount}
                </button>
                <button
                  onClick={() => handleTabSwitch('login')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'login'
                      ? 'bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white shadow-lg shadow-saffron-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {t.signIn}
                </button>
                <button
                  onClick={() => handleTabSwitch('forgot')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'forgot'
                      ? 'bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white shadow-lg shadow-saffron-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {t.forgotPassword}
                </button>
              </div>

              {/* Feedback messages */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* --- 1. CREATE ACCOUNT TAB --- */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {selectedLanguage === 'mr' ? 'पूर्ण नाव (Full Name)' : selectedLanguage === 'hi' ? 'पूरा नाम (Full Name)' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Ramesh Patil / सुनील शर्मा"
                        className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs font-indic bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Mobile Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="+91 98234 56789"
                          className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.selectLanguage}</label>
                      <select
                        value={regLanguage}
                        onChange={(e) => {
                          const l = e.target.value as LanguageCode;
                          setRegLanguage(l);
                          onLanguageChange(l);
                        }}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-saffron-600 dark:text-saffron-400 font-bold text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                      >
                        {SUPPORTED_LANGUAGES.map(lang => (
                          <option key={lang.code} value={lang.code}>
                            {lang.nativeName} ({lang.name})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.selectPersona}</label>
                      <select
                        value={regRole}
                        onChange={(e) => setRegRole(e.target.value as UserRole)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-300 font-bold text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                      >
                        {USER_ROLES.map(role => (
                          <option key={role.id} value={role.id}>
                            {t.roles[role.id]?.label || role.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min 6 chars"
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                        required
                      />
                    </div>
                  </div>

                  {/* Terms & Conditions Checkbox (Clickable whole area) */}
                  <div 
                    onClick={() => setRegAgreeTerms(!regAgreeTerms)}
                    className="flex items-start space-x-2.5 text-xs text-slate-700 dark:text-slate-300 pt-1 cursor-pointer p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition select-none"
                  >
                    <input
                      type="checkbox"
                      checked={regAgreeTerms}
                      onChange={(e) => setRegAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-400 text-saffron-500 focus:ring-saffron-500 bg-white dark:bg-slate-900 cursor-pointer"
                    />
                    <span className="leading-tight">
                      {selectedLanguage === 'mr'
                        ? 'मी भारतवाणी AI च्या नियम व अटी मान्य करतो आणि AES-256 डेटा संरक्षणास संमती देतो.'
                        : selectedLanguage === 'hi'
                        ? 'मैं भारतवाणी AI के नियम एवं शर्तों को स्वीकार करता हूँ।'
                        : 'I agree to the Terms of Service and consent to AES-256 protected regional processing.'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-black text-xs shadow-xl shadow-saffron-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <RotateCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>{t.createAccount} & Unlock Website</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* --- 2. SIGN IN TAB --- */}
              {activeTab === 'login' && (
                <div className="space-y-4">
                  <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {selectedLanguage === 'mr' ? 'ईमेल किंवा मोबाईल क्रमांक' : selectedLanguage === 'hi' ? 'ईमेल या मोबाइल नंबर' : 'Email or Mobile Number'}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                          placeholder="e.g. user@bharatvoice.ai or 9823456789"
                          className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs font-indic bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                        <button
                          type="button"
                          onClick={() => handleTabSwitch('forgot')}
                          className="text-[11px] text-saffron-600 dark:text-saffron-400 hover:underline font-semibold"
                        >
                          {t.forgotPassword}
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter account password"
                          className="w-full glass-input pl-10 pr-10 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center space-x-2 cursor-pointer text-slate-600 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-slate-300 dark:border-slate-700 text-saffron-500 focus:ring-saffron-500 bg-slate-50 dark:bg-slate-900"
                        />
                        <span>{t.rememberMe}</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-black text-xs shadow-xl shadow-saffron-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isLoading ? (
                        <RotateCcw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>{t.signIn}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* One-Click Quick Demo Persona Logins */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                    <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 text-center">
                      ⚡ Instant One-Click Demo Access
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {DEMO_USERS.map((user) => (
                        <button
                          key={user.id}
                          type="button"
                          onClick={() => handleQuickDemoLogin(user)}
                          className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-saffron-500/50 text-left transition cursor-pointer"
                        >
                          <span className="text-xl">{user.avatar}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate">{user.name}</p>
                            <p className="text-[10px] text-saffron-600 dark:text-saffron-400 capitalize font-medium">{user.role.replace('_', ' ')}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- 3. FORGOT PASSWORD TAB --- */}
              {activeTab === 'forgot' && (
                <div className="space-y-4">
                  {forgotStep === 'request' && (
                    <form onSubmit={handleForgotRequestOtp} className="space-y-4">
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-indic">
                        {selectedLanguage === 'mr'
                          ? 'आपला नोंदणीकृत ईमेल किंवा मोबाईल नंबर टाका. आम्ही OTP पाठवू.'
                          : 'Enter your registered email or mobile to receive OTP verification.'}
                      </p>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email or Mobile Number</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="text"
                            value={forgotIdentifier}
                            onChange={(e) => setForgotIdentifier(e.target.value)}
                            placeholder="e.g. user@bharatvoice.ai or 9823456789"
                            className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 text-white font-bold text-xs shadow-lg transition cursor-pointer"
                      >
                        {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <span>Send OTP Code (ओटीपी पाठवा)</span>}
                      </button>
                    </form>
                  )}

                  {forgotStep === 'otp' && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <p className="text-xs text-slate-700 dark:text-slate-300 text-center font-indic">
                        {forgotIdentifier} वर पाठवलेला ६ अंकी OTP टाका:
                      </p>

                      <div className="flex justify-center gap-2">
                        {otpCode.map((digit, index) => (
                          <input
                            key={index}
                            id={`auth-otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const val = e.target.value;
                              const newOtp = [...otpCode];
                              newOtp[index] = val;
                              setOtpCode(newOtp);
                              if (val && index < 5) {
                                const next = document.getElementById(`auth-otp-${index + 1}`);
                                next?.focus();
                              }
                            }}
                            className="w-10 h-12 text-center text-lg font-bold font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-300 dark:border-slate-700 focus:border-saffron-500"
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                        <span>Resend in: <span className="text-saffron-600 dark:text-saffron-400 font-mono font-bold">{otpTimer}s</span></span>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpCode(['7', '2', '9', '4', '1', '0']);
                            setSuccessMessage('Auto-filled OTP: 729410');
                          }}
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
                        >
                          Auto Fill (729410)
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg transition cursor-pointer"
                      >
                        {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <span>Verify OTP (पडताळणी करा)</span>}
                      </button>
                    </form>
                  )}

                  {forgotStep === 'reset' && (
                    <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 text-white font-bold text-xs shadow-lg transition cursor-pointer"
                      >
                        {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <span>Update Password</span>}
                      </button>
                    </form>
                  )}

                  {forgotStep === 'success' && (
                    <div className="text-center space-y-4 py-4">
                      <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white font-indic">पासवर्ड यशस्वीरित्या बदलला आहे!</h3>
                      <button
                        onClick={() => handleTabSwitch('login')}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 text-white font-bold text-xs shadow-md cursor-pointer"
                      >
                        Go to Sign In (लॉगिन करा)
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-slate-600 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800">
        BharatVoice AI • {t.encrypted} • Marathi • Hindi • English Multilingual Intelligence
      </footer>

    </div>
  );
};
