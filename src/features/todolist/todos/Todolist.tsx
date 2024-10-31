import {memo, useCallback, useEffect, useMemo} from 'react';
import {AddItemForm} from '../../../components/addItemForm/AddItemForm';
import {EditableSpan} from '../../../components/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx} from '../../../Todolist.styles';
import {NewButton} from '../../../components/newButon/NewButton';
import {Task} from './tasks/Task';
import {
    FilterValuesType,
    TodolistDomainType
} from '../../../model/todolistsReducer';
import {TaskStatuses, TaskType} from '../../../api/todo-lists-api';
import {useAppDispatch} from '../../../model/store';
import {getTasksTC, TaskDomainType} from '../../../model/tasksReducer';
import {TasksStateType} from '../../../app/App';


type PropsType = {
    todolist:TodolistDomainType
	tasks: TaskDomainType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: TaskStatuses, todolistId: string) => void
	removeTodolist: (todolistId: string) => void
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
    demo?:boolean
}

export const Todolist =memo( ({demo =false,...props}: PropsType) => {
    const dispatch = useAppDispatch();
	const {
        todolist,
		tasks=[],
		changeFilter,
		addTask,
		removeTodolist,
		updateTodolist,
        removeTask
	} = props

    useEffect(() => {
        if(!demo){
        dispatch(getTasksTC(todolist.id))
            }
    }, []);



	const removeTodolistHandler = () => {
		removeTodolist(todolist.id)
	}

	const addTaskCallback = useCallback(function (title: string)  {
		addTask(title, todolist.id)
	},[addTask,todolist.id])

	const updateTodolistHandler = useCallback((title: string) => {
		updateTodolist(todolist.id, title)
	},[updateTodolist,todolist.id])

    const onAllClickHandler = useCallback(() => changeFilter("all", todolist.id),[changeFilter,todolist.id]);
    const onActiveClickHandler = useCallback(() => changeFilter("active", todolist.id),[changeFilter,todolist.id]);
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", todolist.id),[changeFilter,todolist.id]);

    let filteredTask = tasks;


    filteredTask =useMemo(()=>{
        console.log('useMemo');
        if (todolist.filter === 'active') {
            filteredTask = filteredTask.filter(task=> task.status === TaskStatuses.New)
        }

        if (todolist.filter === 'completed') {
            filteredTask = filteredTask.filter(task => task.status === TaskStatuses.Completed)
        }
        return filteredTask
    },[filteredTask,todolist.filter])


	return (
		<div >
			<div className={"todolist-title-container"}>
				<h3><EditableSpan value={todolist.title} onChange={updateTodolistHandler} disabled={todolist.entityStatus==='loading'}/></h3>
				<IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus==='loading'}>
					<DeleteIcon/>
				</IconButton>
			</div>
			<AddItemForm  addItem={addTaskCallback} disabled={todolist.entityStatus==='loading'}/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{filteredTask?.map((task) => {
                            return (
                            <Task key={task.id} task={task} changeTaskStatus={props.changeTaskStatus} updateTask={props.updateTask}  removeTask={removeTask} todolistId={todolist.id} disabled={task.entityStatus === 'loading'} />)
						})}
					</List>

			}
			<Box sx={filterButtonsContainerSx}>
                <NewButton title={'All'} color={'inherit'} variant={todolist.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}/>
                <NewButton title={'Active'} color={'primary'} variant={todolist.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}/>
                <NewButton title={'Completed'} color={'secondary'} variant={todolist.filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler}/>
			</Box>
		</div>
	)
})
