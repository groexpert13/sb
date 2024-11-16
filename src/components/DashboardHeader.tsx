import React, { useState } from 'react';
import { Shield, QrCode, Bell, LogOut, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SearchById } from './SearchById';

interface DashboardHeaderProps {
  showSearch?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ showSearch = false }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = (id: string) => {
    console.log('Searching for ID:', id);
    setShowSearchModal(false);
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-600" />
            <span className="text-lg font-semibold">Authenchain</span>
          </div>
          <div className="flex items-center gap-4">
            {showSearch && (
              <button
                onClick={() => setShowSearchModal(true)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search by ID</span>
              </button>
            )}
            <button
              className="p-2 hover:bg-slate-100 rounded-full"
              title={t('scanQR')}
            >
              <QrCode className="w-5 h-5 text-slate-600" />
            </button>
            <button
              className="p-2 hover:bg-slate-100 rounded-full"
              title={t('notifications')}
            >
              <Bell className="w-5 h-5 text-slate-600" />
            </button>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-slate-200 rounded-lg px-2 py-1"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="uk">UK</option>
            </select>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-slate-100 rounded-full text-red-500"
              title={t('logout')}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {showSearchModal && (
        <SearchById
          onSearch={handleSearch}
          onClose={() => setShowSearchModal(false)}
        />
      )}
    </>
  );
};