import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon, Plus } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { ActionContext } from "@/pages/Projects/ActionContext";

interface FormProjectProps {
    openForm: boolean,
    setOpenForm: (status: boolean) => void
}
export function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }
    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    })
}
function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}
export default function FormProject({ openForm, setOpenForm }: FormProjectProps) {
    const { action, projectSelected, handleChangeAction } = useContext(ActionContext)!
    const { data, setData, setError, reset, post, put } = useForm<{
        title: string;
        description: string;
        is_completed: boolean;
        deadline: Date;
    }>({
        title: '',
        description: '',
        is_completed: false,
        deadline: new Date()
    })
    // date picker controller
    const [open, setOpen] = React.useState(false)
    const [deadline, setDeadline] = React.useState<Date | undefined>(
        new Date()
    )

    const [month, setMonth] = React.useState<Date | undefined>(deadline)
    const [value, setValue] = React.useState(formatDate(deadline))

    useEffect(() => {
        if (action == 'edit') {
            setData('title', projectSelected!.title)
            setData('description', projectSelected!.description)
            setData('is_completed', projectSelected!.is_completed)

            const selectedDeadline = new Date(projectSelected!.deadline)
            setData('deadline', selectedDeadline)
            setDeadline(selectedDeadline)
            setMonth(selectedDeadline)
            setValue(formatDate(selectedDeadline))
        } else {
            const selectedDeadline = new Date()
            setDeadline(selectedDeadline)
            setMonth(selectedDeadline)
            setValue(formatDate(selectedDeadline))
            reset()
        }
    }, [projectSelected, action])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (action === 'post') {
            post('/projects', {
                onSuccess: () => {
                    setOpenForm(false)
                    reset()
                    toast('Project success created!')
                }
            })
        } else {
            put(`/projects/${projectSelected!.id}`, {
                onSuccess: () => {
                    setOpenForm(false)
                    reset()
                    toast('Project success updated!')
                }
            })
        }
    }

    const handleAddActionHandler = () => {
        handleChangeAction('post')
    }

    return (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger asChild>
                <Button
                    className="hover:cursor-pointer font-semibold"
                    onClick={handleAddActionHandler}
                >
                    <Plus />
                    Add Project
                </Button>
            </DialogTrigger>
            <form id="formProject" onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex flex-col gap-0">
                                <p className="py-2 text-md">Adding project for </p>
                                <p className="flex justify-center text-xl">our roadtobillioner arc💵🤑💰😎</p>
                            </div>
                        </DialogTitle>
                        <DialogDescription className="flex gap-4 py-8 justify-center text-md italic font-semibold">
                            <span>
                                "Great companies are built on great products."
                            </span>
                            <span>
                                Elon Musk
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {/* title input */}
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title Project</Label>
                            <Input id="title" value={data.title} name="title" onChange={(e) => setData('title', e.target.value)} />
                        </div>
                        {/* desription input */}
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description Project</Label>
                            <Input id="description" value={data.description} name="description" onChange={(e) =>
                                setData('description', e.target.value)}
                            />
                        </div>
                        {/* deadline input */}
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="date" className="px-1">
                                Deadline
                            </Label>
                            <div className="relative flex gap-2">
                                <Input
                                    id="date"
                                    value={value}
                                    placeholder="June 01, 2025"
                                    className="bg-background pr-10"
                                    onChange={(e) => {
                                        const date = new Date(e.target.value)
                                        setValue(e.target.value)
                                        if (isValidDate(date)) {
                                            setDeadline(date)
                                            setMonth(date)
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "ArrowDown") {
                                            e.preventDefault()
                                            setOpen(true)
                                        }
                                    }}
                                />
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date-picker"
                                            variant="ghost"
                                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                                        >
                                            <CalendarIcon className="size-3.5" />
                                            <span className="sr-only">Select date</span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto overflow-hidden p-0"
                                        align="end"
                                        alignOffset={-8}
                                        sideOffset={10}
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={deadline}
                                            captionLayout="dropdown"
                                            month={month}
                                            onMonthChange={setMonth}
                                            onSelect={(date) => {
                                                setDeadline(date)
                                                setData('deadline', date!)
                                                setValue(formatDate(date))
                                                setOpen(false)
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="hover:cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button form="formProject" type="submit" className="hover:cursor-pointer">Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}