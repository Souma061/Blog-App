import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="ml-3 px-4 py-2 rounded-xl border-2 border-blue-400 dark:border-purple-500 bg-white/60 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 shadow-lg backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 hover:border-blue-600 dark:hover:border-purple-400 cursor-pointer"
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  );
}
