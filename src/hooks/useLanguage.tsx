import { createContext, useContext, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  t: (typeof translations)[Language];
  otherLang: Language;
  otherLangPath: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  // Determine language from URL path - Italian is primary (/)
  const lang: Language = location.pathname.startsWith("/de")
    ? "de"
    : location.pathname.startsWith("/fr")
      ? "fr"
      : location.pathname.startsWith("/en")
        ? "en"
        : "it";

  const t = translations[lang];

  // For language switcher, show next language in cycle: it -> de -> fr -> en -> it
  const langCycle: Record<Language, { next: Language; path: string }> = {
    it: { next: "de", path: "/de" },
    de: { next: "fr", path: "/fr" },
    fr: { next: "en", path: "/en" },
    en: { next: "it", path: "/" },
  };

  const otherLang = langCycle[lang].next;
  const otherLangPath = langCycle[lang].path;

  return (
    <LanguageContext.Provider value={{ lang, t, otherLang, otherLangPath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
