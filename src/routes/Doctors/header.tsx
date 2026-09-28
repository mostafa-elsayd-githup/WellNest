import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import {
  searchDoctorsByNameSpecialistOrDepartment,
  searchDoctorsBySpecialistDepartmentOrAvailability,
} from "../../services/departmentService";
import { SearchInputContext } from "../../context/searchInputContext";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { toast } from "sonner";

function Header() {
  const {
    setFetchError,
    setNotFound,
    setGetDoctor,
    SearchName,
    setSearchName,
    setIsopen,
    setLoading,
  } = useContext(SearchInputContext);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchName(value);
    try {
      setLoading(true);
      setTimeout(async () => {
        const data = await searchDoctorsByNameSpecialistOrDepartment({
          SearchName: value,
        });
        if (!data || data.length === 0) {
          setNotFound("Doctor Was Not Found");
          setGetDoctor([]);
          return;
        }
        setNotFound("");
        setFetchError("");
        setGetDoctor(data);
      }, 1000);
    } catch (error) {
      const message = getErrorMessage(error, "Unable to search doctors.");
      setFetchError(message);
      toast.error("Fetch Error", {
        description: message,
        duration: 10000,
        dismissible: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSearchSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchDoctorsBySpecialistDepartmentOrAvailability({
          SearchName: value,
        });
        if (!data || data.length === 0) {
          setNotFound("Doctor Was Not Found");
          setGetDoctor([]);
          return;
        }
        setNotFound("");
        setFetchError("");
        setGetDoctor(data);
      } catch (error) {
        const messagge = getErrorMessage(error, "Unable to search doctors.");
        setFetchError(messagge);
        toast.error("Fetch Error", {
          description: messagge,
          duration: 10000,
          dismissible: true,
        });
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className=" bg-transparent flex items-center justify-between pb-4 ">
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex w-full min-w-0 items-center rounded-2xl  bg-(--bg-inputtable) lg:max-w-75 ">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 text-[17px]"
          />

          <input
            onChange={handleSearchInput}
            value={SearchName}
            type="search"
            placeholder="Search Name, age, Department Name, specialist"
            className="w-full rounded-2xl bg-transparent px-10 py-2 outline-none"
          />
        </div>
        <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 lg:w-auto">
          <li className="rounded-2xl  bg-(--bg-inputtable) py-1 pr-4">
            <select
              onChange={handleSearchSelect}
              id="department"
              className="w-full px-3 py-1 outline-none"
            >
              <option value="">Department</option>
              <option value="Neurology">Neurology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Oncology">Oncology</option>
              <option value="General Medical">General Medical</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </li>

          <li className="rounded-2xl  bg-(--bg-inputtable) py-1 pr-4">
            <select
              onChange={handleSearchSelect}
              id="specialist"
              className="w-full  px-3 py-1 outline-none"
            >
              <option value="">Specialist</option>
              <option value="Cancer Specialist">Cancer Specialist</option>
              <option value="Internal Health">Internal Health</option>
              <option value="Bone Specialist">Bone Specialist</option>
              <option value="Skin Specialist">Skin Specialist</option>
              <option value="Brain Specialist">Brain Specialist</option>
              <option value="Heart Specialist">Heart Specialist</option>
              <option value="Child Health">Child Health</option>
              <option value="Routine Check-Ups">Routine Check-Ups</option>
            </select>
          </li>

          <li className="rounded-2xl  bg-(--bg-inputtable) py-1 pr-4">
            <select
              onChange={handleSearchSelect}
              id="status"
              className="w-full  px-3 py-1 outline-none"
            >
              <option value="">Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </li>
        </ul>
        <div>
          <button
            onClick={() => setIsopen(true)}
            className="bg-(--button) hover:bg-(--button-hover) text-(--text-white) w-full rounded-2xl py-1.5 px-2 text-[18px] cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Doctor
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
