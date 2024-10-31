import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootReducersType, useAppDispatch} from '../../model/store';
import {
    addTododsTC,
    FilterValuesType,
    getTodosThunk, removeTodosTC,
    TodolistDomainType, updateTodosTC
} from '../../model/todolistsReducer';
import {addTaskTC, deleteTaskTC, updateTaskTC} from '../../model/tasksReducer';
import {TaskStatuses} from '../../api/todo-lists-api';
import Grid from '@mui/material/Unstable_Grid2';
import {AddItemForm} from '../../components/addItemForm/AddItemForm';
import Paper from '@mui/material/Paper';
import {Todolist} from './todos/Todolist';
import {TasksStateType} from '../../app/App';
import {Navigate} from 'react-router-dom';

type PropsType = {
    demo?:boolean
}

 export const TodolistsList:React.FC<PropsType>=({demo=false,...props}:PropsType)=>{
    const todolists = useSelector<RootReducersType,Array<TodolistDomainType>>(state=>state.todolists);
    const tasks = useSelector<RootReducersType,TasksStateType>(state => state.tasks);
     const isLogged =  useSelector<RootReducersType,boolean>(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch();


    useEffect(() => {
       if(!isLogged)return;
        if(!demo){
            dispatch(getTodosThunk)
        }
    }, []);

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(deleteTaskTC(todolistId,taskId))
    },[])

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId,title))
    },[])

    const changeTaskStatus =useCallback( function (taskId: string, taskStatus: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(todolistId,taskId,{status:taskStatus}))
    },[dispatch])
    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(updateTodosTC(todolistId,{filter}))
    },[dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodosTC(todolistId) )
    },[]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTododsTC(title) )
    },[])

    const updateTask = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId,taskId,{title}))
    },[])

    const updateTodolist = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodosTC(todolistId,{title}))
    },[]);

     if(!isLogged){
         return <Navigate to='/login'/>
     }

    return(
        <>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                { todolists.map((tl) => {
                    return (
                        <Grid  key={tl.id} >
                            <Paper sx={{p: '0 20px 20px 20px'}}>
                                <Todolist
                                    todolist={tl}
                                    key={tl.id}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    updateTask={updateTask}
                                    updateTodolist={updateTodolist}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
                }
            </Grid>
        </>)
}
