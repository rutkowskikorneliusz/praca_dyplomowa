import {UseFormRegister} from "react-hook-form";

export interface RegisterWizardData {
    email: string
    password: string
    company: string
    location: string
    description: string
    baner: FileList
    logo: FileList
}

export interface RegisterWizardParams {
    action: (data: RegisterWizardData) => void

}

export interface WizardStepParams {
    register: UseFormRegister<RegisterWizardData>
}

export interface UserProfile {
    uid?: string
    email: string
    company: string
    location: string
    description: string
    baner: string
    logo: string
}