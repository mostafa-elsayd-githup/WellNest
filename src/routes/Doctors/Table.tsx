import { faCircleXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteDoctorFromDatabase,
  getAllDoctor,
} from "../../services/departmentService";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import Loader from "../../components/sidebar/loader/loader";
import ErrorState from "../../error";
import { SearchInputContext } from "../../context/searchInputContext";
import NotFoundState from "../../NotFoundState";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { NavLink } from "react-router";
import { AddDoctorModal } from "./Form";
import { getErrorMessage } from "../../utils/getErrorMessage";
function Table() {
  const context = useContext(SearchInputContext);
  const {
    fetchError,
    setFetchError,
    NotFoundUser,
    setNotFound,
    GetDoctor,
    setGetDoctor,
    setSearchName,
    isopen,
    setIsopen,
    Loading,
    setLoading
  } = context;
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true)
        const getDoctors = await getAllDoctor();
        setGetDoctor(getDoctors);
      } catch (error) {
        const message = getErrorMessage(
          error,
          "Unable to load doctors. Please try again later.",
        );
        setFetchError(message);
        toast.error(message, {
          icon: <FontAwesomeIcon icon={faCircleXmark} />,
          duration: 10000,
          dismissible: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setFetchError, setGetDoctor, setLoading]);

  const handleDeleteDoctor = (doctorId: string, userName: string): void => {
    let isUndone: boolean = false;
    let isDeleted: boolean = false;

    const deletedDoctor = GetDoctor.find((doc) => doc.id === doctorId);

    setGetDoctor((doctors) => doctors.filter((doc) => doc.id !== doctorId));

    const commitDelete = async () => {
      if (isUndone || isDeleted) return;
      isDeleted = true;
      try {
        await deleteDoctorFromDatabase(doctorId);
      } catch (error) {
        if (deletedDoctor) {
          setGetDoctor((prevDoctors) => [deletedDoctor, ...prevDoctors]);
        }
        toast.error(
          getErrorMessage(error, "Failed to delete doctor. Please try again."),
        );
      }
    };

    toast.error(`Doctor ${userName} deleted`, {
      duration: 5000,
      dismissible: true,
      action: {
        label: "Undo",
        onClick: () => {
          isUndone = true;
          if (deletedDoctor) {
            setGetDoctor((prevDoctors) => [deletedDoctor, ...prevDoctors]);
          }
          toast.success("Action cancelled successfully");
        },
      },
      onAutoClose: commitDelete,
      onDismiss: commitDelete,
      className:
        "group font-sans rounded-2xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-900 shadow-xl",
    });
  };
  return (
    <>
      <div className="overflow-x-auto ">
        <table className="divide-y divide-(--border) w-full min-w-225 rounded-2xl table-fixed ">
          <thead>
            <tr className="border-b border-(--border) ">
              <th className="p-3 w-50">Name</th>
              <th className="p-3">ID</th>
              <th className="p-3">Department</th>
              <th className="p-3">Specialist</th>
              <th className="p-3">total patients</th>
              <th className="p-3">Today's appointments</th>
              <th className="p-3">Availability</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchError ? (
              <tr>
                <td colSpan={8} className="py-16 text-center">
                  <ErrorState message={fetchError as string} />
                </td>
              </tr>
            ) : Loading ? (
              <tr>
                <td colSpan={8} className="py-16 text-center">
                  <div className="flex justify-center items-center w-full">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : NotFoundUser ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-16 text-center text-(--error-title) bg-(--error-bg) font-bold tracking-widest"
                >
                  <NotFoundState
                    message={NotFoundUser}
                    onReset={() => {
                      setSearchName("");
                      setNotFound("");
                    }}
                  />
                </td>
              </tr>
            ) : (
              GetDoctor.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-(--border) hover:bg-(--bg-table-hover) transition-colors"
                >
                  <td className="p-2">
                    <div className="flex items-center justify-center gap-2 w-36">
                     { d.avatar_url ? <img
                       className="w-10 h-10 rounded-[50%]"
                       src={d.avatar_url }
                       alt={d.name}
                       />: 
                      <span className="w-9 h-9 shrink-0 rounded-full bg-(--bg) flex justify-center items-center text-(--text-secondary) text-2xl">
                          {d.name[4].toLocaleUpperCase()}
                        </span> 
                      }
                        
                      <h3>{d.name}</h3>
                    </div>
                  </td>
                  <td className="max-w-10 truncate">{d.id}</td>
                  <td>{d.department_name}</td>
                  <td>{d.specialist}</td>
                  <td>{d.total_patients}</td>
                  <td className="w-40">{d.todays_appointments}</td>
                  <td>
                    {d.status === "Available" ? (
                      <button className="text-[14px] text-(--button) bg-(--bg-status) border border-(--border-status) w-fit p-0.5 rounded-[10px]">
                        {d.status}
                      </button>
                    ) : (
                      <button className="text-[14px] text-(--error-text) bg-(--error-bg) w-fit p-0.5 rounded-2xl">
                        {d.status}
                      </button>
                    )}
                  </td>
                  <td>
                    <NavLink
                      to={`/Doctors/${d.id}`}
                      className="border-r border-(--border) pr-2 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </NavLink>
                    <button
                      onClick={() => handleDeleteDoctor(d.id, d.name)}
                      type="button"
                      className="pl-2 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <AddDoctorModal isOpen={isopen} onClose={() => setIsopen(false)} />
    </>
  );
}

export default Table;
