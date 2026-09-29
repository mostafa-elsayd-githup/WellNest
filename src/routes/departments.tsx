import { NavLink } from "react-router";
import { useEffect, useState } from "react";

import {
  getAllDepartments,
  getAllDoctor,
} from "../services/departmentService.ts";
import type { Department, DoctorTypes } from "../types/type.ts";
import Loader from "../components/sidebar/loader/loader.tsx";
import { toast } from "sonner";
import { getErrorMessage } from "../utils/getErrorMessage";
function Departments() {
  const [Departments, setDepartments] = useState<Department[]>([]);
  const [Doctors, setDoctors] = useState<DoctorTypes[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const DoctorsRes = await getAllDoctor();
        const Departments = await getAllDepartments();
        setDoctors(DoctorsRes);
        setDepartments(Departments);
      } catch (error) {
        const message = getErrorMessage(
          error,
          "Unable to load departments. Please try again later.",
        );
        toast.error(message, {
          duration: 5000,
          description: "Fetch Error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Departments.map((item) => (
            <div
              key={item.id}
              className=" flex flex-col gap-2 text-start justify-between border border-(--border) p-2 rounded-2xl"
            >
              <div className="mb-3">
                <img className="rounded-2xl" src={item.image_url} />
              </div>
              <div className="border-b-2 pb-1  border-(--border)">
                <h2>{item.Departments_name}</h2>
                <p className="tracking-[2] line-clamp-3 tracking-tigh">{item.description}</p>
              </div>
              <div className="flex justify-between">
                <span>
                  Doctor :{" "}
                  {
                    Doctors.filter(
                      (doctor) => doctor.Departments_ID === item.Departments_ID,
                    ).length
                  }
                </span>
                <NavLink
                  className="bg-(--button) text-white p-1 rounded-[10px] "
                  to={`Departments/${item.Departments_name}`}
                >
                  See Detail
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Departments;
