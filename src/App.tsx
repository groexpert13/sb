import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Shield, GraduationCap, Building2, ChevronRight, CheckCircle2, Award, Lock, Zap, Search, Share2, BookOpen, User } from 'lucide-react';
import { Header } from './components/Header';
import { UserOnboarding } from './pages/UserOnboarding';
import { InstitutionOnboarding } from './pages/InstitutionOnboarding';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { PersonalDashboard } from './pages/PersonalDashboard';
import { CompanyDashboard } from './pages/CompanyDashboard';
import { Discover } from './pages/Discover';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
              Your Digital Achievement Portfolio
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Store, showcase, and verify your certificates on the blockchain. Discover top courses and connect with leading educational institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/user-onboarding"
                className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                Create Your Portfolio
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/institution-onboarding"
                className="border border-slate-200 text-slate-800 px-8 py-3 rounded-full hover:bg-slate-50 transition-colors"
              >
                For Institutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Everything You Need</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <User className="w-8 h-8 text-indigo-600" />,
                title: "Personal Portfolio",
                description: "Create your digital portfolio to showcase all your achievements"
              },
              {
                icon: <Search className="w-8 h-8 text-indigo-600" />,
                title: "Course Discovery",
                description: "Find and compare courses from verified institutions"
              },
              {
                icon: <Share2 className="w-8 h-8 text-indigo-600" />,
                title: "Easy Sharing",
                description: "Share your certificates and portfolio with employers"
              },
              {
                icon: <Lock className="w-8 h-8 text-indigo-600" />,
                title: "Blockchain Security",
                description: "Your certificates are secured by blockchain technology"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section id="discover" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Discover Learning Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                category: "Technology",
                title: "Blockchain Development",
                provider: "Tech Academy",
                rating: "4.8"
              },
              {
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                category: "Business",
                title: "Digital Marketing",
                provider: "Business School",
                rating: "4.9"
              },
              {
                image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                category: "Design",
                title: "UX/UI Design",
                provider: "Design Institute",
                rating: "4.7"
              }
            ].map((course, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="text-sm text-indigo-600 mb-2">{course.category}</div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{course.provider}</span>
                    <span className="flex items-center gap-1">
                      ⭐️ {course.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/discover" className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors">
              Explore All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Solutions for Everyone</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <User className="w-12 h-12 text-indigo-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">For Certificate Holders</h3>
              <ul className="space-y-4">
                {[
                  "Create your digital portfolio",
                  "Store all certificates securely",
                  "Share achievements easily",
                  "Discover new opportunities"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <Building2 className="w-12 h-12 text-indigo-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">For Certificate Issuers</h3>
              <ul className="space-y-4">
                {[
                  "Issue blockchain certificates",
                  "Showcase your courses",
                  "Reach more students",
                  "Analytics and insights"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Digital Certificate Journey</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of users and organizations on Authenchain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors"
            >
              Create Portfolio
            </Link>
            <Link
              to="/register?type=institution"
              className="border border-white text-white px-8 py-3 rounded-full hover:bg-indigo-500 transition-colors"
            >
              Issue Certificates
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-indigo-400" />
                <span className="text-white font-bold">Authenchain</span>
              </div>
              <p className="text-sm">
                The platform for digital achievements and learning opportunities.
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: [
                  { text: "Portfolio", to: "/dashboard/personal" },
                  { text: "Discover", to: "/discover" },
                  { text: "Certificates", to: "/certificates" },
                  { text: "Pricing", to: "/pricing" }
                ]
              },
              {
                title: "Company",
                links: [
                  { text: "About", to: "/about" },
                  { text: "Blog", to: "/blog" },
                  { text: "Careers", to: "/careers" },
                  { text: "Contact", to: "/contact" }
                ]
              },
              {
                title: "Legal",
                links: [
                  { text: "Privacy", to: "/privacy" },
                  { text: "Terms", to: "/terms" },
                  { text: "Security", to: "/security" },
                  { text: "Compliance", to: "/compliance" }
                ]
              }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.to}
                        className="hover:text-white transition-colors"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            © {new Date().getFullYear()} Authenchain. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user-onboarding" element={<UserOnboarding />} />
      <Route path="/institution-onboarding" element={<InstitutionOnboarding />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/personal" element={<PersonalDashboard />} />
      <Route path="/dashboard/company" element={<CompanyDashboard />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/about" element={<div>About Page</div>} />
      <Route path="/blog" element={<div>Blog Page</div>} />
      <Route path="/careers" element={<div>Careers Page</div>} />
      <Route path="/contact" element={<div>Contact Page</div>} />
      <Route path="/privacy" element={<div>Privacy Policy</div>} />
      <Route path="/terms" element={<div>Terms of Service</div>} />
      <Route path="/security" element={<div>Security</div>} />
      <Route path="/compliance" element={<div>Compliance</div>} />
      <Route path="/certificates" element={<div>Certificates</div>} />
      <Route path="/pricing" element={<div>Pricing</div>} />
    </Routes>
  );
}

export default App;