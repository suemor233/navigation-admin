import client from "@/api/umi-request";
import { AboutType } from "@/views/pages/About";
import { ProjectDataType } from "@/views/pages/Project/edit";


export function projectInfo(params:any) {
    return client.get('/project',{params})
}

export function createProject(data:ProjectDataType) {
    return client.post('/project',{data})
}

export function deleteProject(data:string[]) {
    return client.delete('/project',{data})
}