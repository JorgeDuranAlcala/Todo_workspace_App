import React, { useState } from 'react'
import { makeStyles, TextField, Card, Button, Typography } from '@material-ui/core'
import { loginUser } from "../../../api/index";
import { setLocalStorage } from '../../../utils/manageLocalStorage';
import { Redirect } from 'react-router-dom';

interface Props {
    
}

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cont: {
        padding: '8vmin 2vmin'
    },
    form: {
        padding: '1vmin',
        display: 'flex',
        flexDirection: 'column'
    },
    fiels: {
        margin: '3vmin 0 2.5vmin 0'
    }
})

const Login = (props: Props) => {

        const [state, setState] = useState({
            email: '', password: ''
        })
        const [redirect, setRedirect] = useState(false)

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await loginUser(state);
            setLocalStorage('token', data.token)
            setRedirect(true)
        } catch (error) {
            console.log(error)
        }
        
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const cls = useStyles()
    return (
        <div className={cls.root}>
            { redirect && <Redirect to="/" /> }
            <Card className={cls.cont}>
                <form className={cls.form} onSubmit={e=>handleSubmit(e)}>
                    <Typography variant="h4">Log In</Typography>
                    <TextField className={cls.fiels} name="email" onChange={e=>handleChange(e)} label="Email" variant="outlined"/>
                    <TextField className={cls.fiels} name="password" type="password" onChange={e=>handleChange(e)} label="Password" variant="outlined"/>
                    <Button color="primary" variant="contained" type="submit">Login</Button>
                </form>
            </Card>
        </div>
    )
}

export default Login
