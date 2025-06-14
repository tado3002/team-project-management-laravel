export interface Project {
    id: number,
    title: string,
    description: string,
    is_completed: boolean,
    deadline: Date,
    createdAt: Date,
    updatedAt: Date,
    tasks: Task[],
}
export interface Task {
    id: number,
    title: string,
    description: string,
    is_completed: boolean,
    deadline: Date
    createdAt: Date,
    updatedAt: Date
    user: User,
}

export interface User {
    id: number
    name: string
    email:string
}