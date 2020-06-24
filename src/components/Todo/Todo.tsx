import React, { FunctionComponent } from 'react';
import { MyCard } from "../index";
import cls from "./Todo.module.css";
import { deleteTodo, updateTodo } from '../../api/todo.api';

export interface ITodoProps {
    desc: string;
    id?: string;
    isDone?: boolean;
}

const Todo: FunctionComponent<ITodoProps> = function ({ desc, id, isDone }) {

    const clickHandler = async () => {
        const { message, removedTodo } = await deleteTodo(id)
        console.log(message, removedTodo)
    }

    const clickHandlerToUpdate = async (isDone: boolean) => {
      console.log(isDone)
       const { message, todoUpdated }  = await updateTodo(id, { isDone })
        console.log(message, todoUpdated)
    }

  return <MyCard task={desc} onClickToUpdate={clickHandlerToUpdate} isDone={isDone} onClickToDelete={clickHandler}/>
}

export default Todo
