import type {Meta, StoryObj} from '@storybook/react';
import {Task} from './Task';
import {ReduxStoreProviderDecoraor} from '../../../../stories/ReduxStoreProviderDecoraor';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducersType} from '../../../../model/store';
import {v1} from 'uuid';
import {addTaskAC} from '../../../../model/tasksReducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../../../../api/todo-lists-api';

let todolistID1=v1();

const meta:Meta<typeof Task>={
    title:'TODOLISTS/Task',
    component:Task,
    decorators:[ReduxStoreProviderDecoraor],
   tags:['autodocs'],

};
export default meta;
type Story = StoryObj<typeof Task>;


const TaskStore = ()=>{
    let task=useSelector<RootReducersType,TaskType>(state => state.tasks[todolistID1][0]);
    let dispatch = useDispatch()
/*if(!task) {
    task = {id: v1(), title: 'JS', status:TaskStatuses.New,addedDate:'',order:0,priority:TaskPriorities.Low,deadline:'',description:'',startDate:'',todoListId:todolistID1}
    dispatch(addTaskAC('DEFAULT TASK', 'todolist1'))
}*/
  return<Task changeTaskStatus={()=>{}} updateTask={()=>{}} removeTask={()=>{}} task={task} todolistId={todolistID1}/>
}

export const TaskStory:Story={
    render:()=><TaskStore />
}


