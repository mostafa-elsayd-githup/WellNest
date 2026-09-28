import { createContext } from "react";
import type { SearchInputState } from "../types/type";
const defaultState: SearchInputState = {
  fetchError: null,
  GetDoctor: [],
  GetPatient: [],
  Loading: false,
  NotFoundUser: "",
  SearchName: "",
  isopen: false,
  setIsopen: () => {},
  setLoading: () => {},
  setGetDoctor: () => {},
  setGetPatient: () => {},
  setFetchError: () => {},
  setNotFound: () => {},
  setSearchName: () => {},
};
export const SearchInputContext = createContext<SearchInputState>(defaultState);
