import { Paperclip } from "lucide-react";

export function TaskDetail({ completed, total }: { completed: number, total: number }) {
    return (
        <div className="justify-self-end flex gap-2 items-center">
            <Paperclip />
            {`${completed}/${total}`}
        </div>
    )
}