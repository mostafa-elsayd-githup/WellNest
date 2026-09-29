import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHashtag,
  faBed,
  faStethoscope,
  faCalendarAlt,
  faUserInjured,
  faNotesMedical,
  faImage,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { PatientProp } from "../../types/type";
import { CreatPatient } from "../../services/departmentService";
import { toast } from "sonner";
import ToastErrorMessage from "./ToastErrorMessage";
interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const PatientForm: React.FC<AddDoctorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const InitialState: PatientProp = {
    name: "",
    age: 0,
    check_in: "",
    status: "Aditted",
    doctor_assigned: "",
    room: "",
    treatment: "",
    avatar_url: "",
  };
  const [FormData, setFormData] = useState<PatientProp>(InitialState);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const creatNewPatient = async (FormData: PatientProp) => {
    const Data = await CreatPatient(FormData);
    if (!Data || Data.success === false) {
      if (Data) {
        {
          toast.error(
            <div className="flex items-center gap-2 text-(--error-title) font-semibold text-md">
              <span>Validation Error</span>
            </div>,
            {
              description: <ToastErrorMessage error={Data.error} />,
              duration: 4000,
              style: {
                backgroundColor: "var(--error-bg)",
                borderColor: "var(--error-border)",
                color: "var(--error-title)",
                borderRadius: "0.75rem",
                padding: "12px 16px",
                boxShadow: "var(--shadow)",
              },
            },
          );
        }
      }
      return;
    }
    if (Data.status === "error") {
      toast.error(
        <div className="flex items-center gap-2 text-(--error-title) font-semibold text-sm">
          <span>Featch Error</span>
        </div>,
        {
          description: Data.message,
          duration: 4000,
        },
      );
      return;
    }
    toast.success(Data.message, {
      duration: 3000,
      dismissible: true,
    });
    setFormData(InitialState);
  };
  if (!isOpen) return;
  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-all duration-300">
      <div className="w-full max-w-4xl mx-auto p-6 bg-(--bg-card) border border-(--border) rounded-xl shadow-(--shadow) transition-colors duration-200">
        <div className="mb-6 border-b border-(--border) pb-4">
          <h2 className="text-2xl font-bold text-(--text-h) flex items-center gap-2">
            <FontAwesomeIcon icon={faUserInjured} className="text-(--accent)" />
            Add New Patient
          </h2>
          <p className="text-sm text-(--text-secondary) mt-1">
            Enter patient details to record a new admission to the system.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            creatNewPatient(FormData);
          }}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--text-primary) flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-(--accent)" />
                Patient Name
              </label>
              <input
                onChange={handleChange}
                value={FormData.name}
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                className="w-full px-3.5 py-2.5 rounded-lg bg-(--bg-inputtable) text-(--text-primary) border border-(--border) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all placeholder:text-(--text-secondary)"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--text-primary) flex items-center gap-2">
                <FontAwesomeIcon icon={faHashtag} className="text-(--accent)" />
                Age
              </label>
              <input
                onChange={handleChange}
                value={FormData.age}
                type="number"
                name="age"
                placeholder="e.g. 32"
                className="w-full px-3.5 py-2.5 rounded-lg bg-(--bg-inputtable) text-(--text-primary) border border-(--border) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all placeholder:text-(--text-secondary)"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--text-primary) flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faNotesMedical}
                  className="text-(--accent)"
                />
                Status
              </label>
              <select
                onChange={handleChange}
                value={FormData.status}
                name="status"
                className="w-full px-3.5 py-2.5 rounded-lg bg-(--bg-inputtable) text-(--text-primary) border border-(--border) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all"
              >
                <option value="">Select Status</option>
                <option value="Admitted">Admitted</option>
                <option value="Discharged">Discharged</option>
                <option value="In Treatment">In Treatment</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--text-primary) flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faStethoscope}
                  className="text-(--accent)"
                />
                Assigned Doctor
              </label>
              <input
                onChange={handleChange}
                value={FormData.doctor_assigned}
                type="text"
                name="doctor_assigned"
                placeholder="e.g. Dr. Sarah Connor"
                className="w-full px-3.5 py-2.5 rounded-lg bg-(--bg-inputtable) text-(--text-primary) border border-(--border) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all placeholder:text-(--text-secondary)"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--text-primary) flex items-center gap-2">
                <FontAwesomeIcon icon={faBed} className="text-(--accent)" />
                Room / Bed Number
              </label>
              <input
                onChange={handleChange}
                value={FormData.room}
                type="text"
                name="room"
                placeholder="e.g. Room 104 - Bed B"
                className="w-full px-3.5 py-2.5 rounded-lg bg-(--bg-inputtable) text-(--text-primary) border border-(--border) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all placeholder:text-(--text-secondary)"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--text-primary) flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-(--accent)"
                />
                Check-In Date
              </label>
              <input
                onChange={handleChange}
                value={FormData.check_in}
                type="date"
                name="check_in"
                className="w-full px-3.5 py-2.5 rounded-lg bg-(--bg-inputtable) text-(--text-primary) border border-(--border) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-(--text-primary) flex items-center gap-2">
              <FontAwesomeIcon
                icon={faNotesMedical}
                className="text-(--accent)"
              />
              Treatment / Diagnosis
            </label>
            <textarea
              onChange={handleChange}
              value={FormData.treatment}
              name="treatment"
              rows={3}
              placeholder="Enter diagnosis or active treatment regimen..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-(--bg-inputtable) text-(--text-primary) border border-(--border) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all placeholder:text-(--text-secondary) resize-none"
            ></textarea>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-(--text-primary) flex items-center gap-2">
              <FontAwesomeIcon icon={faImage} className="text-(--accent)" />
              Avatar / Photo URL (Optional)
            </label>
            <input
              onChange={handleChange}
              value={FormData.avatar_url}
              type="url"
              name="avatar_url"
              placeholder="https://example.com/patient-photo.jpg"
              className="w-full px-3.5 py-2.5 rounded-lg bg-(--bg-inputtable) text-(--text-primary) border border-(--border) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all placeholder:text-(--text-secondary)"
            />
          </div>
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-(--border)">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-(--text-secondary) hover:bg-(--bg-table-hover) transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-(--text-white) bg-(--accent) hover:bg-(--accent-hover) transition-all flex items-center gap-2 shadow-sm"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              Save Patient Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
