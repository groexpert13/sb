import React, { useState } from 'react';
import { Shield, Home, CreditCard, Users, FileText, Settings, Plus, AlertTriangle } from 'lucide-react';
import { DashboardHeader } from '../components/DashboardHeader';
import { useLanguage } from '../contexts/LanguageContext';

export const CompanyDashboard = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [isVerified, setIsVerified] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-center gap-3 text-amber-800">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-semibold">Verification Required</h3>
              </div>
              <p className="mt-2 text-amber-700">
                Please complete the verification process to unlock all features.
              </p>
              <button className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                Start Verification
              </button>
            </div>
          </div>
        );
      
      case 'home':
      default:
        return (
          <>
            {/* Verification Status */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-5 h-5 ${isVerified ? 'text-green-500' : 'text-amber-500'}`} />
                  <span className={`font-medium ${isVerified ? 'text-green-700' : 'text-amber-600'}`}>
                    {isVerified ? t('verified') : t('unverified')}
                  </span>
                </div>
                {!isVerified && (
                  <button 
                    onClick={() => setActiveSection('settings')}
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Complete Verification
                  </button>
                )}
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-4">{t('awardCertificate')}</h3>
                <button className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  {t('createNew')}
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-4">{t('addCourse')}</h3>
                <button className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  {t('addCourse')}
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-4">{t('students')}</h3>
                <button className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  {t('addStudent')}
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-4">{t('organization')}</h3>
                <button className="w-full bg-slate-100 text-slate-700 rounded-lg py-2 px-4 hover:bg-slate-200 transition-colors">
                  {t('viewAll')}
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-4">{t('feedback')}</h3>
                <button className="w-full bg-slate-100 text-slate-700 rounded-lg py-2 px-4 hover:bg-slate-200 transition-colors">
                  {t('viewAll')}
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader showSearch={true} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between py-3">
            {[
              { icon: Home, label: t('home'), section: 'home' },
              { icon: CreditCard, label: t('myCard'), section: 'card' },
              { icon: Users, label: t('students'), section: 'students' },
              { icon: FileText, label: t('docs'), section: 'docs' },
              { icon: Settings, label: t('settings'), section: 'settings' }
            ].map(({ icon: Icon, label, section }) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex flex-col items-center gap-1 ${
                  activeSection === section ? 'text-indigo-600' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};