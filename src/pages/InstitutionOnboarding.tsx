import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const InstitutionOnboarding = () => {
  const benefits = [
    'Issue blockchain-verified NFT certificates',
    'Automate certification processes',
    'Reduce administrative costs',
    'Build trust with modern technology',
    'Reach more students globally'
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-indigo-600 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold">For Educational Institutions</h1>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-slate-600">
              Authenchain offers a robust solution to automate the certification process. Issue
              NFT certificates to your students, employees or customers, ensuring their
              protection and authenticity via blockchain.
            </p>

            <ul className="space-y-3 mt-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <Link 
              to="/register?type=institution"
              className="block w-full bg-indigo-600 text-white text-center px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
            <div className="text-center">
              <span className="text-slate-500">Already registered? </span>
              <Link to="/login?type=institution" className="text-indigo-600 hover:text-indigo-700">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};