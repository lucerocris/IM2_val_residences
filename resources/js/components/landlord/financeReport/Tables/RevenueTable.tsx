import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface MonthlyRevenue {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

interface RevenueTableProps {
    monthlyRevenue: MonthlyRevenue[];
}

const RevenueTable = ({monthlyRevenue}: RevenueTableProps) => {
    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeads />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <Body monthlyRevenue={monthlyRevenue} />
                </TableBody>
            </Table>
        </>
    );
}

const TableHeads = () => {
    return(
        <>
            <TableHead>Month</TableHead>
            <TableHead>Gross Revenue</TableHead>
            <TableHead>Operating Expenses</TableHead>
            <TableHead>Net Profit</TableHead>
            <TableHead>Profit Margin</TableHead>
        </>
    );
}

const Body = ({ monthlyRevenue }:RevenueTableProps) => {
    return(
        <>
            {monthlyRevenue.map((month, idx) => (
                <TableRow key = {idx}>
                    <TableCell className = "font-medium">{month.month}</TableCell>
                    <TableCell>₱{month.revenue.toLocaleString()}</TableCell>
                    <TableCell className = "text-red-600">₱{month.expenses.toLocaleString()}</TableCell>
                    <TableCell className = "text-green-600 font-medium">₱{month.profit.toLocaleString()}</TableCell>
                    <TableCell>
                        <Badge variant = "secondary">{((month.profit / month.revenue) * 100).toFixed(1)}%</Badge>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}

export default RevenueTable;