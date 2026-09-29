import { faCalendar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DoctorAppointment,
  getDoctorById,
} from "../../services/departmentService";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Appointment, DoctorTypes } from "../../types/type";
import { SearchInputContext } from "../../context/searchInputContext";
import Loader from "../../components/sidebar/loader/loader";
import ErrorState from "../../error";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { toast } from "sonner";

const DoctorDetails = () => {
  const { profileID } = useParams<{ profileID: string }>();
  const [doctor, setDoctor] = useState<DoctorTypes[]>([]);
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [Loading, setLoading] = useState<boolean>(false);
  const { setFetchError, fetchError } = useContext(SearchInputContext);
  useEffect((): void => {
    if (!profileID) return;

    const res = async () => {
      try {
        setLoading(true);
        setFetchError(null);

        const profile = await getDoctorById({ profileID });
        const DocAppointment = await DoctorAppointment({ profileID });

        setDoctor(profile);
        setAppointment(DocAppointment);
      } catch (error) {
        const message = getErrorMessage(
          error,
          "Unable to load doctor details. Please try again later.",
        );
        setFetchError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    res();
  }, [profileID, setFetchError]);
  if (fetchError) {
    return (
      <section className="flex items-center justify-center">
        <div className="absolute w-[50%]  top-[50%] translate-y-[-50%] flex justify-center items-center">
          <ErrorState message={fetchError as string} />
        </div>
      </section>
    );
  }
  return (
    <section className="grid grid-cols-12  gap-6 w-full">
      {doctor.map((user) => (
        <div
          key={user.id}
          className="
          grid
          gap-5
          col-span-full
          md:col-span-4
          lg:col-span-3
          bg-(--bg-card)
          place-items-crnter 
          rounded-2xl 
          p-2 
          shadow-(--shadow)"
        >
          <div className="flex flex-col gap-2 mt-4 items-center">
            <img
              className="w-30 rounded-[50%]"
              src={
                user.avatar_url ||
                "https://khskwfnoxnasthlkqjiu.supabase.co/storage/v1/object/public/department-images/profile1.svg"
              }
              alt={user.name || "Doctor Profile"}
            />
            <h3 className="text-(--text-h) font-bold tracking-wider text-[1.5rem]">
              {user.name}
            </h3>
            <p
              title={user.id}
              className="text-(--text-secondary) cursor-pointer max-w-25 truncate"
            >
              {user.id}
            </p>
            {user.status === "Available" ? (
              <span className="border text-(--text-status) bg-(--bg-status) border-(--border-status) py-0.5 px-3 rounded-2xl">
                {user.status}
              </span>
            ) : (
              <span className="border text-(--error-text) bg-(--error-bg) border-(--error-border) py-0.5 px-3 rounded-2xl">
                {user.status}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-(--text-h) font-bold tracking-widest text-[1.5rem] mb-3">
              Specialist
            </h3>
            <p>{user.specialist}</p>
          </div>
          <div>
            <h3 className="text-(--text-h) font-bold tracking-widest text-[1.5rem] leading-1 mb-6">
              About
            </h3>
            <p>{user.bio}</p>
          </div>
        </div>
      ))}
      {doctor.map((user) => (
        <div
          key={user.id}
          className="
          grid 
          col-span-full 
          md:col-span-8
          lg:col-span-9
          gap-6 
          w-full"
        >
          <div className="grid grid-cols-1  gap-4">
            <div className="p-5 rounded-2xl border border-(--border) bg-(--bg-card) shadow-(--shadow) flex items-center justify-between transition-colors">
              <div>
                <p className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                  Total Patients
                </p>
                <h3 className="text-2xl font-bold text-(--text-h) mt-1">
                  {user.total_patients}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-(--accent-bg) border border-(--accent-border) flex items-center justify-center text-(--accent)">
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </div>
            <div className="p-5 rounded-2xl border border-(--border) bg-(--bg-card) shadow-(--shadow) flex items-center justify-between transition-colors">
              <div>
                <p className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                  Total Appointments
                </p>
                <h3 className="text-2xl font-bold text-(--text-h) mt-1">
                  {user.todays_appointments}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-(--bg-status) border border-(--border-status) flex items-center justify-center text-(--button)">
                <FontAwesomeIcon icon={faCalendar} />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-(--border) bg-(--bg-card) shadow-(--shadow) overflow-hidden transition-colors">
            <div className="p-5 border-b border-(--border) flex items-center justify-between">
              <h2 className="text-lg font-bold text-(--text-h)">
                Recent Appointments
              </h2>
              <span className="text-xs text-(--text-secondary)">
                Showing last {appointment.length} records
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-(--bg-table-header) text-(--text-secondary) text-xs uppercase border-b border-(--border)">
                    <th className="py-3.5 px-5 font-semibold">Patient Name</th>
                    <th className="py-3.5 px-5 font-semibold">Date</th>
                    <th className="py-3.5 px-5 font-semibold">Time</th>
                    <th className="py-3.5 px-5 font-semibold">Status</th>
                  </tr>
                </thead>
                {Loading ? (
                  <tbody className="w-full divide-y divide-(--border) text-sm text-(--text-primary) ">
                    <tr>
                      <td colSpan={8} className=" items-center">
                        <Loader />
                      </td>
                    </tr>
                  </tbody>
                ) : fetchError ? (
                  <tbody className="divide-y divide-(--border) text-sm text-(--text-primary)">
                    <tr>
                      <td colSpan={8} className=" items-center">
                        <ErrorState message={fetchError} />
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="divide-y divide-(--border) text-md text-(--text-primary)">
                    {appointment.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-(--bg-table-hover) transition-colors"
                      >
                        <td className="py-4 px-5 font-medium">
                          {item.patientName}
                        </td>
                        <td className="py-4 px-5 text-(--text-secondary)">
                          {item.appointment_date}
                        </td>
                        <td className="py-4 px-5 text-(--text-secondary)">
                          {item.appointment_time}
                        </td>
                        <td className="py-4 px-5">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                              item.status === "Completed"
                                ? "bg-(--accent-bg)] border-(--accent-border)] text-(--accent)"
                                : item.status === "Pending"
                                  ? "bg-(--bg-status) border-(--border-status) text-(--text-status)"
                                  : "bg-(--error-bg) border-(--error-border) text-(--error-text)"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
export default DoctorDetails;
