import React, { useEffect} from 'react';
import { verifyGroup } from '../../api';
import { createTodo } from '../../api/todo.api';
import { getLocalStorage } from "../../utils/manageLocalStorage";
import Dashboard from '../Pages/Dashboard/Dashboard';
import { Redirect } from 'react-router-dom';

export interface IProtectedProps {
}

export function Protected (props: IProtectedProps) {

    useEffect(() => {
        const fetchData = async () => {
            /* try {
                // const data = await verifyGroup('wild project');
                const data = await createTodo('wild project', {
                    title: 'random Todo',
                    description: 'A generic description',
                })  
                console.log(data)
                
            } catch (error) {
                console.log(error)
            } */
            
        }
        fetchData()
    }, [])

    const token = getLocalStorage('token')

  return (
    <div>
        { (token) 
            ? <Dashboard/>
            : <Redirect to="/login"/>
        }
    </div>
  );
}
