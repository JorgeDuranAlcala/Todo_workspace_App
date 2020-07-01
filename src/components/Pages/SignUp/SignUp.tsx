import React, { useState } from 'react'
import { registerUser } from "../../../api/index";
import { setLocalStorage } from "../../../utils/manageLocalStorage";
//import { User } from "../../../interfaces/responseTodo";
import { makeStyles, TextField, Card, Button, Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom';

interface Props {
    
}

interface state {
    username: string;
    email: string;
    password: string
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
        padding: '4vmin 9vmin'
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

interface State {
    username: string;
    email: string;
    password: string;
    groupName: string;
}

const SignUp = (props: Props) => {

    const [state, setState] = useState<State>({
        username: '', email: '', password: '', groupName: ''
    })

    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await registerUser(state);
            const { token, group: { groupName } } = data
            setLocalStorage('currGroup', groupName)
            setLocalStorage('token', token)
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
            { redirect && <Redirect to="/login" /> }
            <Card className={cls.cont}>
                <form className={cls.form} onSubmit={e => handleSubmit(e)}>
                    <Typography variant="h4">Sign Up</Typography>
                    <TextField className={cls.fiels} name="username" onChange={e => handleChange(e)} label="Username" variant="outlined"/>
                    <TextField className={cls.fiels} name="email" onChange={e => handleChange(e)} label="Email" variant="outlined"/>
                    <TextField className={cls.fiels} name="password" onChange={e => handleChange(e)} label="Password" type="password" variant="outlined"/>
                    <TextField className={cls.fiels} onChange={e => handleChange(e)} label="Repeat Password" type="password" variant="outlined"/>
                    <TextField className={cls.fiels} name="groupName" onChange={e => handleChange(e)} label="Group name" variant="outlined"/>
                    <Button type="submit" color="primary" variant="contained" >Sign Up</Button>
                </form>
            </Card>
        </div>
    )
}

export default SignUp
