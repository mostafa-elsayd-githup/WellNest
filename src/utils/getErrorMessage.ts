import axios from "axios";

export function getErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (axios.isAxiosError(error)) {
    const responseData: unknown = error.response?.data;

    if (typeof responseData === "string" && responseData.trim()) {
      return responseData;
    }

    if (typeof responseData === "object" && responseData !== null) {
      if (
        "message" in responseData &&
        typeof responseData.message === "string" &&
        responseData.message.trim()
      ) {
        return responseData.message;
      }
    }

    if (error.code === "ERR_NETWORK") {
      return "Network connection error. Please check your internet connection.";
    }

    if (error.response?.status === 404) {
      return "The requested data could not be found.";
    }

    return fallback;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}
