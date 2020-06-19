import React, { useEffect, useState } from 'react'
import { getAllTodos, addNewGroups } from '../../../api'
import { getLocalStorage } from '../../../utils/manageLocalStorage'
import { ResponseAllTodos, Todo as todo } from '../../../interfaces/responseTodo'
import Todo from '../../Todo/Todo'
import Input from '../../Input/Input'
import AddGroup from '../../AddGroup/AddGroup'
import AddMember from '../../AddMember/AddMember'
import { makeStyles } from '@material-ui/core'

interface Props {
    
}

const styles = makeStyles({
    modalButton: {
        position: 'absolute',
        left: '4vmin',
        top: '6vmin',
        display: 'flex'
    }
})

const Dashboard = (props: Props) => {

    const [allTodos, setAllTodos] = useState<todo[]>([])
    const cls = styles()

    useEffect(() => {
        const fetchData = async () => {
            try {       
                const { todos }  = await getAllTodos() as ResponseAllTodos;
                console.log(todos)
                setAllTodos(todos)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
  
    
    return (
        <>
        <div className={cls.modalButton}>
            <AddGroup/>
            <AddMember/>
        </div>
        { allTodos && allTodos.map( (todo, index) => <Todo key={index} desc={todo.description} />) }
        <Input/>
        </>
    )
}

export default Dashboard
