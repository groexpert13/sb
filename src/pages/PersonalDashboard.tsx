import React, { useState } from 'react';
import { Home, CreditCard, Search, FileText, Settings } from 'lucide-react';
import { DashboardHeader } from '../components/DashboardHeader';
import { Discover } from './Discover';

export const PersonalDashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  const certificates = [
    { id: 1, title: "Web Development", date: "2024-03-15" },
    { id: 2, title: "Blockchain Basics", date: "2024-02-20" },
    { id: 3, title: "Digital Marketing", date: "2024-01-10" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'search':
        return <Discover showHeader={false} />;
      // ... rest of the cases remain the same
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {certificates.map(cert => (
              <div key={cert.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">{cert.title}</h3>
                <p className="text-sm text-slate-500">Issued: {cert.date}</p>
              </div>
            ))}
            <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-dashed border-slate-200 flex items-center justify-center">
              <span className="text-slate-400">My Card</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between py-3">
            {[
              { icon: Home, label: 'Home', section: 'home' },
              { icon: CreditCard, label: 'My Card', section: 'card' },
              { icon: Search, label: 'Search', section: 'search' },
              { icon: FileText, label: 'Documentation', section: 'docs' },
              { icon: Settings, label: 'Settings', section: 'settings' }
            ].map(({ icon: Icon, label, section }) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex flex-col items-center gap-1 ${
                  activeSection === section ? 'text-indigo-600' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};