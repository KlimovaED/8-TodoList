import {v1} from 'uuid';
import {TasksStateType} from '../app/App';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodoListsType
} from './todolistsReducer';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI, UpdateTaskModelType
} from '../api/todo-lists-api';
import {Dispatch} from 'redux';
import {AppActionsType, AppThunk, RootReducersType} from './store';
import {RequestStatusType, setErrorAC, setStatusAC} from '../app/appReducer';
import {
    handleServerAppError,
    handleServerNetworkError
} from '../utils/error-utils';

/*export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        id: string
        todolistId: string
    }
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task:TaskType
}
export type ChangeTaskType = {
    type: 'UPDATE-TASK',
    payload: {
        id: string
        model:UpdateModelTaskDomainType
        todolistId: string
    }
}*/

export type ActionTypeTask =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListsType
    | ReturnType<typeof setTasksAC>

export type TaskDomainType= TaskType & {
    entityStatus:RequestStatusType
}



export const initialTasksState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialTasksState, action: ActionTypeTask): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task,entityStatus:'idle'},  ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id == action.payload.id ? {
                    ...t,
                    ...action.payload.model
                } : t)
            }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]:[]};

        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.payload.id]
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            return action.todos.reduce((acc, td) => {
                acc[td.id] = []
                return acc
            }, state)
        }
        case 'SET-TASKS': {
            return {
                ...state, [action.todolistId]: action.tasks.map(task=>({...task,entityStatus:'idle'}))
            }
        }
        default:
            return state;

    }
}
//action
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', payload: {id: taskId,todolistId: todolistId}} as const);
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateModelTaskDomainType, todolistId: string) =>
    ({type: 'UPDATE-TASK',payload: {id: taskId,model,todolistId: todolistId}} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', todolistId, tasks} as const)

//thunk
export const getTasksTC = (todolistId: string):AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'));
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items));
            dispatch(setStatusAC('succeeded'));
        })
        .catch((err) =>
            handleServerNetworkError(err,dispatch))
}
export const addTaskTC = (todolistId: string, title: string):AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'));
    todolistAPI.createTask({todolistId, title})
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(addTaskAC(res.data.data.item));
                dispatch(setStatusAC('succeeded'));
            }else{
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((err) =>
            handleServerNetworkError(err,dispatch))
}
export const deleteTaskTC = (todolistId: string, taskId: string):AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'));
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setStatusAC('succeeded'));
        }).catch((err) =>
        handleServerNetworkError(err,dispatch))
}

export type UpdateModelTaskDomainType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, modelDomain: UpdateModelTaskDomainType):AppThunk => (dispatch, getState: () => RootReducersType) => {
    dispatch(setStatusAC('loading'));
    const state = getState();
    const task = state.tasks[todolistId].find(task => task.id === taskId)
    if (task) {
        const modelApi: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...modelDomain
        }
        todolistAPI.updateTask(todolistId, taskId, modelApi)
            .then((res) => {
                if(res.data.resultCode===0){
                    dispatch(updateTaskAC(taskId, modelDomain, todolistId));
                    dispatch(setStatusAC('succeeded'));
                }else{
                    handleServerAppError(res.data,dispatch)
                }
            })
            .catch((error) => handleServerNetworkError(error,dispatch));
    } else {
        console.warn('task non found in the state');
        return;
    }

}
