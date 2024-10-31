import {
    appReducer,
    InitialStateType,
    setErrorAC,
    setStatusAC
} from './appReducer';

let startState:InitialStateType

beforeEach(()=>{
 startState={
     isInitialiser:false,
     error: null,
     status: 'idle'
 }
})

test('correct error message be set',()=>{
const endState =appReducer(startState,setErrorAC('some error'));
expect(endState.error).toBe('some error');
})
test('correct status  be set',()=>{
    const endState =appReducer(startState,setStatusAC('succeeded'));
    expect(endState.status).toBe('succeeded');
})
