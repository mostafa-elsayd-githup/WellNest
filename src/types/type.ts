export type Department = {
  id: number;
  image_url: string;
  Departments_name: string;
  description: string;
  Departments_ID: number;
};
export type Department_details = {
  title: string;
  description: string;
  about: string;
  image_url: string;
  treatments: { title: string; description: string }[];
};
export type DoctorTypes = {
  id: string;
  created_at: string;
  specialty: string;
  bio: string;
  consultation_fee: number;
  rating: number;
  name: string;
  avatar_url: string;
  department_name: string;
  total_patients: number;
  todays_appointments: number;
  status: "Available" | "Unavailable";
  specialist: string;
  Departments_ID: number;
};
export type SearchInputState = {
  GetDoctor: DoctorTypes[];
  GetPatient: PatientProp[];
  fetchError: string | null;
  NotFoundUser: string;
  SearchName: string;
  isopen: boolean;
  Loading: boolean;
  setGetDoctor: React.Dispatch<React.SetStateAction<DoctorTypes[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setGetPatient: React.Dispatch<React.SetStateAction<PatientProp[]>>;
  setFetchError: React.Dispatch<React.SetStateAction<string | null>>;
  setNotFound: React.Dispatch<React.SetStateAction<string>>;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  setIsopen: React.Dispatch<React.SetStateAction<boolean>>;
};
export type childrentype = {
  children: React.ReactNode;
};

export interface Appointment {
  id: string;
  patientName: string;
  appointment_date: string;
  appointment_time: string;
  status: "Completed" | "Pending" | "Cancelled";
}
export type FormDataType = {
  specialty: string;
  bio: string;
  consultation_fee: number;
  rating?: number;
  name: string;
  avatar_url?: string;
  department_name: string;
  total_patients?: number;
  todays_appointments: number;
  specialist: string;
  status: "Available" | "Unavailable";
  Departments_ID: number;
  email: string;
};
export type DoctorFormData = FormDataType;
export type list = {
  id: number;
  name: string;
};
export type PatientProp = {
  id: number;
  name: string;
  age: number;
  check_in: string;
  created_at: string;
  treatment: string;
  room: string;
  status: string;
  avatar_url: null;
  doctor_assigned:string
};
