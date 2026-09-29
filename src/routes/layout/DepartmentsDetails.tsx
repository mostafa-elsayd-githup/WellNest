import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getAllDoctorForDetailsPage,
  getDepartmentByName,
} from "../../services/departmentService";
import type { Department_details, DoctorTypes } from "../../types/type";
import Loader from "../../components/sidebar/loader/loader";
import { toast } from "sonner";
import { getErrorMessage } from "../../utils/getErrorMessage";

function DepartmentsDetails() {
  const { name } = useParams<{ name: string }>();
  const [department, setDepartment] = useState<Department_details | null>(null);
  const [doctors, setDoctors] = useState<DoctorTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;
    const fetchDetails = async () => {
      try {
        const data = await getDepartmentByName(name);
        const doctors = await getAllDoctorForDetailsPage(name);
        setDoctors(doctors);
        setDepartment(data ?? null);
      } catch (error) {
        toast.error(
          getErrorMessage(
            error,
            "Unable to load department details. Please try again later.",
          ),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [name]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="text-start w-full px-4 py-6">
          <div className="overflow-hidden m-auto h-115 w-[50%] flex justify-center items-center">
            <img
              src={department?.image_url}
              alt={department?.title}
              className="h-full w-full rounded-2xl object-cover md:h-80"
            />
          </div>
          <div className="mt-5 flex items-center gap-2">
            <h1 className="text-xl font-semibold text-(--text-h)">
              {department?.title}
            </h1>
          </div>
          <section className="mt-4">
            <h2 className="mb-2 text-sm font-semibold text-(--text-h)">
              About
            </h2>

            <p className="text-xs leading-5 text-(--text)">
              {department?.description}
            </p>
          </section>
          <section className="mt-7">
            <h2 className="mb-4 text-sm font-semibold text-(--text-h)">
              Our Treatments
            </h2>
            <ul className="space-y-3">
              {(department?.treatments ?? []).map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-(--accent)" />
                  <div>
                    <h3 className="text-xs font-semibold text-(--text-h)">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-4 text-(--text)">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-7">
            <h2 className="mb-4 text-sm font-semibold text-(--text-h)">
              Our Team
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="
                  rounded-xl
                bg-(--bg-card)
                px-3 py-3
                text-center
                transition
                hover:-translate-y-1
                hover:shadow-sm
                "
                >
                  <img
                    src={doctor.avatar_url}
                    alt={doctor.name}
                    className="mx-auto h-12 w-12 rounded-[50%] object-cover"
                  />

                  <h3 className="mt-2 text-[11px] font-semibold text-(--text-h)">
                    {doctor.name}
                  </h3>

                  <p className="mt-1 text-[9px] text-(--text)">{doctor.bio}</p>

                  <div className="mt-2 flex justify-center gap-2 text-[10px] ">
                    <span>in</span>
                    <span>𝕏</span>
                    <span>◎</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default DepartmentsDetails;
