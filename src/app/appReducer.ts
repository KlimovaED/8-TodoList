export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string |null

const initialState:InitialStateType = {
    isInitialiser:false,
    status: 'idle' as RequestStatusType,// происходит ли сейчас взаимодействие с сервером
    error: null as ErrorType // если есть ошибка то запишем сюда
}

export type InitialStateType ={
    status:RequestStatusType
    error:ErrorType
    isInitialiser:boolean
}

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsTypeApp
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/SET-IS-INITIALIZED':
            return {...state,isInitialiser:action.isInitialized}

        default:
            return state
    }
}

export const setErrorAC=(error:string| null)=>({type:'APP/SET-ERROR',error}as const)
export const setIsInitializedAC=(isInitialized:boolean)=>({type:'APP/SET-IS-INITIALIZED',isInitialized}as const)
export const setStatusAC=(status:RequestStatusType)=>({type:'APP/SET-STATUS',status}as const);

 type SetErrorType = ReturnType<typeof setErrorAC>
 type SetStatusType =ReturnType<typeof setStatusAC>
type SetIsInitialisedType=ReturnType<typeof setIsInitializedAC>



export type ActionsTypeApp = SetErrorType | SetStatusType | SetIsInitialisedType
