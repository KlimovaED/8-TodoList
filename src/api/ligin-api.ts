import {instance} from './todo-lists-api';
import {ResponseType} from './todo-lists-api';


export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}

export type UserType={
    id:number,
    email:string,
    login:string
}



export const authApi = {
    getLogin() {
        return instance.get<ResponseType<{item:UserType}>>('auth/me')
    },
    createLogin(data: LoginType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)},
    logout(){
        return instance.delete<ResponseType>('/auth/login')
    }
}
