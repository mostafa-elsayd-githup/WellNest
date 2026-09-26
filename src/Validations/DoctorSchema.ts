import { z } from "zod";

export const DoctorSchema = z.object({
  specialty: z.string().min(1, "Specialty is required").trim(),
  bio: z.string().trim().min(2, "Please write Bio"),
  consultation_fee: z.coerce
    .number()
    .min(0, "Consultation fee cannot be negative"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  avatar_url: z.string().trim().optional().default(""),
  department_name: z
    .string()
    .min(1, "Please select Department and cannot be negative"),
  specialist: z.string().min(2, "Specialist is required").trim(),
  email: z.string().email("Invalid email address").trim(),
  status: z.enum(["Available", "Unavailable"]),
  total_patients: z.coerce.number().optional().default(0),
  todays_appointments: z.coerce.number().min(0).default(0),
  Departments_ID: z.coerce.number().min(0, "Please select a department"),
  rating: z.coerce.number().optional().default(0),
});

export const SearchSchema = z.string().trim();