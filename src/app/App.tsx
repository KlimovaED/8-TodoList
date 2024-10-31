import './App.css';
import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {MenuButton} from '../components/newButon/MenuButton';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import {CircularProgress, LinearProgress} from '@mui/material';
import {ErrorSnackBar} from '../components/errorSnackbar/ErrorSnackBar';
import {useSelector} from 'react-redux';
import {RootReducers, RootReducersType, useAppDispatch} from '../model/store';
import {RequestStatusType} from './appReducer';
import {TaskDomainType} from '../model/tasksReducer';
import {Outlet} from 'react-router-dom';
import {logoutTC, meTC} from '../features/login/auth-reducer';


export type TasksStateType = {
    [key: string]: TaskDomainType[],

}

export type ThemeMode = 'dark' | 'light';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<RootReducersType, RequestStatusType>(state => state.application.status);
    const dispatch = useAppDispatch();
    const isInitialised =useSelector<RootReducersType,boolean>(state => state.application.isInitialiser);
    const isLoggedIn = useSelector<RootReducersType,boolean>(state => state.auth.isLoggedIn)


    const [themeMode, setThemeMode] = useState<ThemeMode>('light');
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    });
    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

        useEffect(() => { // оставить пользователя на страницы после перезагрузке
             dispatch(meTC())
        }, []);

    if(!isInitialised){
        return <div style={{position:'fixed',top:'30%',textAlign:'center', width:'100%'}}><CircularProgress/></div>
    }

    const logout=()=>{
        dispatch(logoutTC())
    }


        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <ErrorSnackBar/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar
                        sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            {isLoggedIn && <MenuButton onClick={logout}>Logout</MenuButton>}
                            <MenuButton
                                background={theme.palette.primary.dark}>Faq</MenuButton>
                            <Switch color={'default'}
                                    onChange={changeModeHandler}/>
                        </div>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Outlet/>
                </Container>
            </ThemeProvider>
        );
    }


    export default App;
