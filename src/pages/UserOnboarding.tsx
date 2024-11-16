import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export const UserOnboarding = () => {
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
            <h1 className="text-2xl font-bold">Create Your Digital Portfolio</h1>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-slate-600">
              Authenchain is your digital organizer for managing your achievements. Get NFT certificates
              from educational institutions, companies and organizations that validate your skills and knowledge.
              Certificates are securely stored on the blockchain, ensuring their authenticity and data protection.
            </p>
          </div>

          <div className="space-y-6">
            <Link 
              to="/register"
              className="block w-full bg-indigo-600 text-white text-center px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
            <div className="text-center">
              <span className="text-slate-500">Already have an account? </span>
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};