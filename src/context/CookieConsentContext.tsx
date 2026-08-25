import React, { createContext, useContext, useState, useEffect } from 'react';
import { CookieConsentPreferences } from '../types';

interface CookieConsentContextType {
  preferences: CookieConsentPreferences;
  isBannerOpen: boolean;
  isPreferencesModalOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  saveCustomPreferences: (prefs: { analytics: boolean; marketing: boolean }) => void;
  openPreferencesModal: () => void;
  closePreferencesModal: () => void;
  resetConsent: () => void;
}

const STORAGE_KEY = 'ponto_financeiro_cookie_consent_v1';

const defaultPreferences: CookieConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: '',
  hasInteracted: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to read cookie consent from storage', e);
    }
    return defaultPreferences;
  });

  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);

  useEffect(() => {
    if (!preferences.hasInteracted) {
      // Delay showing slightly for smooth initial rendering
      const timer = setTimeout(() => setIsBannerOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, [preferences.hasInteracted]);

  const saveAndApply = (newPrefs: CookieConsentPreferences) => {
    setPreferences(newPrefs);
    setIsBannerOpen(false);
    setIsPreferencesModalOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    } catch (e) {
      console.error('Failed to save cookie consent', e);
    }
  };

  const acceptAll = () => {
    saveAndApply({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      hasInteracted: true,
    });
  };

  const rejectNonEssential = () => {
    saveAndApply({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      hasInteracted: true,
    });
  };

  const saveCustomPreferences = ({ analytics, marketing }: { analytics: boolean; marketing: boolean }) => {
    saveAndApply({
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
      hasInteracted: true,
    });
  };

  const openPreferencesModal = () => {
    setIsPreferencesModalOpen(true);
  };

  const closePreferencesModal = () => {
    setIsPreferencesModalOpen(false);
  };

  const resetConsent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPreferences(defaultPreferences);
    setIsBannerOpen(true);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        isBannerOpen,
        isPreferencesModalOpen,
        acceptAll,
        rejectNonEssential,
        saveCustomPreferences,
        openPreferencesModal,
        closePreferencesModal,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
