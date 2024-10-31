// @flow
import * as React from 'react';
import {ChangeEvent, memo} from 'react';
import {getListItemSx} from '../../../../Todolist.styles';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../../../../components/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import {useDispatch} from 'react-redux';
import {TaskStatuses, TaskType} from '../../../../api/todo-lists-api';

type Props = {
    task:TaskType
    todolistId:string
    removeTask:any
    changeTaskStatus:any
    updateTask:any
    disabled?:boolean
};
export const Task = memo(({task,todolistId, removeTask,changeTaskStatus,updateTask,disabled=false}:Props) => {
    const dispatch = useDispatch();
    const removeTaskHandler = () => {
        removeTask(task.id, todolistId)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }

    const changeTaskTitleHandler = (title: string) => {
        updateTask(todolistId, task.id, title)
    }
    return (
        <ListItem sx={getListItemSx(task.status === TaskStatuses.Completed)} >
            <div>
                <Checkbox checked={task.status=== TaskStatuses.Completed} onChange={changeTaskStatusHandler} disabled={disabled}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={disabled}/>
            </div>
            <IconButton onClick={removeTaskHandler} disabled={disabled} >
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
});
