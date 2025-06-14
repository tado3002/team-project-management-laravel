import { Progress } from "@radix-ui/react-progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Project } from "@/types/project"
import { CompletedBadge, NotCompletedBadge } from "./BadgeProject"
import { TeamsAvatar } from "./AvatarTeamProject"
import { TaskDetail } from "./DetailTask"
import { useContext } from "react"
import { ActionContext } from "@/pages/Projects/ActionContext"
import { PenBox } from "lucide-react"

interface CardProjectProps {
    project: Project,
    setOpenForm: (status: boolean) => void
}

export default function CardProject({ project, setOpenForm }: CardProjectProps) {
    const taskCompleted = project.tasks.filter(item => item.is_completed).length

    const { handleChangeAction, handleProjectSelected } = useContext(ActionContext)!

    const handleEditClick = () => {
        handleChangeAction('edit')
        handleProjectSelected(project)
        setOpenForm(true)
    }


    return (
        <Card className="bg-primary-foreground p-0 pb-4">
            {/* body content */}
            <CardContent className="p-0 relative">
                <img
                    src='http://localhost:8000/storage/senja-cafe.jpeg'
                    alt='Banner'
                    className='aspect-video h-64 rounded-t-xl object-cover'
                />

                <div className="absolute top-0 flex w-full justify-between p-4">
                    <PenBox onClick={handleEditClick} className="hover:cursor-pointer" />
                    {
                        project.is_completed ? <CompletedBadge /> : <NotCompletedBadge deadline={project.deadline} />
                    }
                </div>
                <CardHeader className="absolute flex w-full bottom-0 h-32 bg-linear-to-b from-transparent to-primary-foreground to-35%">
                    {/* title project */}
                    <CardTitle className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            {project.title}

                        </div>
                        {/** date detail **/}
                        <div className="text-xs text-muted-foreground font-bold">
                            <div>Kedai Senja</div>
                        </div>

                    </CardTitle>
                    {/* description project */}
                    <CardDescription>
                        {project.description}
                    </CardDescription>
                </CardHeader>
            </CardContent>
            {/* footer */}
            <CardFooter className="grid grid-cols-2 items-center gap-4">
                {/** progress section */}
                <Progress value={100} className="col-span-2" />
                {/* avatars */}
                <TeamsAvatar />
                {/** task detail */}
                <TaskDetail completed={taskCompleted} total={project.tasks.length} />
            </CardFooter>

        </Card>
    )
}