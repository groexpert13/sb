import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Check, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signInWithGoogle, registerWithEmail } = useAuth();
  
  const type = searchParams.get('type') || 'personal';
  const [accountType, setAccountType] = useState<'personal' | 'institution'>(type as 'personal' | 'institution');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validatePassword = (password: string) => {
    const requirements = [
      { test: /.{8,}/, text: 'At least 8 characters' },
      { test: /[A-Z]/, text: 'One uppercase letter' },
      { test: /[a-z]/, text: 'One lowercase letter' },
      { test: /[0-9]/, text: 'One number' },
      { test: /[^A-Za-z0-9]/, text: 'One special character' }
    ];

    return requirements.map(req => ({
      met: req.test.test(password),
      text: req.text
    }));
  };

  const passwordRequirements = validatePassword(formData.password);
  const isPasswordValid = passwordRequirements.every(req => req.met);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid) {
      toast.error('Please meet all password requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await registerWithEmail({
        email: formData.email,
        password: formData.password,
        fullName: accountType === 'personal' ? formData.fullName : undefined,
        companyName: accountType === 'institution' ? formData.companyName : undefined,
        accountType
      });
      
      navigate(`/dashboard/${accountType}`);
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(accountType);
      navigate(`/dashboard/${accountType}`);
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast.error(error.message || 'Failed to sign in with Google');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-indigo-600 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold">Create Account</h1>
          </div>

          <div className="mb-6">
            <div className="flex gap-4 p-1 bg-slate-100 rounded-lg">
              <button
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  accountType === 'personal' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
                onClick={() => setAccountType('personal')}
              >
                Personal
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  accountType === 'institution' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
                onClick={() => setAccountType('institution')}
              >
                Institution
              </button>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full mb-6 flex items-center justify-center gap-2 border border-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {accountType === 'personal' ? (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter company name"
                  required
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
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
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Create a password"
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
              {isPasswordFocused && (
                <div className="mt-2 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {req.met ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span className={req.met ? 'text-green-700' : 'text-red-700'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isPasswordValid}
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-slate-500">Already have an account? </span>
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};