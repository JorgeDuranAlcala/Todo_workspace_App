export interface Todo {
    _id?: string;
    title: string;
    description: string;
    group?: string;
}

interface Group {
    groupId: string
}

export interface User {
    _id?: string;
    username?: string,
    email: string,
    password: string,
    Date?: Date,
    groups?: string
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

export interface responseRegisterUsers {
    message?: string;
    userSp: User;
    token: string
}
