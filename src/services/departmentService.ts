import axiosClient from "../api/axiosClient";
import type {
  Appointment,
  Department,
  Department_details,
  DoctorTypes,
  patientFormType,
  PatientProp,
} from "../types/type";
import { type DoctorFormData } from "../types/type";
import { getErrorMessage } from "../utils/getErrorMessage";
import { DoctorSchema, SearchSchema } from "../Validations/DoctorSchema";
import { patientFormData, Patientschema } from "../Validations/patientSchame";

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
    treatments: (department.treatments ?? []).map(
      ({ tilte, ...treatment }) => ({
        ...treatment,
        title: tilte,
      }),
    ),
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
      or: `(status.ilike.%${searchTerm},specialist.ilike.%${searchTerm}%,department_name.ilike.%${searchTerm}%)`,
    },
  });
  return response.data;
};

export const deleteDoctorFromDatabase = async (id: string) => {
  const DeleteUser = await axiosClient.delete("/Doctor", {
    params: {
      selet: "id",
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

// patient func

export const GetAllPatient = async (): Promise<PatientProp[]> => {
  const responseToGetPatient = await axiosClient.get("/patient");
  if (
    Array.isArray(responseToGetPatient.data) &&
    responseToGetPatient.data.length === 0
  ) {
    return [];
  }
  return responseToGetPatient.data;
};

export const SearchPatientBy_Name_Age_Status = async (
  SearchName: string,
): Promise<PatientProp[]> => {
  const datavalidation = Patientschema.safeParse(SearchName);
  if (!datavalidation.success) {
    throw new Error("Invalid search input type");
  }
  const seatchKey = Number(datavalidation.data)
    ? `(id.eq.${SearchName})`
    : `(name.ilike.%${SearchName}%)`;
  const responseSearchPatientBY_Name_ID = await axiosClient.get("/patient", {
    params: {
      select: "*",
      or: seatchKey,
    },
  });
  return responseSearchPatientBY_Name_ID.data;
};
export const serachByStatus = async (
  status: string,
): Promise<PatientProp[]> => {
  const responsePatient = await axiosClient.get("/patient", {
    params: {
      select: "*",
      status: `eq.${status}`,
    },
  });
  return responsePatient.data;
};

export const CreatPatient = async (FormData: patientFormType) => {
  const validation_Result = patientFormData.safeParse(FormData);
  if (validation_Result.error) {
    const formatError = validation_Result.error.issues.map((erro) => {
      return {
        error: erro.code,
        message: erro.message,
        InputError: erro.path[0],
      };
    });
    return { success: false, error: formatError[0] };
  }
  if(validation_Result.success){

    try {
      const res = await axiosClient.post("/patient", validation_Result.data);
      return {
        status: "success",
        message: "Patient record has been created successfully.",
        data: res.data,
      };
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to register patient record. Please try again.",
      );
      return { status: "error", message };
    }
  }
};
