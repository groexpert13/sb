import React, { createContext, useContext, useState } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    home: 'Home',
    myCard: 'My Card',
    students: 'Students',
    docs: 'Documentation',
    settings: 'Settings',
    addCourse: 'Add Course',
    addStudent: 'Add Student',
    viewAll: 'View All',
    organization: 'My Organization',
    feedback: 'Feedback',
    awardCertificate: 'Award Certificate',
    createNew: 'Create New',
    usedCertificates: 'Used certificates',
    unverified: 'Unverified',
    verified: 'Verified',
    scanQR: 'Scan QR',
    notifications: 'Notifications'
  },
  ru: {
    home: 'Главная',
    myCard: 'Моя карта',
    students: 'Студенты',
    docs: 'Документация',
    settings: 'Настройки',
    addCourse: 'Добавить курс',
    addStudent: 'Добавить студента',
    viewAll: 'Смотреть все',
    organization: 'Моя организация',
    feedback: 'Отзывы',
    awardCertificate: 'Выдать сертификат',
    createNew: 'Создать новый',
    usedCertificates: 'Использовано сертификатов',
    unverified: 'Не подтверждено',
    verified: 'Подтверждено',
    scanQR: 'Сканировать QR',
    notifications: 'Уведомления'
  },
  uk: {
    home: 'Головна',
    myCard: 'Моя картка',
    students: 'Студенти',
    docs: 'Документація',
    settings: 'Налаштування',
    addCourse: 'Додати курс',
    addStudent: 'Додати студента',
    viewAll: 'Дивитись усі',
    organization: 'Моя організація',
    feedback: 'Відгуки',
    awardCertificate: 'Видати сертифікат',
    createNew: 'Створити новий',
    usedCertificates: 'Використано сертифікатів',
    unverified: 'Не підтверджено',
    verified: 'Підтверджено',
    scanQR: 'Сканувати QR',
    notifications: 'Сповіщення'
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};