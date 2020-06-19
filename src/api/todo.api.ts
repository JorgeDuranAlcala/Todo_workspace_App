import { getLocalStorage } from "../utils/manageLocalStorage";
import { Todo } from "../interfaces/responseTodo";

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