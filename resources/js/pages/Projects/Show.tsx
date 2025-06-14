import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, ChevronLeftIcon, ClockAlert, User, XIcon } from "lucide-react"
import { useContext } from "react"
import { ActionContext } from "./ActionContext"
import { formatDate } from "@/components/custom/FormProject"
import { CompletedBadge, NotCompletedBadge } from "@/components/custom/BadgeProject"

interface ShowProjectDialogProps {
    open: boolean;
    onOpenChange: (status: boolean) => void;
}

export const ShowProjectDialog = ({ open, onOpenChange}: ShowProjectDialogProps) => {
    const {projectSelected} = useContext(ActionContext)!
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='mb-8 flex h-[calc(100vh-2rem)] lg:min-w-[calc(60vw-2rem)] flex-col justify-between gap-0 p-0'>
                <ScrollArea className='flex flex-col justify-between overflow-hidden'>
                    <DialogHeader className='contents space-y-0 text-left'>
                        <DialogTitle className='px-6 pt-6'>Project Information</DialogTitle>
                        <DialogDescription asChild>
                            <div className='grid grid-cols-2 p-6 gap-6'>
                                <div className="flex flex-col gap-6 ">
                                    <div className="relative h-[30vh] rounded-lg overflow-hidden">
                                        <img 
                                            src="http://localhost:8000/storage/senja-cafe.jpeg"
                                            alt="client photo"
                                            className="absolute object-cover"
                                            />
                                        <div className="absolute top-0 right-0 p-4">
                                            {
                                                projectSelected?.is_completed? <CompletedBadge/> : <NotCompletedBadge deadline={projectSelected?.deadline ?? new Date()}/>
                                            }
                                        </div>
                                    </div>
                                    {
                                        projectSelected?.tasks &&<CardTask tasks={projectSelected?.tasks}/>
                                    }
                                </div>
                                <div className='[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold'>
                                    <div className='space-y-1'>
                                        <p className="text-md">
                                            <strong>Project Title:</strong>
                                        </p>
                                        <p>
                                            {projectSelected?.title}
                                        </p>
                                    </div>
                                    <div className='space-y-1'>
                                        <p className="text-md">
                                            <strong>Project Description:</strong>
                                        </p>
                                        <p>{projectSelected?.description}</p>
                                    </div>
                                    <div className='space-y-1'>
                                        <p className="text-md">
                                            <strong>Created At: </strong>
                                        </p>
                                        <p>{formatDate(new Date(projectSelected?.createdAt!!))}</p>
                                    </div>

                                    <div className='space-y-1'>
                                        <p className="text-md">
                                            <strong>Deadline: </strong>
                                        </p>
                                        <p>{formatDate(new Date(projectSelected?.deadline!!))}</p>
                                    </div>
                                </div>
                                
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </ScrollArea>
                <DialogFooter className='px-6 pb-6 sm:justify-end'>
                    <Button variant='outline'>
                        <ChevronLeftIcon />
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Task } from "@/types/project"

interface CardTaskProps {
    tasks: Task[]
}
const CardTask = ({tasks}:CardTaskProps) => {
  return (
    <Card className='border-primary max-w-md gap-0 bg-transparent shadow-none'>
      <CardHeader>
        <CardTitle className="text-lg font-bold pb-2">List Task</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
        {
            tasks.map(task=>{
                return (
                    <div className="flex gap-4 items-start" key={task.id}>
                        {
                            task.is_completed ? 
                            <CheckCircle className="text-green-400"/> : <XIcon className="text-red-500"/>
                        }
                        <div className="flex flex-col gap-0">
                            {
                                task.is_completed ? 
                                <p className={`text-md text-green-500 font-bold`}>{task.title}</p> :
                                 <p className={`text-md text-red-500 font-bold`}>{task.title}</p>
                            }
                            <div className="flex flex-row gap-4 items-center">
                                <div className="border w-fit flex flex-row gap-1 items-center text-muted-foreground">
                                    <ClockAlert size={14}/>
                                    <p className="text-xs ">{formatDate(new Date(task.deadline))}</p>
                                </div> 
                                <div className="flex gap-1 items-center">
                                    <User size={14}/>
                                    <p className="text-xs font-bold">
                                    {task.user.name}</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                )
            })
        }
        </div>
      </CardContent>
    </Card>
  )
}

