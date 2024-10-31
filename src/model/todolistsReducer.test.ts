/*import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from './todolistsReducer';
import {v1} from 'uuid';

test('correct todolist should be removed',()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const initialState:TodolistDomainType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all',addedDate:'',order:0},
        {id: todolistID2, title: 'What to buy', filter: 'all',addedDate:'',order:0},
    ]

    const endState = todolistsReducer(initialState,removeTodolistAC(todolistID1));

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)

})

test('correct todolist should be add',()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const initialState:TodolistDomainType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all',addedDate:'',order:0},
        {id: todolistID2, title: 'What to buy', filter: 'all',addedDate:'',order:0},
    ]

    const newTitle = 'New Title'


    const endState = todolistsReducer(initialState,addTodolistAC(newTitle));

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)

})

test('correct todolist should change its name',()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const initialState:TodolistDomainType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all',addedDate:'',order:0},
        {id: todolistID2, title: 'What to buy', filter: 'all',addedDate:'',order:0},
    ]

    const newTitle = 'New Title'

    const endState = todolistsReducer(initialState,changeTodolistTitleAC(todolistID2,newTitle));

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)

})

test('correct filter of todolist should changed',()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const initialState:TodolistDomainType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all',addedDate:'',order:0},
        {id: todolistID2, title: 'What to buy', filter: 'all',addedDate:'',order:0},
    ]



    const endState = todolistsReducer(initialState,changeTodolistFilterAC('completed',todolistID2));

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')

})*/

import {v1} from 'uuid';
import {
    changeTodosEntityStatusAC,
    TodolistDomainType,
    todolistsReducer
} from './todolistsReducer';
import {RequestStatusType} from '../app/appReducer';

test('correct filter of todolist should changed',()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const initialState:TodolistDomainType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all',addedDate:'',order:0,entityStatus:'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all',addedDate:'',order:0,entityStatus:'loading'},
    ]

let newStatus:RequestStatusType= 'idle';

    const endState = todolistsReducer(initialState,changeTodosEntityStatusAC(todolistID2,newStatus));

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].filter).toBe('idle')

})
