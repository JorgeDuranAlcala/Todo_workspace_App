export interface Todo {
    _id?: string;
    title: string;
    description: string;
}

export interface ResponseAllTodos {
    message?: string;
    todos: Todo[];
}

export interface ResponseTodoById {
    message?: string;
    todo: Todo;
}

export interface responseAddTodo {
    message?: string;
    addTodos: Todo;
}
