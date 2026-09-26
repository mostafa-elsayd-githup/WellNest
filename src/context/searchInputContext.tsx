import { createContext } from "react";
import type { SearchInputState } from "../types/type";
const defaultState: SearchInputState = {
  fetchError: null,
  GetDoctor: [],
  NotFoundUser: "",
  SearchName: "",
  isopen: false,
  setIsopen:()=>{},
  setGetDoctor: () => {},
  setFetchError: () => {},
  setNotFound: () => {},
  setSearchName: () => {},
};
export const SearchInputContext = createContext<SearchInputState>(defaultState);
