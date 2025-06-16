import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle,CardDescription,CardFooter } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, User } from "@/types";
import { Task } from "@/types/project";
import { Head } from "@inertiajs/react";
import { CheckCircle, ClockAlert, Code2, Handshake, Palette, UserPlus } from "lucide-react";

interface Role {
    id: number
    name: string
}
interface UserWithTask extends User {
    tasks: Task[]
    roles: Role[]
}

interface Props {
    users: UserWithTask[]
    flash?: {
        success?: string
        error?: string
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users', 
        href: '/users'
    }

]
export default function Page({users}:Props){
    let userWithRoleProgrammer: UserWithTask[] = []
    let userWithRoleDesigner: UserWithTask[] = []
    let userWithRolePublicRelation: UserWithTask[] = []

    users.forEach(user=> {switch (user.roles[0].name) {
            case 'programmer':
                userWithRoleProgrammer.push(user)
                break;
            case 'designer':
                userWithRoleDesigner.push(user)
                break;

            case 'public relation':
                userWithRolePublicRelation.push(user)
                break;

            default:
                break;
        }
    })
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users"/>
            <div className="flex justify-end p-4">
                <Button className="font-bold hover:cursor-pointer">
                    <UserPlus/>
                    Add Team
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 p-4">
            {/** Member with role programmer*/}
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Code2/>
                    <p className="font-bold">Programmer :</p>
                </div>
                <div className="flex flex-col gap-2 p-2 bg-secondary rounded-lg">
                    {
                        userWithRoleProgrammer.map(user=>{
                            let uncompletedTask = []
                            let completedTask = []
                            let role: string | string[] = user.roles[0].name.split('')
                            role[0] = role[0].toUpperCase()
                            role = role.join('')

                            user.tasks.forEach(task=>task.is_completed?completedTask.push(task):uncompletedTask.push(task))

                            return (
                                <Card key={user.id}>
                                    <CardContent>
                                        <div className="flex flex-row">
                                            <Avatar className="w-10 h-10">
                                              <AvatarImage src="https://github.com/shadcn.png" />
                                              <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <CardHeader>
                                                <CardTitle>{user.name}</CardTitle>
                                                <CardDescription>
                                                    <div className="flex gap-1 items-center">
                                                        <Code2 size={20}/>
                                                        <span>{role}</span>
                                                    </div>
                                                </CardDescription>
                                            </CardHeader>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="grid grid-cols-2">
                                        <div className="flex gap-1">
                                            <ClockAlert className="text-red-500"/>
                                            <span>{uncompletedTask.length} Left</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <CheckCircle className="text-green-500"/>
                                            <span>{completedTask.length} Completed</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>

            {/** Member with role design*/}
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Palette/>
                    <p className="font-bold">Designer :</p>
                </div>
                <div className="flex flex-col gap-2 p-2 bg-secondary rounded-lg">
                    {
                        userWithRoleDesigner.map(user=>{
                            let uncompletedTask = []
                            let completedTask = []
                            let role: string | string[] = user.roles[0].name.split('')
                            role[0] = role[0].toUpperCase()
                            role = role.join('')

                            user.tasks.forEach(task=>task.is_completed?completedTask.push(task):uncompletedTask.push(task))

                            return (
                                <Card key={user.id}>
                                    <CardContent>
                                        <div className="flex flex-row">
                                            <Avatar className="w-10 h-10">
                                              <AvatarImage src="https://github.com/shadcn.png" />
                                              <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <CardHeader>
                                                <CardTitle>{user.name}</CardTitle>
                                                <CardDescription>
                                                    <div className="flex gap-1 items-center">
                                                        <Palette size={20}/>
                                                        <span>{role}</span>
                                                    </div>
                                                </CardDescription>
                                            </CardHeader>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="grid grid-cols-2">
                                        <div className="flex gap-1">
                                            <ClockAlert className="text-red-500"/>
                                            <span>{uncompletedTask.length} Left</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <CheckCircle className="text-green-500"/>
                                            <span>{completedTask.length} Completed</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>

            {/** Member with role client relationship*/}
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Handshake/>
                    <p className="font-bold">Public Relation :</p>
                </div>
                <div className="flex flex-col gap-2 p-2 bg-secondary rounded-lg">
                {
                        userWithRolePublicRelation.map(user=>{
                            let uncompletedTask = []
                            let completedTask = []
                            let role: string | string[] = user.roles[0].name.split('')
                            role[0] = role[0].toUpperCase()
                            role = role.join('')

                            user.tasks.forEach(task=>task.is_completed?completedTask.push(task):uncompletedTask.push(task))

                            return (
                                <Card key={user.id}>
                                    <CardContent>
                                        <div className="flex flex-row">
                                            <Avatar className="w-10 h-10">
                                              <AvatarImage src="https://github.com/shadcn.png" />
                                              <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <CardHeader>
                                                <CardTitle>{user.name}</CardTitle>
                                                <CardDescription>
                                                    <div className="flex gap-1 items-center">
                                                        <Handshake size={20}/>
                                                        <span>{role}</span>
                                                    </div>
                                                </CardDescription>
                                            </CardHeader>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="grid grid-cols-2">
                                        <div className="flex gap-1">
                                            <ClockAlert className="text-red-500"/>
                                            <span>{uncompletedTask.length} Left</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <CheckCircle className="text-green-500"/>
                                            <span>{completedTask.length} Completed</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
            </div>
        </AppLayout>
    )

}

