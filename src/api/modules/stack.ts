import client from "@/api/umi-request";
import { Stack } from "@/models/StackType";


export function stackInfo() {
    return client.get('/stack')
}

export function updateStack(data:Stack[]) {
    return client.post('/stack',{data})
}
