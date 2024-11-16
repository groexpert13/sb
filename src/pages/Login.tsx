import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, ArrowLeft, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithEmail } = useAuth();
  
  const type = searchParams.get('type') || 'personal';
  const [accountType, setAccountType] = useState<'personal' | 'institution'>(type as 'personal' | 'institution');
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('en');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('Attempting to sign in with:', { email: formData.email, accountType });
      const userType = await signInWithEmail(formData.email, formData.password, accountType);
      console.log('Sign in successful, user type:', userType);
      
      // Map 'institution' to 'company' for dashboard routing
      const dashboardType = userType === 'institution' ? 'company' : 'personal';
      console.log('Navigating to dashboard:', dashboardType);
      
      navigate(`/dashboard/${dashboardType}`);
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to sign in');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log('Attempting Google sign in for account type:', accountType);
      await signInWithGoogle(accountType);
      
      // Map 'institution' to 'company' for dashboard routing
      const dashboardType = accountType === 'institution' ? 'company' : 'personal';
      console.log('Navigating to dashboard:', dashboardType);
      
      navigate(`/dashboard/${dashboardType}`);
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast.error(error.message || 'Failed to sign in with Google');
    }
  };

  const translations = {
    en: {
      signIn: 'Sign In',
      personal: 'Personal',
      institution: 'Institution',
      email: 'Email',
      password: 'Password',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      continueWithGoogle: 'Continue with Google',
      orContinueWithEmail: 'Or continue with email'
    },
    ru: {
      signIn: 'Войти',
      personal: 'Личный',
      institution: 'Организация',
      email: 'Эл. почта',
      password: 'Пароль',
      createAccount: 'Создать аккаунт',
      alreadyHaveAccount: 'Уже есть аккаунт?',
      continueWithGoogle: 'Продолжить с Google',
      orContinueWithEmail: 'Или продолжить с почтой'
    },
    uk: {
      signIn: 'Увійти',
      personal: 'Особистий',
      institution: 'Організація',
      email: 'Ел. пошта',
      password: 'Пароль',
      createAccount: 'Створити акаунт',
      alreadyHaveAccount: 'Вже є акаунт?',
      continueWithGoogle: 'Продовжити з Google',
      orContinueWithEmail: 'Або продовжити з поштою'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-indigo-600 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold">{t.signIn}</h1>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-slate-200 rounded-lg px-2 py-1"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="uk">UK</option>
            </select>
          </div>

          <div className="mb-6">
            <div className="flex gap-4 p-1 bg-slate-100 rounded-lg">
              <button
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  accountType === 'personal' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
                onClick={() => setAccountType('personal')}
              >
                {t.personal}
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  accountType === 'institution' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
                onClick={() => setAccountType('institution')}
              >
                {t.institution}
              </button>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full mb-6 flex items-center justify-center gap-2 border border-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            {t.continueWithGoogle}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">{t.orContinueWithEmail}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t.password}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t.signIn}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-slate-500">{t.alreadyHaveAccount} </span>
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700">
              {t.createAccount}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};