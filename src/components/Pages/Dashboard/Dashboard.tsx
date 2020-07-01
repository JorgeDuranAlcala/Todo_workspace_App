import React, { useEffect, useState } from 'react'
import { getAllTodos, addNewGroups } from '../../../api'
import { getLocalStorage, setLocalStorage } from '../../../utils/manageLocalStorage'
import { ResponseAllTodos, Todo as todo, User } from '../../../interfaces/responseTodo'
import Todo from '../../Todo/Todo'
import Input from '../../Input/Input'
import AddGroup from '../../AddGroup/AddGroup'
import AddMember from '../../AddMember/AddMember'
import { makeStyles, Modal, Typography, Button,  } from '@material-ui/core'
import { createTodo } from '../../../api/todo.api'
import { getUserProfile } from '../../../api/profile.api'
import { Alert } from "@material-ui/lab";
import { Cancel } from "@material-ui/icons";
import Spinner from '../../Spinner/Spinner'
import ChangeGroup from '../../ChangeGroup/ChangeGroup'
import img from "../../../assets/img/adventure.jpg"

interface Props {
    
}

const styles = makeStyles({
    modalButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        padding: '2vmin'
    },
    headCont: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        height: '10%',
        marginTop: '2.5vmin',
    },
    cont: {
        display: 'flex',
        position: 'relative',
        height: '100%',
        maxHeight: 'auto',
        flexDirection: 'column',
        marginTop: '5vmin',
        marginLeft: '4vmin'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxHeight: 'auto',
    },
    paper: {
        width: 400,
        position: 'absolute',
        left: '40%',
        top: '40%',
        padding: '4vmin 6vmin',
        background: '#fff',
    },
    alert: {
        width: '80%',
        marginBottom: '3vmin'
    }
})

const Dashboard = (props: Props) => {

    const initialState: User = {
        _id: '',
        username: '',
        email: '',
        password: '',
        groups: [''],
    }

    interface alertState {
        message?: string;
        reveal: boolean;
        color?: "success" | "info" | "warning" | "error" | undefined
    }

    const [allTodos, setAllTodos] = useState<todo[]>([])
    const [state, setState] = useState<{description: string}>({description: ''})
    const [user, setUser] = useState(initialState)
    const [open, setOpen] = useState(true)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [alert, setAlert] = useState<alertState>({
        message: '', reveal: false, color: undefined
    })
    const cls = styles()
    const grpName = getLocalStorage('currGroup') as string;

    useEffect(() => {
        const fetchData = async () => {
            try {       
               const data = await getAllTodos(grpName) as ResponseAllTodos;
               setAllTodos(data.todos)
            } catch (error) {
                console.log(error)
            }
            try {       
               const dataUser = await getUserProfile()
               setUser(dataUser)
               
            } catch (error) {
                console.log(error)
            }
           
        }
        fetchData()
    }, [grpName, user])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()    
        try {
            const data = await createTodo(grpName, state) 
            setLoading(true)
            setAlert({ 
                reveal: true, 
                color: 'success', 
                message: "Todo added successfuly" 
            })
           
            setTimeout(() => {
                setLoading(false)
                setAlert({
                    reveal: false
                })
            }, 2000);

        } catch (error) {
            console.log(error)
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //e.preventDefault()    
        const { value }  = e.target
        const todo = { description: value }
        setState(todo)
    }

    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const groupName = e.currentTarget.textContent as string;
        setLocalStorage('currGroup', groupName)
        setOpen(false);
      };
    
    const handleMessage = (message: string | null, err: string | null) => {
        if(message) setMessage(message)
        if(err) setMessage(err)
    }

    const body = (
        <div className={cls.paper}>
                 { 
                    user?.groups?.map(groupName => {
                    return <Button variant="outlined" color="primary"  onClick={e => handleClose(e)}>
                        {groupName}
                    </Button>
                    })
                 }
        </div>
      );
  
    
    return (
        <>
           
           <Modal 
                open={open}
                >
               {body}
            </Modal>
            <div className={cls.container} style={{ background: `url(${img})` }}>
                <div className={cls.headCont}>
                    <div className={cls.modalButton}>
                        <AddGroup sendMessage={handleMessage}/>
                        <AddMember/>
                        <ChangeGroup user={user} />
                    </div>
                    <Input onSubmit={handleSubmit} handleChange={handleChange} />
                </div>
                <div className={cls.cont}>
                    { alert.reveal && <Alert color={alert.color} className={cls.alert} title="You're todo has been added">
                        {alert.message}
                    </Alert>}
                    { loading && <Spinner/> }
                    { !loading && allTodos && allTodos.map( (todo, index) => <Todo key={index} desc={todo.description} isDone={todo.isDone} id={todo._id} />) }      
                </div>
            </div>
        </>
    )
}

export default Dashboard
