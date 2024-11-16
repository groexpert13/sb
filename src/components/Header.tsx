import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
              Authenchain
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              {t('features')}
            </a>
            <a href="#discover" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              {t('discover')}
            </a>
            <a href="#solutions" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              {t('solutions')}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-slate-700 hover:text-indigo-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-slate-50"
            >
              {t('signIn')}
            </Link>
            <Link 
              to="/register" 
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              {t('getStarted')}
            </Link>
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
        </div>
      </div>
    </header>
  );
};