import { setData } from "./firebase"

export const editProjectInFirebase = (projectId, formValues) => {
    setData("project/" + projectId, formValues);
}