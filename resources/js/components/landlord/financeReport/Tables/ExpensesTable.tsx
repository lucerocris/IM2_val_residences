import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MaintenanceExpense {
    date: string;
    property: string;
    description: string;
    cost: number;
    category: string;
}

interface ExpensesTableProps {
    maintenanceExpenses: MaintenanceExpense[];
}

const ExpensesTable = ({ maintenanceExpenses }: ExpensesTableProps) => {
    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Cost</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <Body maintenanceExpenses={maintenanceExpenses} />
                </TableBody>
            </Table>
        </>
    );
}

const Body = ({ maintenanceExpenses }: ExpensesTableProps) => {
    return(
        <>
            {maintenanceExpenses.map((expense, idx) => (
                <TableRow key = {idx}>
                    <TableCell>{new Date(expense.date).toLocaleDateString('en-PH')}</TableCell>
                    <TableCell className = "font-medium">{expense.property}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>
                        <Badge variant = "outline">{expense.category}</Badge>
                    </TableCell>
                    <TableCell className = "text-red-600 font-medium">₱{expense.cost.toLocaleString()}</TableCell>
                </TableRow>
            ))}
        </>
    );
}

export default ExpensesTable;