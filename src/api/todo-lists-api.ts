import axios from 'axios';
import {UpdateTodosModelDomainType} from '../model/todolistsReducer';


export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '2f165259-0e13-489e-bec8-0fc7b32eeeea',
    },
}
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings

})

export type TodoListType = {
    id:string
    title:string
    addedDate:string
    order:number
}

export enum TaskStatuses {
    New=0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low= 0,
    Middle = 1,
    Hi=2,
    Urgently = 3,
    Later= 4
}


export type TaskType={
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type ResponseType<D ={}>={
    resultCode: number
    messages: Array<string>,
    data: D

}
export type ResponseTaskType= {
    error:string|null
    totalCount:number
    items:Array<TaskType>
}
export type UpdateTaskModelType = {
    title:string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}


export const todolistAPI = {
    getTodolist(){
        return instance.get<Array<TodoListType>>('todo-lists')
    },
    createTodoList(title:string){
        return instance.post<ResponseType<{item:TodoListType}>>('todo-lists',{title:title})
    },
    deleteTodoList(id:string){
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
    },
    updateTodoList(id:string,model:UpdateTodosModelDomainType){
        return instance.put<ResponseType<{}>>(`todo-lists/${id}`,model)
    },
    getTasks(id:string){
        return instance.get<ResponseTaskType>(`todo-lists/${id}/tasks`)
    },
    createTask(data:{todolistId:string,title:string}){
        return instance.post<ResponseType<{item: TaskType }>>(`todo-lists/${data.todolistId}/tasks`,{title:data.title})
    },
    deleteTask(id:string,taskId:string){
        return instance.delete<ResponseTaskType>(`todo-lists/${id}/tasks/${taskId}`)
    },
    updateTask(id:string,taskId:string,model:UpdateTaskModelType){
        return instance.put<ResponseType<{item: TaskType }>>(`todo-lists/${id}/tasks/${taskId}`,model)
    }
}
