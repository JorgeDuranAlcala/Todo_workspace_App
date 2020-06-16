import { ResponseAllTodos } from "../interfaces/responseTodo";

export const getAllTodos = async (): Promise<ResponseAllTodos> => {
    const data = await fetch('http://localhost:8080/api/todos', { method: 'get', headers: {
        'Content-type': 'application/json'
    } })
    .then( res => {
        if(!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json() as Promise<ResponseAllTodos>
    })

    return data 
}