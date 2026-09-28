import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { SearchInputContext } from "../../context/searchInputContext";
import {
  GetAllPatient,
  SearchPatientBy_Name_Age_Status,
  serachByStatus,
} from "../../services/departmentService";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { toast } from "sonner";

function HeaderPatiens() {
  const { SearchName, setSearchName, setGetPatient, setLoading, setNotFound } =
    useContext(SearchInputContext);
  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const Value = e.target.value;
    setSearchName(e.target.value);
    if (!Value.trim()) {
      try {
        setLoading(true);
        setNotFound("");
        const allData = await GetAllPatient();
        setGetPatient(allData);
      } catch (error) {
        const message = getErrorMessage(error, "Failed to fetch patients");
        toast.error("Fetch Error", { description: message });
      } finally {
        setLoading(false);
      }
      return;
    }
    try {
      setLoading(true);
      const data = await SearchPatientBy_Name_Age_Status(Value);
      if (!data || data.length === 0) {
        setNotFound("Patient Was Not Found");
        setGetPatient([]);
        return;
      }
      setGetPatient(data);
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch patients");
      toast.error("Fetch Error", {
        description: message,
        duration: 10000,
        dismissible: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const Value: string = e.target.value;
    try {
      setLoading(true);
      const Data = await serachByStatus(Value);
      setGetPatient(Data);
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch patients");
      toast.error("Fetch Error", {
        description: message,
        duration: 10000,
        dismissible: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="grid grid-cols-12 gap-5">
      <div className="relative grid col-span-12 lg:col-span-6  items-center   w-full rounded-2xl bg-(--bg-inputtable) ">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 text-[17px]"
        />
        <input
          onChange={handleSearchInput}
          value={SearchName}
          type="text"
          placeholder="Search Name, age, Status"
          className="w-full rounded-2xl bg-transparent px-10 py-2 outline-none"
        />
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <select
          onChange={handleSelect}
          className="w-full px-4 py-2.5 outline-none rounded-2xl  bg-(--bg-inputtable) "
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <button className="w-full bg-(--button) hover:bg-(--button-hover) text-(--text-white) rounded-2xl py-1.5 px-2 text-[18px] cursor-pointer">
          Add Patien
        </button>
      </div>
    </section>
  );
}

export default HeaderPatiens;
