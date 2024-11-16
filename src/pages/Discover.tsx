import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Course {
  id: string;
  title: string;
  provider: string;
  location: {
    country?: string;
    city?: string;
    type: 'online' | 'local';
  };
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface DiscoverProps {
  showHeader?: boolean;
}

export const Discover: React.FC<DiscoverProps> = ({ showHeader = true }) => {
  const { language, setLanguage, t } = useLanguage();
  const [filters, setFilters] = useState({
    country: '',
    city: '',
    type: '',
    priceRange: '',
    rating: '',
    category: ''
  });

  const countries = ['Ukraine', 'Poland', 'Bulgaria', 'Kazakhstan', 'Kyrgyzstan'];
  
  const cities = {
    Ukraine: ['Kyiv', 'Kropyvnytskyi', 'Lviv', 'Kharkiv', 'Odesa', 'Dnipro'],
    Poland: ['Warsaw', 'Krakow', 'Gdansk'],
    Bulgaria: ['Sofia', 'Plovdiv', 'Varna'],
    Kazakhstan: ['Almaty', 'Astana', 'Shymkent'],
    Kyrgyzstan: ['Bishkek', 'Osh', 'Jalal-Abad']
  };

  const courses: Course[] = [
    {
      id: '1',
      title: 'Web Development Bootcamp',
      provider: 'Tech Academy',
      location: { type: 'online' },
      price: 499,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Barbering Course',
      provider: 'Style Masters',
      location: {
        country: 'Ukraine',
        city: 'Kropyvnytskyi',
        type: 'local'
      },
      price: 299,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1',
      category: 'Beauty'
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      // Reset city when country changes
      ...(key === 'country' && { city: '' })
    }));
  };

  const filteredCourses = courses.filter(course => {
    if (filters.type && filters.type !== course.location.type) return false;
    if (filters.country && course.location.type === 'local' && course.location.country !== filters.country) return false;
    if (filters.city && course.location.type === 'local' && course.location.city !== filters.city) return false;
    if (filters.rating && course.rating < parseInt(filters.rating)) return false;
    if (filters.category && course.category !== filters.category) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (course.price < min || course.price > max) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {showHeader && (
          <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="text-slate-600 hover:text-indigo-600">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold">{t('discoverCourses')}</h1>
            <div className="ml-auto">
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
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full rounded-lg border-slate-200"
              >
                <option value="">All Types</option>
                <option value="online">Online</option>
                <option value="local">Local</option>
              </select>
            </div>

            {filters.type === 'local' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Country
                  </label>
                  <select
                    value={filters.country}
                    onChange={(e) => handleFilterChange('country', e.target.value)}
                    className="w-full rounded-lg border-slate-200"
                  >
                    <option value="">All Countries</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {filters.country && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      City
                    </label>
                    <select
                      value={filters.city}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                      className="w-full rounded-lg border-slate-200"
                    >
                      <option value="">All Cities</option>
                      {cities[filters.country as keyof typeof cities]?.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full rounded-lg border-slate-200"
              >
                <option value="">Any Price</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="1000-5000">$1000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full rounded-lg border-slate-200"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+</option>
                <option value="4.0">4.0+</option>
                <option value="3.5">3.5+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full rounded-lg border-slate-200"
              >
                <option value="">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Beauty">Beauty</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-indigo-600">{course.category}</span>
                  <span className="flex items-center gap-1 text-sm">
                    ⭐️ {course.rating}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{course.provider}</span>
                  <span>${course.price}</span>
                </div>
                {course.location.type === 'local' && (
                  <div className="mt-2 text-sm text-slate-500">
                    📍 {course.location.city}, {course.location.country}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};