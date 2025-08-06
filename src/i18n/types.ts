import * as hindiLanguge from "./locales/hi.json";
import * as gbEnglishLanguage from "./locales/en-GB.json";
import * as usElishLanguage from "./locales/en-US.json";

export type Language = "en-GB" | "en-US" | "hi";

export const DEFAULT_LANGUAGE_CODE: Language = "en-US";

export const languages: Language[] = ["en-GB", "en-US", "hi"];

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const translationConfig = {
  resources: {
    "en-US": usElishLanguage,
    "en-GB": gbEnglishLanguage,
    "hi": hindiLanguge,
  },
  fallbackLng: DEFAULT_LANGUAGE_CODE,
  supportedLngs: languages,
  lng: DEFAULT_LANGUAGE_CODE, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
  // if you're using a language detector, do not define the lng option
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
};

export const languageNames: Record<Language, string> = {
  "en-GB": "English (UK)",
  "en-US": "English (US)",
  "hi": "हिंदी",
};

