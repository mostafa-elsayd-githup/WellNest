import {
  X,
  User,
  Building2,
  Stethoscope,
  Users,
  Calendar,
  Activity,
} from "lucide-react";
import React, { useState } from "react";
import type { FormDataType, list } from "../../types/type";
import {
  faCircleXmark,
  faEnvelope,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createDoctorRecord } from "../../services/departmentService";
import { toast } from "sonner";
import { useContext } from "react";
import { SearchInputContext } from "../../context/searchInputContext";
import { getErrorMessage } from "../../utils/getErrorMessage";

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const AddDoctorModal: React.FC<AddDoctorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const InitialState: FormDataType = {
    specialty: "",
    bio: "",
    consultation_fee: 0,
    rating: 0,
    name: "",
    avatar_url: "",
    department_name: "",
    total_patients: 0,
    todays_appointments: 0,
    status: "Available",
    specialist: "",
    Departments_ID: 0,
    email: "",
  };
  const [FormData, setFormData] = useState<FormDataType>(InitialState);
  const { setGetDoctor } = useContext(SearchInputContext);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const createDoctor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await createDoctorRecord(FormData);
      if (!Array.isArray(data)) {
        toast.error("Form Validation", {
          id: "login-error",
          icon: <FontAwesomeIcon icon={faCircleXmark} />,
          description: data.message,
          duration: 5000,
          dismissible: true,
        });
        return;
      }
      toast.success("The doctor has been successfully added", {
        description: "Create doctor",
        duration: 5000,
        dismissible: true,
      });
      setGetDoctor((doctors) => [
        ...data,
        ...doctors.filter(
          (doctor) => !data.some((createdDoctor) => createdDoctor.id === doctor.id),
        ),
      ]);
      setFormData(InitialState);
      onClose();
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Unable to add the doctor. Please try again."),
        {
        duration: 5000,
        dismissible: true,
        },
      );
    }
  };

  const departmentsList: list[] = [
    { id: 1, name: "Pediatrics" },
    { id: 2, name: "Neurology" },
    { id: 3, name: "Dermatology" },
    { id: 4, name: "Oncology" },
    { id: 5, name: "General Medical" },
    { id: 6, name: "Cardiology" },
    { id: 7, name: "Internal Medicine" },
    { id: 8, name: "Orthopedics" },
  ];
  const handleGetID = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.preventDefault();
    const value = Number(e.target.value);
    const DepartmentName = departmentsList.find((item) => item.id === value);
    const department = DepartmentName?.name || "";
    setFormData((prev) => ({
      ...prev,
      Departments_ID: value,
      department_name: department,
    }));
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-(--bg-card) border border-(--border) shadow-(--shadow) text-(--text-primary) transition-all">
        <div className="flex items-center justify-between p-6 border-b border-(--border) sticky top-0 bg-(--bg-card) z-10">
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-bold text-(--text-h)">
              Add New Doctor
            </h2>
            <p className="text-xs text-(--text-secondary) mt-0.5">
              Enter doctor details to add them to the system directory.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-(--text-secondary) hover:bg-(--bg-inputtable) hover:text-(--text-primary) transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form className="p-6 space-y-5" onSubmit={createDoctor}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
                <User size={14} className="text-(--accent)" /> Doctor Name
              </label>
              <input
                onChange={handleChange}
                name="name"
                value={FormData.name}
                type="text"
                placeholder="Dr. John Doe"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-(--bg-searchInput) border border-(--border) text-(--text-primary) focus:outline-none focus:border-[(--accent) transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
                <User size={14} className="text-(--accent)" /> Doctor bio
              </label>
              <input
                onChange={handleChange}
                name="bio"
                value={FormData.bio}
                type="text"
                placeholder="Dr. John Doe specializes in Radiation Oncology and has helped"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-(--bg-searchInput) border border-(--border) text-(--text-primary) focus:outline-none focus:border-[(--accent) transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-(--accent)"
                />
                Doctor Email
              </label>
              <input
                onChange={handleChange}
                name="email"
                value={FormData.email}
                type="email"
                placeholder="Email@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-(--bg-searchInput) border border-(--border) text-(--text-primary) focus:outline-none focus:border-[(--accent) transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
                <Building2 size={14} className="text-(--accent)" /> Department
              </label>
              <select
                name="department_name"
                value={FormData.Departments_ID}
                onChange={handleGetID}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-(--bg-searchInput) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary) focus:outline-none focus:border-(--accent) focus:ring-2 focus:ring-(--accent-bg) transition-all duration-200"
              >
                <option value="0">Select Department</option>
                {departmentsList.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
                <Stethoscope size={14} className="text-(--accent)" /> Specialist
              </label>
              <input
                name="specialist"
                value={FormData.specialist}
                onChange={handleChange}
                type="text"
                placeholder="Heart Specialist"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-(--bg-searchInput) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent) transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
                <Stethoscope size={14} className="text-(--accent)" /> specialty
              </label>
              <input
                name="specialty"
                value={FormData.specialty}
                onChange={handleChange}
                type="text"
                placeholder="Heart Specialist"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-(--bg-searchInput) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent) transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
                <FontAwesomeIcon
                  icon={faMoneyCheckDollar}
                  className="text-(--accent)"
                />{" "}
                Consultation fees
              </label>
              <input
                name="consultation_fee"
                value={FormData.consultation_fee}
                onChange={handleChange}
                type="number"
                placeholder="Heart Specialist"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-(--bg-searchInput) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent) transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
                <Users size={14} className="text-(--accent)" /> Total Patients
              </label>
              <input
                min={0}
                name="total_patients"
                value={FormData.total_patients}
                onChange={handleChange}
                type="number"
                placeholder="0"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-(--bg-searchInput) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent) transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
                <Calendar size={14} className="text-(--accent)" /> Days
                Appointments
              </label>
              <input
                name="todays_appointments"
                value={FormData.todays_appointments}
                onChange={handleChange}
                min={0}
                type="number"
                placeholder="0"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-(--bg-searchInput) border border-(--border) text-(--text-primary) focus:outline-none focus:border-(--accent) transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
                <Activity size={14} className="text-(--accent)" /> Available
                Status
              </label>
              <select
                name="status"
                value={FormData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-(--bg-searchInput) border border-(--border) text-(--text-primary) focus:outline-none focus:border-[(--accent) transition-colors"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-(--border) mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium border border-(--border) text-(--text-secondary) hover:bg-(--bg-inputtable) hover:text-(--text-primary) transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-medium bg-(--button) text-(--text-white) hover:bg-(--button-hover) transition-colors shadow-md"
            >
              Save Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
