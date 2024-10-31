import {v1} from 'uuid';
import {todolistAPI, TodoListType} from '../api/todo-lists-api';
import {Dispatch} from 'redux';
import {AppActionsType, AppThunk, RootReducersType} from './store';
import {ThunkAction} from 'redux-thunk';
import {RequestStatusType, setErrorAC, setStatusAC} from '../app/appReducer';
import {
    handleServerAppError,
    handleServerNetworkError
} from '../utils/error-utils';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus:RequestStatusType
}

/*export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string,
    },
};
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodoListType
}
export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST',
    payload: {
        id: string,
        model: UpdateTodosModelDomainType
    },
}*/

export type SetTodoListsType = ReturnType<typeof setTodoListsAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

 export type ActionTodosType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodoListsType
    |  ReturnType<typeof updateTodosAC>
    | ReturnType<typeof changeTodosEntityStatusAC>

export const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTodosType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all',entityStatus:'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST': {
            return state.map(s => s.id === action.payload.id ? {
                ...s,
                ...action.payload.model
            } : s)
        }
        case 'SET-TODOLISTS': {
            return action.todos.map(td => ({...td, filter: 'all',entityStatus:'idle'}))
        }
        case 'CHANGE-TODOS-ENTITY-STATUS':{
            return state.map(s => s.id === action.todolistID ? {
                ...s, entityStatus:action.status
            } : s)
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistID: string) => ({type: 'REMOVE-TODOLIST', payload: {id: todolistID}} as const);
export const addTodolistAC = (todolist: TodoListType)=> ({type: 'ADD-TODOLIST', todolist} as const);
export const updateTodosAC = (todolistID: string, model: UpdateTodosModelDomainType) => ({type: 'CHANGE-TODOLIST', payload: {id: todolistID, model},} as const);
export const setTodoListsAC = (todos: TodoListType[]) => ({type: 'SET-TODOLISTS', todos} as const)

export const changeTodosEntityStatusAC=(todolistID:string,status:RequestStatusType)=>({type:'CHANGE-TODOS-ENTITY-STATUS',todolistID,status}as const)

export const getTodosThunk = (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setStatusAC('loading'));
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodoListsAC(res.data));
            dispatch(setStatusAC('succeeded'));
        })
        .catch((err) =>
            handleServerNetworkError(err,dispatch))
}

export const addTododsTC = (title: string):AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'));
    todolistAPI.createTodoList(title)
        .then((res) => {
          //  dispatch(getTodosThunk) // если сервер не отдает данные
           dispatch(addTodolistAC(res.data.data.item));
            dispatch(setStatusAC('succeeded'));
        })
        .catch((err) =>
            handleServerNetworkError(err,dispatch))
}

export const removeTodosTC = (todolistId: string):AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'));
    dispatch(changeTodosEntityStatusAC(todolistId,'loading'))
    todolistAPI.deleteTodoList(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId));
            dispatch(setStatusAC('succeeded'));
        })
        .catch((err) =>
            handleServerNetworkError(err,dispatch))
}

export type UpdateTodosModelDomainType = {
    id?: string
    title?: string
    addedDate?: string
    order?: number
    filter?: FilterValuesType
}
export const updateTodosTC = (todolistId: string, model: UpdateTodosModelDomainType):AppThunk => (dispatch, getState: () => RootReducersType) => {
    dispatch(setStatusAC('loading'));
    const state = getState();
    const todolist = state.todolists.find(todo => todo.id === todolistId)
    if (todolist) {
        const modelApi: TodoListType = {
            id: todolist.id,
            title: todolist.title,
            addedDate: todolist.addedDate,
            order: todolist.order,
            ...model
        }
        todolistAPI.updateTodoList(todolistId, modelApi)
            .then((res) => {
                if(res.data.resultCode===0){
                    dispatch(setStatusAC('succeeded'));
                    dispatch(updateTodosAC(todolistId, model));
                }else{
                    handleServerAppError(res.data,dispatch)
                }

            })
            .catch((err) =>
                handleServerNetworkError(err,dispatch))
    }

}

