import { useState } from "react";
import { SearchInputContext } from "./searchInputContext";
import type { childrentype, DoctorTypes } from "../types/type";

export const SearchInputProvider = ({ children }: childrentype) => {
  const [GetDoctor, setGetDoctor] = useState<DoctorTypes[]>([]);
  const [fetchError, setFetchError] = useState<unknown>(null);
  const [NotFoundUser, setNotFound] = useState<string>("");
  const [SearchName, setSearchName] = useState<string>("");
  const [isopen, setIsopen] = useState<boolean>(false);

  return (
    <SearchInputContext.Provider
      value={{
        NotFoundUser,
        setNotFound,
        fetchError,
        setFetchError,
        setGetDoctor,
        GetDoctor,
        setSearchName,
        SearchName,
        setIsopen,
        isopen
      }}
    >
      {children}
    </SearchInputContext.Provider>
  );
};
