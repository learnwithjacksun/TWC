import { useEffect, useState } from "react"


const useTheme = () => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true")

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
  return {darkMode, toggleDarkMode}
}

export default useTheme