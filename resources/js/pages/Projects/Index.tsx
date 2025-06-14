import CardProject from "@/components/custom/CardProject";
import FormProject from "@/components/custom/FormProject";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Project } from "@/types/project";
import { Head } from "@inertiajs/react"
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ActionProvider } from "./ActionContext";
import { ShowProjectDialog } from "./Show";

interface Props {
    projects: Project[],
    flash?: {
        success?: string,
        error?: string,
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
]

export default function Page({ projects, flash }: Props) {
    const [openForm, setOpenForm] = useState(false)
    const [openProject, setOpenProject] = useState(false)
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            {showToast && (
                <div
                    className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${toastType === 'success' ? 'bg-green-400' : 'bg-red-400'
                        } text-secondary font-bold animate-in fade-in slide-in-from-top-5`}>
                    {toastType === 'success' ? (
                        <CheckCircle2 className="h-5 w-5" />
                    ) : (
                        <XCircle className="h-5 w-5" />
                    )}
                    <span>{toastMessage}</span>
                </div>)
            }
            <ActionProvider>
                <div className="grid justify-items-stretch px-4 py-6">
                    <div className="grid justify-self-end ">
                        <FormProject openForm={openForm} setOpenForm={setOpenForm} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4">
                    {projects.map(project => (
                        <div key={project.id}
                            onClick={() => setOpenProject(true)}
                        >
                            <CardProject project={project} setOpenForm={setOpenForm} />
                        </div>
                    ))}
                </div>
                <ShowProjectDialog open={openProject} onOpenChange={setOpenProject} />

            </ActionProvider>
        </AppLayout>
    );
}









