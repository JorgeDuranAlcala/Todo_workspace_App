import React from 'react';
import { MyCard } from "../index";

export interface ITodoProps {
    desc: string
}

function Todo (props: ITodoProps) {

    const { desc } = props;

  return <MyCard task={desc}/>
}

export default Todo
