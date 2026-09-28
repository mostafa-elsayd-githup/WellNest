import { z } from "zod";
export const Patientschema = z
  .string()
  .trim()
  .min(1, "Search term cannot be empty")
  .regex(/^[\p{L}\p{N}\s]+$/u, "Special characters and symbols are not allowed")
  
