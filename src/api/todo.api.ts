import { getLocalStorage } from "../utils/manageLocalStorage";
import { Todo, responseDeleteTodo, responseUpdateTodo } from "../interfaces/responseTodo";

export const createTodo = async (groupName: string, body: Todo) => {

      const token = getLocalStorage('token')

      return await fetch(`http://localhost:8080/api/todos/${groupName}`, {
          method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
      }).then(res => {
          if(!res.ok) {
              throw new Error(res.statusText);
          }
          return res.json()
      })
}

export const deleteTodo = async (id?: string): Promise<responseDeleteTodo> => {

      return await fetch(`http://localhost:8080/api/todos/${id}`, {
          method: 'DELETE',
          headers: { 'Content-type': 'application/json'},
      }).then(res => {
          if(!res.ok) {
              throw new Error(res.statusText);
          }
          return res.json() as Promise<responseDeleteTodo>
      })
}

export const updateTodo = async (id?: string, body?: any): Promise<responseUpdateTodo> => {

      return await fetch(`http://localhost:8080/api/todos/${id}`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json'},
          body: JSON.stringify(body)
      }).then(res => {
          if(!res.ok) {
              throw new Error(res.statusText);
          }
          return res.json() as Promise<responseUpdateTodo>
      })
}
