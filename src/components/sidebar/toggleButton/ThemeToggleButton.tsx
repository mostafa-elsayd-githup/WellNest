import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [dark, setDark] = useState<boolean>(() => {
    const dark = localStorage.getItem("Theme");
    return dark === "dark";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("Theme", dark ? "dark" : "light");
  }, [dark]);
  const changeTheme = () => {
    setDark((t) => !t);
  };
  return (
    <div>
      <button
        className="bg-(--bg-card) p-2 cursor-pointer rounded-[50%]"
        type="button"
        onClick={changeTheme}
      >
        {dark ? (
          <FontAwesomeIcon icon={faMoon} className="text-[#a1d7eb]" />
        ) : (
          <FontAwesomeIcon icon={faSun} className="text-[#f7ba21]" />
        )}
      </button>
    </div>
  );
}
