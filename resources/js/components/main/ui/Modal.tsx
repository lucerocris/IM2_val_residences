import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import React from 'react'

interface ModalProps {
    trigger: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal = ({trigger, title, description, children}:ModalProps) => {
    return(
        <>
            <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent className = "sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <div className = "py-4">{children}</div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Modal;