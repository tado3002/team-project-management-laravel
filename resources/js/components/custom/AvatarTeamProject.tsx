import { Users } from "lucide-react";

export function TeamsAvatar({ count }: { count?: number }) {
    return (
        <div className="justify-self-start flex gap-2 items-center">
            <Users />
            {count ?? 4}
        </div>
    )
}