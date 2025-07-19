import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Table } from "@tanstack/react-table"
import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

interface UsersTableViewOptionsProps<TData> {
    table: Table<TData>
}

export function UsersTableViewOptions<TData>({ table }: UsersTableViewOptionsProps<TData>) {
    const columnDisplayNames: Record<string, string> = {
        user_name: "Name",
        email: "Email",
        user_contact_number: "Contact",
        user_type: "User Type",
        employment_status: "Employment",
        monthly_income: "Monthly Income",
        move_in_date: "Move-in Date",
        current_address: "Current Address",
        created_at: "Registration Date"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 flex">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    View
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {columnDisplayNames[column.id] || column.id.replace(/_/g, " ")}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
