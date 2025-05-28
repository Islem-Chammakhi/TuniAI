import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROFILE_OPTIONS = [
  { value: "tourist", label: "Tourist", icon: "🌍" },
  { value: "historian", label: "Historian", icon: "📚" },
  { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
];
const LANGUAGE_OPTIONS = [
  { value: "fr-FR", label: "Français", icon: "🇫🇷" },
  { value: "en-GB", label: "English", icon: "🇬🇧" },
  { value: "es-ES", label: "Español", icon: "🇪🇸" },
  { value: "ar-XA", label: "Arabic", icon: "🇸🇦" },
];

const LS_KEY = "userPreferences";
const DAY_MS = 86400000;

function getStoredPreferences() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data.expiresAt || Date.now() > data.expiresAt) return null;
    return data;
  } catch {
    return null;
  }
}

export default function UserPreferencesModal({
  onSave,
}: {
  onSave?: (prefs: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const prefs = getStoredPreferences();
    if (!prefs) setIsOpen(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !language) return;
    setSubmitting(true);
    const data = {
      profile,
      language,
      expiresAt: Date.now() + DAY_MS,
    };
    localStorage.setItem(LS_KEY, JSON.stringify(data));
    setTimeout(() => {
      setIsOpen(false);
      setSubmitting(false);
      if (onSave) onSave(data);
    }, 400); // match exit animation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-brown/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative flex flex-col gap-8"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <h2 className="text-2xl font-bold font-el-messiri text-terracotta mb-2 text-center">
              Personalize your experience
            </h2>
            <div>
              <label className="block text-dark-brown/80 font-medium mb-2">
                Profile
              </label>
              <div className="flex gap-4 justify-center">
                {PROFILE_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`group flex flex-col items-center px-5 py-4 rounded-xl border-2 transition-all duration-200 shadow-sm focus:outline-none cursor-pointer ${
                      profile === opt.value
                        ? "border-terracotta bg-sand"
                        : "border-sand bg-white hover:bg-sand/60"
                    }`}
                    onClick={() => setProfile(opt.value)}
                  >
                    <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                      {opt.icon}
                    </span>
                    <span className="font-medium text-dark-brown group-hover:text-terracotta">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-dark-brown/80 font-medium mb-2">
                Language
              </label>
              <div className=" gap-4 justify-center grid sm:grid-cols-2 lg:grid-cols-3">
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`group flex flex-col items-center px-5 py-4 rounded-xl border-2 transition-all duration-200 shadow-sm focus:outline-none cursor-pointer ${
                      language === opt.value
                        ? "border-azure-blue bg-sand"
                        : "border-sand bg-white hover:bg-sand/60"
                    }`}
                    onClick={() => setLanguage(opt.value)}
                  >
                    <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                      {opt.icon}
                    </span>
                    <span className="font-medium text-dark-brown group-hover:text-azure-blue">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={!profile || !language || submitting}
              className="mt-4 w-full py-3 rounded-lg bg-terracotta text-white font-semibold text-lg shadow hover:bg-terracotta/90 transition-colors disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save preferences"}
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
