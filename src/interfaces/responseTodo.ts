export interface Todo {
    _id?: string;
    title?: string;
    description: string;
    group?: string;
    isDone?: boolean;
}

interface Group {
    groupId: string;
    groupName: string;
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
    token: string,
    group: Group
}

export interface responseDeleteTodo {
    message?: string;
    removedTodo?: Todo;
}

export interface responseUpdateTodo {
    message?: string;
    todoUpdated?: Todo;
}
