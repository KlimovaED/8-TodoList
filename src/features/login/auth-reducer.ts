
import { Dispatch } from 'redux'
import {
    ActionsTypeApp, setIsInitializedAC, setStatusAC
} from '../../app/appReducer'
import {authApi, LoginType} from '../../api/ligin-api';
import {
    handleServerAppError,
    handleServerNetworkError
} from '../../utils/error-utils';




const initialState = {
    isLoggedIn:false
}
type InitialStateType = typeof initialState

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
       case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value }) as const


// thunks
export const loginTC = (data:LoginType) => (dispatch: Dispatch<ActionsType>) => {
     dispatch(setStatusAC('loading'))
    authApi.createLogin(data)
        .then(res=>{
            if(res.data.resultCode===0||res.data.resultCode===10){
                dispatch(setIsLoggedInAC(true))
                dispatch(setStatusAC('succeeded'))
            }else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((err) =>
            handleServerNetworkError(err,dispatch))

}

export const meTC =()=>(dispatch: Dispatch<ActionsType>)=>{
    dispatch(setStatusAC('loading'));

    authApi.getLogin()
        .then(res=>{
            if(res.data.resultCode===0||res.data.resultCode===10){
                dispatch(setIsLoggedInAC(true))
                dispatch(setStatusAC('succeeded'))

            }else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((err) =>
            handleServerNetworkError(err,dispatch))
        .finally(()=>{
            dispatch(setIsInitializedAC(true))
        })
}

export const logoutTC =()=>(dispatch: Dispatch<ActionsType>)=>{
    dispatch(setStatusAC('loading'));

    authApi.logout()
        .then(res=>{
            if(res.data.resultCode===0||res.data.resultCode===10){
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatusAC('succeeded'))

            }else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((err) =>
            handleServerNetworkError(err,dispatch))
        .finally(()=>{
            dispatch(setIsInitializedAC(true))
        })
}


// types
type ActionsType = | ReturnType<typeof setIsLoggedInAC>
|ActionsTypeApp
