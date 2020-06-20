import React, { useEffect, useState } from 'react'
import { getAllTodos, addNewGroups } from '../../../api'
import { getLocalStorage } from '../../../utils/manageLocalStorage'
import { ResponseAllTodos, Todo as todo } from '../../../interfaces/responseTodo'
import Todo from '../../Todo/Todo'
import Input from '../../Input/Input'
import AddGroup from '../../AddGroup/AddGroup'
import AddMember from '../../AddMember/AddMember'
import { makeStyles } from '@material-ui/core'
import { createTodo } from '../../../api/todo.api'

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
    }

})

const Dashboard = (props: Props) => {

    const [allTodos, setAllTodos] = useState<todo[]>([])
    const [state, setState] = useState<{description: string}>({description: ''})
    const cls = styles()
    const grpName = getLocalStorage('currGroup') as string;

    useEffect(() => {
        const fetchData = async () => {
            try {       
               const data = await getAllTodos(grpName) as ResponseAllTodos;
                console.log(data)
                setAllTodos(data.todos)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [allTodos])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()    
        try {
            const data = await createTodo(grpName, state)  
            console.log(data)
        } catch (error) {
            console.log(error)
        }
       // console.log(state)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //e.preventDefault()    
        const { value }  = e.target
        const todo = { description: value }
        setState(todo)
    }
  
    
    return (
        <div className={cls.container}>
            <div className={cls.headCont}>
                <div className={cls.modalButton}>
                    <AddGroup/>
                    <AddMember/>
                </div>
                <Input onSubmit={handleSubmit} handleChange={handleChange} />
            </div>
            <div className={cls.cont}>
            { allTodos && allTodos.map( (todo, index) => <Todo key={index} desc={todo.description} />) }      
            </div>
        </div>
    )
}

export default Dashboard
