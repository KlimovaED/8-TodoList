// @flow
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from './auth-reducer';
import {RootReducersType} from '../../model/store';
import {Navigate, redirect} from 'react-router-dom'


type FormikErrorType={
    email?:string
    password?:string
    rememberMe?:boolean
}
export const Login = () => {
 const isLogged =  useSelector<RootReducersType,boolean>(state => state.auth.isLoggedIn)

    const dispatch=useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate:values => {
            const errors:FormikErrorType={}
            if( !values.email.trim()){
                errors.email='Required'
            }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
                errors.email ='Invalid email address'
            }
            if(!values.password.trim()){
                errors.password='Requires'
            }else if(values.password.length<6){
                errors.password='The password must be longer than 6 characters'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
         //   formik.resetForm()
        },
    });

 if(isLogged){
     return <Navigate to='/todolists'/>
 }


    return (
        <Grid container justifyContent={'center'}>
            <Grid justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}>
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal"
                                {...formik.getFieldProps('email')}/>
                            {formik.touched.email && formik.errors.email?<div style={{color:'red'}}>{formik.errors.email}</div>:null}
                            <TextField type="password" label="Password"
                                       margin="normal" {...formik.getFieldProps('password')}/>
                            {formik.touched.password && formik.errors.password?<div style={{color:'red'}}>{formik.errors.password}</div>:null}
                            <FormControlLabel label={'Remember me'}
                                              control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}/>}/>
                            <Button type={'submit'} variant={'contained'}
                                    color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
