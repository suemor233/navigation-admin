import client from "@/api/umi-request";
import { AboutType } from "@/views/pages/about/list/list";
import { ProjectDataType } from "@/views/pages/project/edit";


export function projectInfo(params:any) {
    return client.get('/project',{params})
}

export function projectInfoById(id:string) {
    return client.get(`/project/${id}`)
}

export function createProject(data:ProjectDataType) {
    return client.post('/project',{data})
}

export function updateProject(id:string,data:ProjectDataType) {
    return client.put(`/project/${id}`,{data})
}

export function deleteProject(data:string[]) {
    return client.delete('/project',{data})
}
