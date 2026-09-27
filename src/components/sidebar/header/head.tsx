import {
  faBell,
  faGear,
  // faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router";
import ThemeToggleButton from "../toggleButton/ThemeToggleButton";
function Header() {
  const pageName = useLocation();
  return (
    <div className="flex justify-between items-center mb-10 border-b border-(--border) pb-5">
      <h2 className=" text-4xl">{pageName.pathname}</h2>
      <div className=" flex gap-4 text-center justify-center">
        <ThemeToggleButton/>
        <button className="bg-(--bg-card) p-2 rounded-full cursor-pointer">
          <FontAwesomeIcon icon={faGear} />
        </button>
        <button className="bg-(--bg-card) p-2 rounded-full cursor-pointer">
          <FontAwesomeIcon icon={faBell} />
        </button>
      </div>
    </div>
  );
}

export default Header;

{/* <div className=" relative flex-2 bg-[var(--bg-card)] rounded-4xl p-1 content-center">
  <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-0 p-1 text-[17px]" />
  <input type="search" placeholder="Search anything" className="focus:outline-0 text-center tracking-wider text-[15px]  w-full"/>
  </div> */}