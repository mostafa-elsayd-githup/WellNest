import { useContext, useEffect, useState } from "react";
import { GetAllPatient } from "../../services/departmentService";
import type { PatientProp } from "../../types/type";
import { SearchInputContext } from "../../context/searchInputContext";
import { getErrorMessage } from "../../utils/getErrorMessage";
import ErrorState from "../../error";
import Loader from "../../components/sidebar/loader/loader";
import { toast } from "sonner";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotFoundState from "../../NotFoundState";

function TablePatien() {
  const {
    setFetchError,
    fetchError,
    setNotFound,
    NotFoundUser,
    GetPatient,
    setLoading,
    Loading,
  } = useContext(SearchInputContext);
  const [patient, setPatient] = useState<PatientProp[]>([]);
  useEffect(() => {
    const GetPatient = async () => {
      try {
        setLoading(true);
        const data = await GetAllPatient();
        if (data.length === 0) {
          setNotFound("Patient Not Found");
          return;
        }
        setPatient(data);
      } catch (error) {
        const message = getErrorMessage(error, "Failed to fetch patients");
        setFetchError(message);
        toast.error("error get patient ", {
          description: message,
          icon: <FontAwesomeIcon icon={faCircleXmark} />,
          duration: 10000,
          dismissible: true,
        });
      } finally {
        setLoading(false);
      }
    };
    GetPatient();
  }, [setFetchError, setLoading, setNotFound]);
  const patientsToRender = GetPatient.length > 0 ? GetPatient : patient;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-fixed divide-y border-collapse min-w-225 divide-(--border) w-full rounded-2xl">
          <thead>
            <tr className="border-b border-(--border)  ">
              <th className="p-5 w-50">Name</th>
              <th className="p-3">ID</th>
              <th className="p-3">Age</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Treatment</th>
              <th className="p-3">Doctor Assigend</th>
              <th className="p-3">Room</th>
              <th className="p-3">State</th>
            </tr>
          </thead>
          <tbody>
            {fetchError ? (
              <tr>
                <td colSpan={8} className="py-16 text-center">
                  <ErrorState
                    message={fetchError as string}
                    onRetry={GetAllPatient}
                  />
                </td>
              </tr>
            ) : NotFoundUser ? (
              <tr>
                <td colSpan={8} className="py-16 text-center">
                  <NotFoundState message={NotFoundUser} />
                </td>
              </tr>
            ) : Loading ? (
              <tr>
                <td colSpan={8} className="fles py-16 justify-center ">
                  <Loader />
                </td>
              </tr>
            ) : (
              patientsToRender?.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-(--border) hover:bg-(--bg-table-hover) transition-colors"
                >
                  <td className="p-2">
                    <div className="flex items-center text-center justify-start gap-3 w-50">
                      {item.avatar_url ? (
                        <img
                          className="w-9 h-9 shrink-0 rounded-full"
                          src={item.avatar_url}
                        />
                      ) : (
                        <span className="w-9 h-9 shrink-0 rounded-full bg-(--bg) flex justify-center items-center text-(--text-secondary) text-2xl">
                          {item.name[0].toLocaleUpperCase()}
                        </span>
                      )}

                      <h3>{item.name}</h3>
                    </div>
                  </td>
                  <td>{item.id}</td>
                  <td>{item.age}</td>
                  <td>{item.check_in}</td>
                  <td>{item.treatment}</td>
                  <td>{item.doctor_assigned}</td>
                  <td>{item.room}</td>
                  {item.status === "Active" ? (
                    <td>
                      <span className="bg-(--button) text-(--text-white) px-3 py-1 rounded-2xl">
                        {item.status}
                      </span>
                    </td>
                  ) : (
                    <td>
                      <span className="bg-(--error-text) text-(--text-white) px-3 py-1 rounded-2xl">
                        {item.status}
                      </span>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TablePatien;
