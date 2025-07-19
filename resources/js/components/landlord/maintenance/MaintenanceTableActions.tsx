import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, MoreHorizontal, Trash2, Wrench, XCircle } from 'lucide-react';
import { MaintenanceRequest } from '@/types/maintenanceRequest.types';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router  } from '@inertiajs/react';

interface MaintenanceTableActionsProps {
    request: MaintenanceRequest;
}

const handleDelete = (requestID: string)=> {
    if (confirm('Are you sure you want to delete this request?')) {
        router.delete(`/landlord/maintenance/${requestID}`, {
            preserveScroll: true,
        })
    }
}




const MaintenanceTableActions = ({request}: MaintenanceTableActionsProps) => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        actual_cost: "",
        request_status: "completed",
    });


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    const handleComplete = (requestID: string) => {
        router.patch(`/landlord/maintenance/${requestID}/complete`, {
            actual_cost: Number(values.actual_cost),
            request_status: "completed",
        }, {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    };

    const handleStart = (requestID: string) => {
        router.patch(`/landlord/maintenance/${requestID}/start`, {
            request_status: "in_progress"
        }, {
            preserveScroll:true,
            onSuccess: () => setOpen(false),
        })
    }


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {request.request_status === 'pending' && (
                        <>
                            <DropdownMenuItem className="text-blue-600 focus:bg-blue-100 focus:text-blue-600" onClick={() => handleStart(request.id)}>
                                <Wrench className="mr-2 h-4 w-4 text-blue-600" /> Start work
                            </DropdownMenuItem>
                        </>
                    )}

                    {request.request_status === 'in_progress' && (
                        <>
                            <DropdownMenuItem className="text-green-600 focus:bg-green-100 focus:text-green-600" onClick={() => setOpen(true)}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Mark as completed
                            </DropdownMenuItem>
                        </>
                    )}
                    <DropdownMenuItem className="text-red-600" variant="destructive" onClick={() => handleDelete(request.id)}>
                        <Trash2 className="mr-2 h-4 w-4 text-red" /> Delete request
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Maintenance Cost</DialogTitle>
                        <DialogDescription>
                            Enter the actual maintenance cost to mark request as completed
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cost">Cost Amount</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
                                <Input
                                    id="actual_cost"
                                    name="actual_cost"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    className="pl-8"
                                    value={values.actual_cost}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => handleComplete(request.id)} disabled={!values.actual_cost}>
                                Mark as completed
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default MaintenanceTableActions;
