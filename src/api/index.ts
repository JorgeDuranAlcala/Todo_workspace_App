import { ResponseAllTodos, responseRegisterUsers, User, responseGroup } from "../interfaces/responseTodo";
import { getLocalStorage } from "../utils/manageLocalStorage";

export const getAllTodos = async (groupName: string): Promise<ResponseAllTodos> => {
    const token = getLocalStorage('token')
    return await fetch(`http://localhost:8080/api/todos/${groupName}`, {
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        }
    })
        .then( res => {
            if(!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json() as Promise<ResponseAllTodos>
        })

}

export const registerUser = async (body: User): Promise<responseRegisterUsers> => {

    const data = await fetch('http://localhost:8080/api/signup', 
    { method: 'post',
     headers: {'Content-type': 'application/json'},
     body: JSON.stringify(body)
     })
    .then( res => {
        if(!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json() as Promise<responseRegisterUsers>
    })

    return data 
}

export const loginUser = async (body: User): Promise<{message: string, token: string}> => {

    const data = await fetch('http://localhost:8080/api/login', 
    { method: 'post',
     headers: {'Content-type': 'application/json'},
     body: JSON.stringify(body)
     })
    .then( res => {
        if(!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json() as Promise<{message: string, token: string}>
    })

    return data 
}

export const addNewGroups = async (groupName: string): Promise<responseGroup> => {

    const token = getLocalStorage('token');
   return await fetch(`http://localhost:8080/api/groups`, {
        method: 'post', 
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        }, 
        body: JSON.stringify({ groupName })
    })
    .then(res=> {
        if(!res.ok) {
            console.error(res.statusText);
        }
        return res.json() as Promise<responseGroup>
    })


}

export const addNewMember = async (groupName: string, member: string): Promise<responseGroup> => {

    const token = getLocalStorage('token');
   return await fetch(`http://localhost:8080/api/updateGroup`, {
        method: 'PUT', 
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        }, 
        body: JSON.stringify({ groupName, member })
    })
    .then(res=> {
        if(!res.ok) {
            console.error(res.statusText);
        }
        return res.json() as Promise<responseGroup>
    })


}

export const verifyGroup = async (groupName: string) => {

    const token = getLocalStorage('token');
   const data =  await fetch(`http://localhost:8080/api/groups/${groupName}`, {
        method: 'get', 
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        }, 
       // body: JSON.stringify({ groupName })
    })
    .then(res=> {
        if(!res.ok) {
            console.error(res.statusText);
        }
        return res.json()
    })

    return data

}





