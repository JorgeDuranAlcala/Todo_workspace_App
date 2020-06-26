import { getLocalStorage } from "../utils/manageLocalStorage"
import { User } from "../interfaces/responseTodo"

export const getUserProfile = async (): Promise<User> => {
    const token = getLocalStorage('token')

    return await fetch(`http://localhost:8080/api/profile`, {
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        }
    }).then(res => {
        if(!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json() as Promise<User>
    })
}