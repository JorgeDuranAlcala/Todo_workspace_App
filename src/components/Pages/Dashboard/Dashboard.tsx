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
    },
    cont: {
        display: 'flex',
        position: 'relative',
        height: 'inherit',
        maxHeight: 'auto',
        flexDirection: 'column',
        marginTop: '5vmin'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: 'inherit',
        maxHeight: 'auto'
    },
    paper: {
        width: 200,
        position: 'absolute',
        left: '40%',
        top: '40%',
        padding: '4vmin 6vmin',
        background: '#fff',
    },

})

const Dashboard = (props: Props) => {

    const initialState: User = {
        _id: '',
        username: '',
        email: '',
        password: '',
        groups: [''],
    }

    const [allTodos, setAllTodos] = useState<todo[]>([])
    const [state, setState] = useState<{description: string}>({description: ''})
    const [user, setUser] = useState(initialState)
    const [open, setOpen] = useState(true)
    const [message, setMessage] = useState('')
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
        console.log(message)
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
            <div className={cls.container}>
                <div className={cls.headCont}>
                    <div className={cls.modalButton}>
                        <AddGroup sendMessage={handleMessage}/>
                        <AddMember/>
                    </div>
                    <Input onSubmit={handleSubmit} handleChange={handleChange} />
                </div>
                <div className={cls.cont}>
                    
                    { allTodos && allTodos.map( (todo, index) => <Todo key={index} desc={todo.description} isDone={todo.isDone} id={todo._id} />) }      
                </div>
            </div>
        </>
    )
}

export default Dashboard
