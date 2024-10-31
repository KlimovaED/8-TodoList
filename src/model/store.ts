import {
    applyMiddleware,
    combineReducers,
    legacy_createStore
} from 'redux';
import { Action } from 'redux';
import {ActionTypeTask, tasksReducer} from './tasksReducer';
import {
    ActionTodosType,
    todolistsReducer
} from './todolistsReducer';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk'
import {useDispatch} from 'react-redux';
import {ActionsTypeApp, appReducer} from '../app/appReducer';
import {authReducer} from '../features/login/auth-reducer';


export const RootReducers = combineReducers({
    tasks: tasksReducer,
    todolists:todolistsReducer,
    application:appReducer,
    auth:authReducer
})

export const store = legacy_createStore(RootReducers, applyMiddleware(thunk));
export type RootReducersType = ReturnType<typeof RootReducers>;

export type AppDispatchType = ThunkDispatch<RootReducersType, unknown, Action>;
export type AppActionsType = ActionTypeTask|ActionTodosType | ActionsTypeApp
export const useAppDispatch = useDispatch<AppDispatchType>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootReducersType,
    unknown,
    AppActionsType
>

// @ts-ignore
window.store=store;
