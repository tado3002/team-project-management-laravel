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
interface Task {
    id: number,
    title: string,
    description: string,
    is_completed: boolean,
    deadline: Date
    user_id: number,
    createdAt: Date,
    updatedAt: Date
}