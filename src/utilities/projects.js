import { setData } from "./firebase"

export const editProjectInFirebase = (projectId, formValues) => {
    console.log(projectId);
    setData("project/" + projectId, formValues);
}