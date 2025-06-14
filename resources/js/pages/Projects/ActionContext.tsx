import { Project } from "@/types/project";
import React, { createContext, useState } from "react"

export interface ActionContextType {
    action: string;
    projectSelected: Project | undefined;
    handleChangeAction: (newAction: 'post' | 'edit') => void,
    handleProjectSelected: (projectSelected: Project) => void
}

export const ActionContext = createContext<ActionContextType | null>(null)

export const ActionProvider = ({ children }: { children: React.ReactNode }) => {
    const [action, setAction] = useState<'post' | 'edit'>('post')
    const [projectSelected, setProjectSelected] = useState<Project>()
    const handleChangeAction = (newAction: 'post' | 'edit',) => {
        setAction(newAction)
    }
    const handleProjectSelected = (projectSelected: Project) => {
        setProjectSelected(projectSelected)
    }

    return (
        <ActionContext.Provider value={{ action, projectSelected, handleChangeAction, handleProjectSelected }}>
            {children}
        </ActionContext.Provider>
    )

}