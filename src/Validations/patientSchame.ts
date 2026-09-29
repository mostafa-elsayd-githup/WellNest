import { z } from "zod";
const noSpecialCharsString = (minLength = 1, requiredMessage: string) =>
  z
    .string()
    .trim()
    .min(minLength, requiredMessage)
    .regex(
      /^[\p{L}\p{N}\s]*$/u,
      "Special characters and symbols are not allowed",
    );
export const Patientschema = noSpecialCharsString(
  1,
  "earch term cannot be empty",
);

export const patientFormData = z.object({
  name: noSpecialCharsString(1, "Name is Required"),
  age: z.coerce.number().min(0, "Age must not be negative"),
  check_in: noSpecialCharsString(1, "Check-in Date is Required"),
  status: z.enum(["Admitted", "Discharged", "In Treatment", "Critical"]),
  doctor_assigned: noSpecialCharsString(1, "Doctor Assigned is Required"),
  room: noSpecialCharsString(1, "Room Assigned is Required"),
  treatment: noSpecialCharsString(1, "Treatment is Required"),
  avatar_url: z.string().optional(),
})
