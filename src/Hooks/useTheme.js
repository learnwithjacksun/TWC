import { useEffect, useState } from "react";

const useTheme = () => {
  const getInitialTheme = () => {
    const savedDarkMode = localStorage.getItem("darkMode");
    
    // Check for saved preference in localStorage
    if (savedDarkMode !== null) {
      return savedDarkMode === "true";
    }
    
    // If no saved preference, check system preference
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#20212d");
    } else {
      document.body.classList.remove("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#fefefe");
    }
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return { darkMode, toggleDarkMode };
};

export default useTheme;
