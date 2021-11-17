import { useSelector } from "react-redux";
import { ArchiveFormState } from "./slice";

export const useArchiveFormState = () => {
  return useSelector((state:{archiveForm:ArchiveFormState}) => state.archiveForm);
};