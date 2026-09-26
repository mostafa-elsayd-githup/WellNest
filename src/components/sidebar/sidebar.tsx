import {
  faBed,
  faCreditCard,
  faDiagramNext,
  faHospital,
  faLayerGroup,
  faMessage,
  faSquareCheck,
  faUserDoctor,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";

function Sidebar() {
  return (
    <aside className="w-64 h-full text-left bg-(--bg-card) border-r border-(--border) p-4 flex flex-col gap-4 ">
      <h2 className="flex gap-1 items-center text-xl font-bold text-(--text-h) mb-2 ">
        <img src="/public/logo.svg" className="rounded-full w-10 border border-(--border)" />
        <span>WellNest</span>{" "}
      </h2>
      <NavLink to="/"  className="hover:pl-5 transition-all duration-300">
        <FontAwesomeIcon className="pr-3 text-(--text)" icon={faLayerGroup} />
        Dashboard
      </NavLink>
      <NavLink to="/appointment" className="hover:pl-5 transition-all duration-300">
        <FontAwesomeIcon className="pr-3 text-(--text)" icon={faSquareCheck} />
        Appointment
      </NavLink>
      <NavLink to="/patients" className="hover:pl-5 transition-all duration-300">
        <FontAwesomeIcon className="pr-3 text-(--text)" icon={faBed} />
        Patients
      </NavLink>
      <NavLink to="/doctors" className="hover:pl-5 transition-all duration-300">
        <FontAwesomeIcon className="pr-3 text-(--text)" icon={faUserDoctor} />
        Doctors
      </NavLink>
      <NavLink to="/departments" className="hover:pl-5 transition-all duration-300">
        <FontAwesomeIcon className="pr-3 text-(--text)" icon={faHospital} />
        Departments
      </NavLink>
      <NavLink to="/doctors-schedule" className="hover:pl-5 transition-all duration-300">
        <FontAwesomeIcon className="pr-3 text-(--text)" icon={faDiagramNext} />
        Doctors' Schedule
      </NavLink>
      <NavLink to="/payments" className="hover:pl-5 transition-all duration-300">
        <FontAwesomeIcon className="pr-3 text-(--text)" icon={faCreditCard} />
        Payments
      </NavLink>
      <NavLink to="/inventory" className="hover:pl-5 transition-all duration-300">
        <FontAwesomeIcon className="pr-3 text-(--text)" icon={faWarehouse} />
        Inventory
      </NavLink>
      <NavLink to="/messages" className="hover:pl-5 transition-all duration-300">
        <FontAwesomeIcon className="pr-3 text-(--text)" icon={faMessage} />
        Messages
      </NavLink>
    </aside>
  );
}

export default Sidebar;
