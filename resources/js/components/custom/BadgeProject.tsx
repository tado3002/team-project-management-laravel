import { Badge } from "../ui/badge"

function countdownDay(date: Date): string {
    const now = new Date()
    const delta = date.getTime() - now.getTime()
    const daysLeft = Math.ceil(delta / (1000 * 60 * 60 * 24));

    if (daysLeft < 1) return '😡 Today!'
    if (daysLeft < 2) return '😠 Tomorrow!'
    return `🙁 - ${daysLeft} day!`
}
export function CompletedBadge() {
    return (
        <Badge variant={'default'} className="bg-green-400 font-bold text-md">😎 Completed!</Badge>
    )
}
export function NotCompletedBadge({ deadline }: { deadline: Date }) {
    return (
        <Badge variant={'default'} className="bg-red-500 font-bold text-md">{countdownDay(new Date(deadline))}</Badge>
    )
}
