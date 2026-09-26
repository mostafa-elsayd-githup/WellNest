import axiosClient from "../api/axiosClient";
import type {
  Appointment,
  Department,
  Department_details,
  DoctorTypes,
} from "../types/type";
import { type DoctorFormData } from "../types/type";
import { DoctorSchema, SearchSchema } from "../Validations/DoctorSchema";

type DepartmentDetailsApi = Omit<Department_details, "treatments"> & {
  treatments: { tilte: string; description: string }[];
};

type AppointmentApi = Omit<Appointment, "patientName"> & {
  pationt_nmae: string;
};

export const getAllDepartments = async (): Promise<Department[]> => {
  const response = await axiosClient.get("/Departments");
  return response.data;
};

export const getDepartmentByName = async (
  name: string,
): Promise<Department_details | undefined> => {
  const validatedName = SearchSchema.parse(name);
  const response = await axiosClient.get<DepartmentDetailsApi[]>(
    "/Departments_Details",
    {
      params: { title: `eq.${validatedName}` },
    },
  );
  const department = response.data[0];
  if (!department) return undefined;
  return {
    ...department,
    treatments: (department.treatments ?? []).map(({ tilte, ...treatment }) => ({
      ...treatment,
      title: tilte,
    })),
  };
};
export const getAllDoctorForDetailsPage = async (
  name: string,
): Promise<DoctorTypes[]> => {
  const validatedName = SearchSchema.parse(name);
  const response = await axiosClient.get("/Doctor", {
    params: { department_name: `eq.${validatedName}` },
  });
  return response.data;
};
export const getAllDoctor = async (): Promise<DoctorTypes[]> => {
  const response = await axiosClient.get(`/Doctor`);
  return response.data;
};
export const searchDoctorsByNameSpecialistOrDepartment = async ({
  SearchName,
}: {
  SearchName: string;
}): Promise<DoctorTypes[]> => {
  const searchTerm = SearchName.trim();
  if (!searchTerm) {
    const response = await axiosClient.get("/Doctor");
    return response.data;
  }
  const response = await axiosClient.get("/Doctor", {
    params: {
      select: "*",
      or: `(name.ilike.%${searchTerm}%,specialist.ilike.%${searchTerm}%,department_name.ilike.%${searchTerm}%)`,
    },
  });
  return response.data;
};
export const searchDoctorsBySpecialistDepartmentOrAvailability = async ({
  SearchName,
}: {
  SearchName: string;
}): Promise<DoctorTypes[]> => {
  const searchTerm = SearchName.trim();
  if (!searchTerm) {
    const response = await axiosClient.get("/Doctor");
    return response.data;
  }
  const response = await axiosClient.get("/Doctor", {
    params: {
      select: "*",
      or: `(status.eq.${searchTerm},specialist.ilike.%${searchTerm}%,department_name.ilike.%${searchTerm}%)`,
    },
  });
  return response.data;
};

export const deleteDoctorFromDatabase = async (id: string) => {
  const DeleteUser = await axiosClient.delete("/Doctor", {
    params: {
      selet:"id",
      id: `eq.${id}`,
    },
  });

  return DeleteUser.data;
};

export const getDoctorById = async ({
  profileID,
}: {
  profileID: string;
}): Promise<DoctorTypes[]> => {
  const searchTerm = profileID.trim();
  if (!searchTerm) return [];
  const response = await axiosClient.get("/Doctor", {
    params: {
      select: "*",
      id: `eq.${searchTerm}`,
    },
  });
  return response.data;
};
export const DoctorAppointment = async ({
  profileID,
}: {
  profileID: string;
}): Promise<Appointment[]> => {
  const doctorId = profileID.trim();
  const response = await axiosClient.get<AppointmentApi[]>("/Appointment", {
    params: {
      select: "*",
      doctor_id: `eq.${doctorId}`,
    },
  });
  return response.data.map(({ pationt_nmae, ...appointment }) => ({
    ...appointment,
    patientName: pationt_nmae,
  }));
};

export const createDoctorRecord = async (
  FormData: DoctorFormData,
): Promise<DoctorTypes[] | { status: "error"; message: string }> => {
  const ValidationResult = DoctorSchema.safeParse(FormData);
  if (!ValidationResult.success) {
    const formatError = ValidationResult.error.issues
      .map((error) => error.message)
      .join(", ");
    return { status: "error", message: formatError };
  }
  const ValidData: DoctorFormData = ValidationResult.data;
  const res = await axiosClient.post<DoctorTypes[]>("/Doctor", ValidData);

  return res.data;
};
