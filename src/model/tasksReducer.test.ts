
/*import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {
    addTodolistAC,
    removeTodolistAC,
    todolistID1,
    todolistID2
} from './todolistsReducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from './tasksReducer';
import {TaskPriorities, TaskStatuses} from '../stories/todo-lists-api';

test('correct task should be removed', () => {

    const removedTask = v1()
    const initialState: TasksStateType = {
        [todolistID1]: [
            {
                id: removedTask,
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''
            },
            {id: v1(), title: 'JS',  status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
            {id: v1(), title: 'ReactJS',  status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API',  status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
            {id: v1(), title: 'GraphQL',  status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
        ],
    };

    const endState = tasksReducer(initialState, removeTaskAC(removedTask, todolistID1))

    expect(endState[todolistID1].length).toBe(2)

})

test('correct task should be add', () => {

    const newTaskTitle = 'new Title'
    const initialState: TasksStateType = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
            {id: v1(), title: 'ReactJS', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
            {id: v1(), title: 'GraphQL', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
        ],
    };

    const endState = tasksReducer(initialState, addTaskAC(newTaskTitle, todolistID1))

    expect(endState[todolistID1].length).toBe(4)

})

test('correct task status should be change', () => {

    const newTaskStatus = true;
    const changedId = v1()
    const initialState: TasksStateType = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
            {id: changedId, title: 'ReactJS', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
            {id: v1(), title: 'GraphQL', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
        ],
    };

    const endState = tasksReducer(initialState, changeTaskStatusAC(changedId, newTaskStatus? TaskStatuses.Completed:TaskStatuses.New, todolistID1))

    expect(endState[todolistID1][2].status).toBe(true)

})

test('correct task new Title should be change', () => {
    const newTitle = 'Redux';
    const changedId = v1();
    const initialState: TasksStateType = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
            {id: changedId, title: 'ReactJS', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
            {id: v1(), title: 'GraphQL', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
        ],
    };

    const endState = tasksReducer(initialState, updateTaskTitleAC(todolistID1, changedId, newTitle,))

    expect(endState[todolistID1][2].title).toBe(newTitle)

})


test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
            {id: '3', title: 'React', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
            {id: '3', title: 'tea', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''},
            {id: '3', title: 'React', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID1,
                addedDate:''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''},
            {id: '3', title: 'tea', status: TaskStatuses.New,
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                deadline:'',
                todoListId:todolistID2,
                addedDate:''}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})*/
