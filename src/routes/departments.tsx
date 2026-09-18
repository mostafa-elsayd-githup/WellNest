import { NavLink } from "react-router";
import { useEffect, useState } from "react";

import { getAllDepartments } from "../services/departmentService";
import type { Department } from "../types/type.ts";
import Loader from "../components/sidebar/loader/loader.tsx";
function Departments() {
  const [Departments, setDepartments] = useState<Department[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getAllDepartments();
        setDepartments(data);
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
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
              className=" flex flex-col gap-2 text-start border border-(--border) p-2 rounded-2xl"
            >
              <div className="mb-3">
                <img className="rounded-2xl" src={item.image_url} />
              </div>
              <div className="border-b-2 pb-1  border-(--border)">
                <h2>{item.Departments_name}</h2>
                <p className="">{item.description}</p>
              </div>
              <div className="flex justify-between">
                <span>image doctor</span>
                <NavLink
                  className="bg-(--button) text-(--text-whit) p-1 rounded-[10px] "
                  to={`/departments/${item.id}`}
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
