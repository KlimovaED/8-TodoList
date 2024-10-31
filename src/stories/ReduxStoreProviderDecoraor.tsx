import React from 'react';
import {Provider} from 'react-redux';
import { RootReducersType} from '../model/store';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todo-lists-api';
import {tasksReducer} from '../model/tasksReducer';
import {todolistsReducer} from '../model/todolistsReducer';
import {appReducer} from '../app/appReducer';
import {thunk} from 'redux-thunk';
import {authReducer} from '../features/login/auth-reducer';
import {string} from 'prop-types';


const RootReducers= combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer,
    application:appReducer,
    auth:authReducer
})

const initialGlobalState:RootReducersType={
    todolists:[
        {id:'todoListId1',title:'What to learn',filter:'all',addedDate:'',order:0,entityStatus:'idle'},
        {id:'todoListId2',title:'What to buy',filter:'all',addedDate:'',order:0,entityStatus:'loading'}
    ],
    tasks:{
        ['todoListId1']:[
            {id:v1(),title:'HTML',status:TaskStatuses.Completed,todoListId:'todoListId1',description:'',startDate:'',deadline:'',order:0,priority:TaskPriorities.Low,addedDate:'',entityStatus:'idle'},
            {id:v1(),title:'JS',status:TaskStatuses.Completed,todoListId:'todoListId1',description:'',startDate:'',deadline:'',order:0,priority:TaskPriorities.Low,addedDate:'',entityStatus:'idle'},
            {id:v1(),title:'React',status:TaskStatuses.Completed,todoListId:'todoListId1',description:'',startDate:'',deadline:'',order:0,priority:TaskPriorities.Low,addedDate:'',entityStatus:'idle'}],
        ['todoListId2']:[
            {id:v1(),title:'Milk',status:TaskStatuses.Completed,todoListId:'todoListId2',description:'',startDate:'',deadline:'',order:0,priority:TaskPriorities.Low,addedDate:'',entityStatus:'idle'},
            {id:v1(),title:'React Book',status:TaskStatuses.Completed,todoListId:'todoListId2',description:'',startDate:'',deadline:'',order:0,priority:TaskPriorities.Low,addedDate:'',entityStatus:'idle'},
            {id:v1(),title:'Egg',status:TaskStatuses.Completed,todoListId:'todoListId2',description:'',startDate:'',deadline:'',order:0,priority:TaskPriorities.Low,addedDate:'',entityStatus:'idle'}]
    },
    application:{
        isInitialiser:false,
        error: null,
        status: 'idle'
    },
    auth:{
        isLoggedIn: false
    }
}

export const storyBookStore = legacy_createStore(RootReducers,initialGlobalState,applyMiddleware(thunk))
export const ReduxStoreProviderDecoraor=(storyFn:()=>React.ReactNode)=>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
