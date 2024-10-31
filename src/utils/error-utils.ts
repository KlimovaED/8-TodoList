import { setErrorAC, setStatusAC} from '../app/appReducer';
import {ResponseType} from '../api/todo-lists-api';
import {AppDispatchType} from '../model/store';

export const  handleServerNetworkError = (error:{messages:string},dispatch:AppDispatchType)=>{
    dispatch(setErrorAC(error.messages? error.messages : 'Some error' +
        ' occurred'));
    dispatch(setStatusAC('failed'));
}

export const  handleServerAppError=<D>(data:ResponseType<D>,dispatch:AppDispatchType)=>{
    if(data.messages.length){
        dispatch(setErrorAC(data.messages[0]))
    }else {
        dispatch(setErrorAC('some error'))
    }
    dispatch(setStatusAC('failed'));
}
