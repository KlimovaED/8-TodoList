import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducersType} from '../../model/store';
import {setErrorAC} from '../../app/appReducer';

export function ErrorSnackBar() {
    const error = useSelector<RootReducersType,string|null>(state => state.application.error);
    const isOpen = error !== null;
    const dispatch=useDispatch();
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
    };


    return (
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose} >
                <Alert
                    onClose={handleClose}
                    severity='error'
                    variant="filled"
                    sx={{ width: '100%' }}
                >{
                    error
                }
                </Alert>
            </Snackbar>
    );
}
