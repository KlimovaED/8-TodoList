import React, { useEffect, useState } from 'react'
import {todolistAPI} from './todo-lists-api';


export default {
    title: 'API',
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res)=>setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodoList('hai')
            .then((res)=>setState(res))
    }, [state])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = '06532ed3-a7f5-4682-8f16-ecaa5ade7182'
        todolistAPI.deleteTodoList(id)
            .then((res)=>setState(res))
    }, [state])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = '938a36b6-1fee-4e76-a804-ac6ac8f81c3b'
        todolistAPI.updateTodoList(id,{})
            .then((res)=>setState(res))
    }, [state])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = '0603e108-5402-42e0-b5c4-0d85ef59ed8d'
        todolistAPI.getTasks(id)
            .then((res)=>setState(res.data.items))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')


    const createTask=()=>{
        todolistAPI.createTask({todolistId,title})
            .then((res)=>setState(res.data.data))
    }

    return <div>{JSON.stringify(state)}
    <div>
    <input placeholder={'todo-list ID'} value={todolistId}
    onChange={(e) => setTodolistId(e.currentTarget.value)}/>
    <input placeholder={'new Title'} value={title}
    onChange={(e) => setTitle(e.currentTarget.value)}/>
    <button onClick={createTask}>create</button>
        </div>
        </div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data.items))
    }

    return <div>{JSON.stringify(state)}
    <div>
    <input placeholder={'todo-list ID'} value={todolistId}
    onChange={(e) => setTodolistId(e.currentTarget.value)}/>
    <input placeholder={'task ID'} value={taskId}
    onChange={(e) => setTaskId(e.currentTarget.value)}/>
    <button onClick={deleteTask}>delete</button>
        </div>
        </div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTask = () => {
      /* todolistAPI.updateTask(todolistId, taskId,model)
            .then((res) => setState(res.data.items))*/
    }

    return <div>{JSON.stringify(state)}
    <div>
    <input placeholder={'todo-list ID'} value={todolistId}
    onChange={(e) => setTodolistId(e.currentTarget.value)}/>
    <input placeholder={'task ID'} value={taskId}
    onChange={(e) => setTaskId(e.currentTarget.value)}/>
    <input placeholder={'new Title'} value={title}
    onChange={(e) => setTitle(e.currentTarget.value)}/>
    <button onClick={updateTask}>update</button>
        </div>
        </div>
}
