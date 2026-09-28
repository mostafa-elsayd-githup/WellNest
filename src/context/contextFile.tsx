import { useState } from "react";
import { SearchInputContext } from "./searchInputContext";
import type { childrentype, DoctorTypes, PatientProp } from "../types/type";

export const SearchInputProvider = ({ children }: childrentype) => {
  const [GetDoctor, setGetDoctor] = useState<DoctorTypes[]>([]);
  const [GetPatient, setGetPatient] = useState<PatientProp[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [NotFoundUser, setNotFound] = useState<string>("");
  const [SearchName, setSearchName] = useState<string>("");
  const [isopen, setIsopen] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);

  return (
    <SearchInputContext.Provider
      value={{
        NotFoundUser,
        Loading,
        fetchError,
        GetPatient,
        GetDoctor,
        SearchName,
        isopen,
        setGetPatient,
        setLoading,
        setNotFound,
        setFetchError,
        setGetDoctor,
        setSearchName,
        setIsopen,
      }}
    >
      {children}
    </SearchInputContext.Provider>
  );
};
